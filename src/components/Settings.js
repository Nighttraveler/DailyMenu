import { FormLabel, Grid, RadioGroup, Tooltip } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { StorageService } from '../api/storageService'
import i18n from "../i18n/i18n";

export default function Settings() {

    let [language, setLanguage] = useState('es');
    let [oneMeal, setOneMeal] = useState(false);
    let [t] = useTranslation('common');

    useEffect(() => {
        StorageService.retrieveUserPreferences().then(
            value => {
                setLanguage(value.language);
                setOneMeal(value.one_meal)
            });
    }, [language, oneMeal])

    const handleOneMealChange = () => {
        StorageService.updateUserPreference('one_meal', !oneMeal)
            .then(value => setOneMeal(value));
        StorageService.updateGeneratedMenu(null);
    }

    const handleLanguageChange = (e) => {
        StorageService.updateUserPreference('language', e.target.value)
            .then(value => {
                setLanguage(value);
                i18n.changeLanguage(value);
            });
    }

    return (
        <Grid container={12} justifyContent="center">

            {/*            <h2>{t('menu_form.title')}</h2>
            <h2>use dark menu switch</h2>
            <h2>clear all menus</h2>
            <h2>clear default menus</h2>
            <h2>restore default menus</h2>*/}
            <FormGroup>
                <h1>{t('drawer.settings.title')}</h1>
                <Tooltip title={t('drawer.settings.one_meal_warning')}>
                    <FormControlLabel
                        control={<Switch onChange={handleOneMealChange} checked={oneMeal}/>}
                        label={t('drawer.settings.one_meal')}/>
                </Tooltip>

                <FormLabel component="legend">{t('drawer.settings.pick_language.title')}</FormLabel>
                <RadioGroup
                    aria-label="language"
                    name="controlled-radio-buttons-group"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <FormControlLabel value="es"
                                      control={<Radio/>}
                                      label={t('drawer.settings.pick_language.es')}/>
                    <FormControlLabel value="en"
                                      control={<Radio/>}
                                      label={t('drawer.settings.pick_language.en')}/>
                </RadioGroup>
            </FormGroup>
        </Grid>

    )
}
