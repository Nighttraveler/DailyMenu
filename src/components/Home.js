import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StorageService } from "../api/storageService";
import { MealTypesEnum } from "../initData";
import useMenuList from "../lib/useMenuList";


export default function Home() {

    const [t] = useTranslation('common');

    const initDays = [

        {
            title: t('home.days.monday'),
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: t('home.days.tuesday'),
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: t('home.days.wednesday'),
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: t('home.days.thursday'),
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: t('home.days.friday'),
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: t('home.days.saturday'),
            lunch: null,
            dinner: null,
            unique: null
        },
        {
            title: t('home.days.sunday'),
            lunch: null,
            dinner: null,
            unique: null
        }
    ];


    const { menuList } = useMenuList();
    const [days, setDays] = useState(initDays);
    const [canSaveGeneratedMenu, setCanSaveGeneratedMenu] = useState(true);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    //const [isEditMode, setIsEditMode] = React.useState(false);


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
        StorageService.retrieveGeneratedMenu().then(value => {
            if (value) {
                setDays(value);
            }
        })
    }, [])

    const handleGenerateMenu = () => {
        setCanSaveGeneratedMenu(false);
        const nDays = days.map(({ lunch, dinner, ...rest }) => {
            return { lunch: getMenu(), dinner: getMenu(), ...rest };
        });
        setDays(nDays);
    }

    const handleSaveGeneratedMenu = () => {
        StorageService.updateGeneratedMenu(days).then(value => {
            setDays(value);
            setOpenSnackBar(true);
        });
    }

    /*    const handleActivateEditMode = () => {
            setIsEditMode(true)
        }*/

    const handleGetRandomByType = (menuTypeToGet) => {
        const randomIndex = Math.floor(Math.random() * menuList.length);

        const m = menuList[randomIndex];
        if (m.type === menuTypeToGet) {
            return m;
        }
        return handleGetRandomByType(menuTypeToGet);

    }

    const getMenu = () => {
        const getMeal = Math.random() > 0.6;
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


    const generateFields = (lunch, dinner, unique) => {

        if (!lunch && !dinner && !unique) {
            return (
                <div/>
            )
        }

        if (unique) {
            const { menu: { meal } } = unique;
            if (meal) {
                return (
                    <CardContent>
                        <div>
                            <p>{meal.name ? meal.name : ''}</p>
                        </div>
                    </CardContent>)

            }
            const { menu: { main } } = unique;
            const { menu: { side } } = unique;
            return (
                <React.Fragment>
                    <p>{main.name}</p>
                    <p>{side.name}</p>
                </React.Fragment>
            )

        }
        const { menu: { meal: mealA } } = lunch;
        const { menu: { meal: mealB } } = dinner;
        return (
        <CardContent>
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
        </CardContent>
        )
/*        if (meal) {
            /!*           if (isEditMode) {
                           let mainOptions = [];
                           let sideOptions = [];
                           menuList.forEach((m) => {
                               if (menuValue.main.type === m.type) {
                                   mainOptions.push({ label: m.name, id: m.uuid });
                               } else if (menuValue.side.type === m.type) {
                                   sideOptions.push({ label: m.name, id: m.uuid });
                               }
                           })
                           return (
                               <React.Fragment>
                                   <Autocomplete
                                       disablePortal
                                       id="combo-box-demo"
                                       options={mainOptions}
                                       sx={{ width: 300 }}
                                       renderInput={(params) => <TextField {...params} label="Movie"/>}
                                   />
                                   <Autocomplete
                                       disablePortal
                                       id="combo-box-demo"
                                       options={sideOptions}
                                       sx={{ width: 300 }}
                                       renderInput={(params) => <TextField {...params} label="Movie"/>}
                                   />
                               </React.Fragment>
                           )
                       } else {*!/
            return (
                <p>{meal.name ? meal.name : ''}</p>

            )
            //}

        } else {
            const { menu: { main } } = menu;
            const { menu: { side } } = menu
            /!*            if (isEditMode) {
                            let mealOptions = [];
                            menuList.forEach((m) => {
                                if (menu.type === m.type) {
                                    mealOptions.push({ label: m.name, id: m.uuid });
                                }
                            })
                            return (
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={mealOptions}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Movie"/>}
                                />
                            )
                        } else {*!/
            return (
                <React.Fragment>
                    <p>{main.name}</p>
                    <p>{side.name}</p>
                </React.Fragment>
            )
        }*/
    }


    return (
        <Box>
            <Grid sx={{
                justifyContent: 'center',
                marginBottom: '2%'
            }} container>
                <Button size={'large'} variant={"contained"}
                        onClick={handleGenerateMenu}
                >{t('home.form.generate_button')}
                </Button>
                <Button size={'large'} variant={"contained"}
                        onClick={handleSaveGeneratedMenu}
                        color={"success"}
                        disabled={canSaveGeneratedMenu}
                >{t('home.form.save_button')}
                </Button>{/*
                <Button size={'large'} variant={"contained"}
                        onClick={handleActivateEditMode}
                        color={"success"}
                        disabled={canSaveGeneratedMenu}
                >{'Edit mode'}
                </Button>*/}
            </Grid>
            <Grid container spacing={3} justifyContent={'center'}>
                {days.map(
                    ({ title, lunch, dinner , unique}, index) => {
                        return (
                            <Grid key={index} item xs={12} md={4}>
                                <Card elevation={3} square>
                                    <CardHeader title={title}
                                        /* action={
                                             <IconButton aria-label='settings'>
                                                 <MoreVertIcon/>
                                             </IconButton>
                                         }*/
                                    />
                                    {generateFields(lunch, dinner, unique)}
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
                    {t('home.snackbar.text')}
                </Alert>
            </Snackbar>
        </Box>
    )
}