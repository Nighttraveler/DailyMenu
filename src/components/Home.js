import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, TextField } from '@mui/material';
import Divider from "@mui/material/Divider";
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MealTypesEnum } from "../initData";
import useMenu from "../lib/useMenu";


export default function Home() {

    const [t] = useTranslation('common');
    const { menuList } = useMenu();

    const handleGenerateMenu = () => {
        const nDays = days.map(value => {
            value.lunch = getMenu();
            value.dinner = getMenu();
            return value;
        })
        setDays([...nDays]);
    }

    const handleGetRandomByType = (menuTypeToGet) => {
        const randomIndex = Math.floor(Math.random() * menuList.length);

        const m = menuList[randomIndex];
        if (m.type === menuTypeToGet) {
            return m;
        }
        return handleGetRandomByType(menuTypeToGet);

    }

    const getMenu = () => {
        const getMeal = Math.random() > 0.4;
        if (getMeal) {
            return handleGetRandomByType(MealTypesEnum.MEAL);
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

    const initDays = [
        {
            day: t('home.days.monday'),
            lunch: null,
            dinner: null
        },
        {
            day: t('home.days.tuesday'),
            lunch: null,
            dinner: null
        },
        {
            day: t('home.days.wednesday'),
            lunch: null,
            dinner: null
        },
        {
            day: t('home.days.thursday'),
            lunch: null,
            dinner: null
        },
        {
            day: t('home.days.friday'),
            lunch: null,
            dinner: null
        },
        {
            day: t('home.days.saturday'),
            lunch: null,
            dinner: null
        },
        {
            day: t('home.days.sunday'),
            lunch: null,
            dinner: null
        }
    ]

    const generateFields = (menu) => {

        if (!menu){
            return (
                <TextField disabled={true}
                           value={''}/>
            )
        }
        const { menu: menuValue } = menu;
        if (menuValue){
            return (
                <React.Fragment>
                    <TextField multiline disabled={!!menuValue.main}
                               value={menuValue.main.name ? menuValue.main.name : ''}/>
                    <Divider/>
                    <TextField multiline disabled={!!menuValue.side}
                           value={menuValue.side.name ? menuValue.side.name : ''}/>
                </React.Fragment>
            )
        } else {
            return (
                <TextField multiline disabled={!!menu}
                           value={menu.name ? menu.name : ''}/>
            )
        }
    }


    const [days, setDays] = useState(initDays);

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
            </Grid>
            <Grid container spacing={3} justifyContent={'center'}>
                {days.map(
                    (item, index) => {
                        return (
                            <Grid key={index} item xs={12} md={4}>
                                <Card elevation={3} square>
                                    <CardHeader title={item.day}
                                                action={
                                                    <IconButton aria-label='settings'>
                                                        <MoreVertIcon/>
                                                    </IconButton>
                                                }
                                    />
                                    <CardContent>
                                        <div>
                                            <h3>{t('home.meals.lunch')}</h3>
                                            {generateFields(item.lunch)}
                                        </div>
                                        <div>
                                            <h3>{t('home.meals.dinner')}</h3>
                                            {generateFields(item.dinner)}
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    }
                )}
            </Grid>
        </Box>
    )
}