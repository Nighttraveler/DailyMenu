import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import SaveIcon2 from '@mui/icons-material/SaveAltOutlined'

import ShuffleIcon from '@mui/icons-material/ShuffleRounded';

import { Alert, Box, Button, Card, CardContent, CardHeader, Fab, Grid, IconButton, Snackbar, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capacitorStorageService } from "../api/capacitorStorageService";
import { StorageService } from "../api/storageService";
import initData, { MealTypesEnum } from "../initData";
import useMenuList from "../lib/useMenuList";
import EditGeneratedMenu from './menu/GeneratedMenu/EditGeneratedMenu'

export default function Home() {

    const [t] = useTranslation('common');
    //TODO should be moved to initData
    const initDays = [

        {
            title: 'home.days.monday',
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: 'home.days.tuesday',
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: 'home.days.wednesday',
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: 'home.days.thursday',
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: 'home.days.friday',
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: 'home.days.saturday',
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: 'home.days.sunday',
            lunch: null,
            dinner: null,
            unique: null
        }
    ];


    const { menuList, handleRetrieve } = useMenuList();
    const [days, setDays] = useState(initDays);
    const [oneMeal, setOneMeal] = useState(initData.user_preferences.one_meal);
    const [canGenerateMenu, setCanGenerateMenu] = useState(true);
    const [canSaveGeneratedMenu, setCanSaveGeneratedMenu] = useState(false);
    const [showCardMenu, setShowCardMenu] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [editDay, setEditDay] = useState(Array(7).fill(false));
    const [mealList, setMealList] = useState([]);
    const [sideList, setSideList] = useState([]);
    const [mainList, setMainList] = useState([]);
    const [showFloatingButtons, setShowFloatingButtons] = useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    useEffect(() => {
        //TODO workaround until the start up page is ready
        capacitorStorageService.runStartUp().then(() => {
            StorageService.retrieveGeneratedMenu().then(value => {
                if (value) {
                    setDays(value);
                    setShowCardMenu(true);
                }
            });
            StorageService.retrieveUserPreferences().then(value => {
                if (value) {
                    setOneMeal(value.one_meal);
                    console.log('value.use_floating_buttons', value.use_floating_buttons)
                    setShowFloatingButtons(value.use_floating_buttons)
                }
            });
            handleRetrieve();
        })
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let tmpMealList = [];
        let tmpMainList = [];
        let tmpSideList = [];
        menuList.forEach(value => {
            if (value.type === MealTypesEnum.MEAL) {
                tmpMealList.push({ label: value.name, menu: value });
            } else if (value.type === MealTypesEnum.SIDE) {
                tmpSideList.push({ label: value.name, menu: value })
            } else if (value.type === MealTypesEnum.MAIN) {
                tmpMainList.push({ label: value.name, menu: value })
            }

        });
        setMealList(tmpMealList);
        setMainList(tmpMainList);
        setSideList(tmpSideList);

    }, [menuList])

    const handleGenerateMenu = () => {

        if (isPossibleToGenerateMenu()) {

            if (oneMeal) {
                const nDays = days.map(({ unique, ...rest }) => {
                    return { unique: getMenu(), ...rest };
                });
                setDays(nDays);
            } else {
                const nDays = days.map(({ lunch, dinner, ...rest }) => {
                    return { lunch: getMenu(), dinner: getMenu(), ...rest };
                });
                setDays(nDays);
            }
            setCanSaveGeneratedMenu(true);
            setShowCardMenu(true);

        } else {
            //TODO
            console.log("metele mas comidas que no alcanza pa")
        }


    }

    const shuffleOneMenu = (index) => {
        setCanSaveGeneratedMenu(true);
        if (oneMeal) {
            const nDays = days.map(({ unique, ...rest }, i) => {
                if (i === index) {
                    return { unique: getMenu(), ...rest };
                }
                return { unique, ...rest }
            });
            setDays(nDays);
        } else {
            const nDays = days.map(({ lunch, dinner, ...rest }, i) => {
                if (i === index) {
                    return { lunch: getMenu(), dinner: getMenu(), ...rest };
                }
                return { lunch, dinner, ...rest }
            });
            setDays(nDays);
        }
    }

    const isPossibleToGenerateMenu = () => {
        let [containsMain, containsMeal, containsSide] = Array(3).fill(false);
        menuList.forEach(value => {
            if (value.type === MealTypesEnum.MEAL) {
                containsMeal = true;
            } else if (value.type === MealTypesEnum.SIDE) {
                containsSide = true;
            } else if (value.type === MealTypesEnum.MAIN) {
                containsMain = true;
            }
        })

        return menuList.length && containsMeal && containsSide && containsMain;
    }


    const handleSaveGeneratedMenu = () => {
        StorageService.updateGeneratedMenu(days).then(value => {
            setDays(value);
            setOpenSnackBar(true);
            setCanSaveGeneratedMenu(false);
            setCanGenerateMenu(true);
        });
    }

    const handleGetRandomByType = (menuTypeToGet) => {
        const randomIndex = Math.abs(Math.round(Math.random() * menuList.length - 1));
        console.log(menuList.length, randomIndex)
        const m = menuList[randomIndex];
        if (m.type === menuTypeToGet) {
            return m;
        }
        return handleGetRandomByType(menuTypeToGet);

    }

    const getMenu = () => {
        const getMeal = Math.random() < 0.6;
        if (getMeal) {
            const meal = handleGetRandomByType(MealTypesEnum.MEAL);
            return {
                menu: {
                    meal
                }
            }
        }
        const side = handleGetRandomByType(MealTypesEnum.SIDE);
        const main = handleGetRandomByType(MealTypesEnum.MAIN);
        return {
            menu: {
                side,
                main
            }
        }
    };

    const generateEditMenu = (index, mealList, mainList, sideList) => {
        return (
            <EditGeneratedMenu
                indexProp={index}
                generatedMenuProp={days}
                setGeneratedMenuProp={setDays}
                mealListProp={mealList}
                mainListProp={mainList}
                sideListProp={sideList}
            />
        )
    }

    const generateFields = (lunch, dinner, unique) => {

        if (!lunch && !dinner && !unique) {
            return (
                <div/>
            )
        }

        if (unique) {
            const { menu: { meal } } = unique;
            if (meal) {
                return (<div>
                    <p>{meal.name ? meal.name : ''}</p>
                </div>)

            }
            const { menu: { main } } = unique;
            const { menu: { side } } = unique;
            return (<React.Fragment>
                    <p>{main.name}</p>
                    <p>{side.name}</p>
                </React.Fragment>
            )

        }
        const { menu: { meal: mealA } } = lunch;
        const { menu: { meal: mealB } } = dinner;
        return (
            <React.Fragment>
                <div>
                    <h3>{t('home.meals.lunch')}</h3>
                    {mealA ? <p>{mealA.name}</p> :
                        <React.Fragment>
                            <p>{lunch.menu.main.name}</p>
                            <p>{lunch.menu.side.name}</p>
                        </React.Fragment>}
                </div>
                <div>
                    <h3>{t('home.meals.dinner')}</h3>
                    {mealB ? <p>{mealB.name}</p> :
                        <React.Fragment>
                            <p>{dinner.menu.main.name}</p>
                            <p>{dinner.menu.side.name}</p>
                        </React.Fragment>}
                </div>
            </React.Fragment>
        )
    }


    return (
        <Box>
            {!showFloatingButtons ?
                <Grid sx={{
                    justifyContent: 'center',
                    marginBottom: '2%'
                }} container>

                    <Button
                        size={'large'}
                        variant={"contained"}
                        onClick={handleGenerateMenu}
                        disabled={!canGenerateMenu}
                    > <ShuffleIcon/> {t('home.form.generate_button')}
                    </Button>
                    <Button
                        size={'large'}
                        variant={"contained"}
                        onClick={handleSaveGeneratedMenu}
                        color={"success"}
                        disabled={!canSaveGeneratedMenu}
                    > <SaveIcon/> {t('home.form.save_button')}
                    </Button>

                </Grid>
                : null
            }

            <Grid container spacing={3} justifyContent={'center'}>
                {days.map(
                    ({ title, lunch, dinner, unique }, index) => {
                        return (
                            <Grid key={index} item xs={12} md={4}>
                                <Card elevation={3} square>
                                    <CardHeader title={t(title)}
                                                action={showCardMenu ?
                                                    <React.Fragment>
                                                        <span hidden={editDay[index]}>
                                                            <IconButton
                                                                onClick={() => {
                                                                    shuffleOneMenu(index)
                                                                }}
                                                                aria-label='settings'>
                                                                <ShuffleIcon/>
                                                            </IconButton>
                                                        </span>
                                                        <span hidden={editDay[index]}>
                                                            <IconButton
                                                                onClick={() => {
                                                                    let editDayCopy = editDay.slice();
                                                                    editDayCopy[index] = !editDayCopy[index];
                                                                    setEditDay(editDayCopy)
                                                                    setCanGenerateMenu(false)
                                                                    setCanSaveGeneratedMenu(true)
                                                                }}>
                                                                <EditIcon/>
                                                            </IconButton>
                                                        </span>
                                                        <span hidden={!editDay[index]}>
                                                            <IconButton
                                                                color={"success"}
                                                                onClick={() => {
                                                                    let editDayCopy = editDay.slice();
                                                                    editDayCopy[index] = !editDayCopy[index];
                                                                    setEditDay(editDayCopy)
                                                                    setCanGenerateMenu(true)
                                                                }}
                                                                hidden={true}
                                                                aria-label='settings'>
                                                                <SaveIcon2/>
                                                            </IconButton>
                                                        </span>
                                                    </React.Fragment>
                                                    : null}
                                    />
                                    <CardContent>
                                        {editDay[index] ? generateEditMenu(index,
                                                mealList,
                                                mainList,
                                                sideList)
                                            : generateFields(lunch, dinner, unique)}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                )}
            </Grid>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleClose}
                action={action}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {t('home.snackbar.save')}
                </Alert>
            </Snackbar>
            {showFloatingButtons ?
                <React.Fragment>
                    <Fab
                        hidden={!showFloatingButtons}
                        onClick={handleGenerateMenu}
                        color={"primary"}
                        disabled={!canGenerateMenu}
                        sx={{
                            position: 'fixed',
                            bottom: '5px',
                            right: '50%'
                        }}
                    >
                        <ShuffleIcon/>
                    </Fab>
                    <Fab
                        hidden={!showFloatingButtons}
                        onClick={handleSaveGeneratedMenu}
                        sx={{
                            color: '#fff',
                            backgroundColor: '#2e7d32',
                            position: 'fixed',
                            bottom: '5px',
                            right: '30%',
                            '&:hover': { backgroundColor: '#1b5e20' }
                        }}
                        disabled={!canSaveGeneratedMenu}>
                        <SaveIcon/>
                    </Fab>
                </React.Fragment>
                : null}

        </Box>
    )
}