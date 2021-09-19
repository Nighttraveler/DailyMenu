import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardContent, CardHeader, Grid, IconButton } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';


export default function Home() {

    const [t] = useTranslation('common');

    const days = [
        {
            day: t('home.days.monday')
        },
        {
            day: t('home.days.tuesday')
        },
        {
            day: t('home.days.wednesday')
        },
        {
            day: t('home.days.thursday')
        },
        {
            day: t('home.days.friday')
        },
        {
            day: t('home.days.saturday')
        },
        {
            day: t('home.days.sunday')
        }
    ]
    return (
        <Grid container spacing={3} justifyContent={'center'}>
            {days.map(
                (item, index) => {
                    return (
                        <Grid key={index} item xs={9} md={4}>
                            <Card elevation={3} square>
                                <CardHeader title={item.day}
                                            action={
                                                <IconButton aria-label='settings'>
                                                    <MoreVertIcon/>
                                                </IconButton>
                                            }
                                />
                                <CardContent>
                                    <p>{t('home.meals.lunch')}</p>
                                    <p>{t('home.meals.dinner')}</p>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
            )}
        </Grid>
    )
}