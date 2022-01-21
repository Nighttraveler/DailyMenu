import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";


export default function EditGeneratedMenu({
                                              indexProp, generatedMenuProp, setGeneratedMenuProp,
                                              mealListProp, mainListProp, sideListProp
                                          }) {

    const [generatedMenu, setGeneratedMenu] = useState(generatedMenuProp);
    const [t] = useTranslation('common');
    const [uniqueMenu, setUniqueMenu] = useState(generatedMenu[indexProp].unique);
    const [lunchMenu, setLunchMenu] = useState(generatedMenu[indexProp].lunch);
    const [dinnerMenu, setDinnerMenu] = useState(generatedMenu[indexProp].dinner);

    const isOptionEqualToValue = (option, value) => {
        return option.menu.uuid === value.menu.uuid;
    }

    useEffect(() => {
        console.log("uniqueEffect");
        generatedMenu[indexProp].unique = uniqueMenu;
        setGeneratedMenuProp(generatedMenu);
    }, [uniqueMenu])

    useEffect(() => {
        console.log("lunchMenuEffect");
        generatedMenu[indexProp].lunch = lunchMenu;
        setGeneratedMenuProp(generatedMenu);
    }, [lunchMenu])

    useEffect(() => {
        console.log("dinnerMenuEffect");
        generatedMenu[indexProp].dinner = dinnerMenu;
        setGeneratedMenuProp(generatedMenu);
    }, [dinnerMenu])

    const generateEditForm = () => {
        if (uniqueMenu) {
            const { menu: { meal } } = uniqueMenu;
            if (meal) {
                const { menu: { meal: { name: label } } } = uniqueMenu;
                return (
                    <div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-meals"
                            value={{ label: label, menu: meal }}
                            options={mealListProp}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    let { menu } = newValue;
                                    const updatedMenu = { menu: { meal: menu } };
                                    setUniqueMenu(updatedMenu);
                                }
                            }}
                            isOptionEqualToValue={isOptionEqualToValue}
                            renderInput={(params) => <TextField {...params} label={t(`menu_form.type.dish`)}/>}
                        />
                    </div>)

            }
            const { menu: { main } } = uniqueMenu;
            const { menu: { main: { name: mainLabel } } } = uniqueMenu;
            const { menu: { side } } = uniqueMenu;
            const { menu: { side: { name: sideLabel } } } = uniqueMenu;
            return (<React.Fragment>
                    <Autocomplete
                        disablePortal
                        id="combo-box-meals"
                        value={{ label: mainLabel, menu: main }}
                        options={mainListProp}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                const { menu } = newValue;
                                const updatedMenu = { menu: { ...uniqueMenu.menu, main: menu } };
                                setUniqueMenu(updatedMenu);

                            }
                        }}
                        isOptionEqualToValue={isOptionEqualToValue}
                        renderInput={(params) => <TextField {...params} label={t(`menu_form.type.main`)}/>}
                    />
                    <br/>
                    <Autocomplete
                        disablePortal
                        id="combo-box-meals"
                        value={{ label: sideLabel, menu: side }}
                        options={sideListProp}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                const { menu } = newValue;
                                const updatedMenu = { menu: { ...uniqueMenu.menu, side: menu } };
                                setUniqueMenu(updatedMenu);
                            }
                        }}
                        isOptionEqualToValue={isOptionEqualToValue}
                        renderInput={(params) => <TextField {...params} label={t(`menu_form.type.side`)}/>}
                    />
                </React.Fragment>
            )

        }
        // TODO: make the composite lunch/dinner menu work
        const { menu: { meal: lunchMeal } } = lunchMenu;
        const { menu: { meal: dinnerMeal } } = dinnerMenu;
        const { menu: { main: lunchMain } } = lunchMenu;
        const { menu: { side: lunchSide } } = lunchMenu;
        const { menu: { main: dinnerMain } } = dinnerMenu;
        const { menu: { side: dinnerSide } } = dinnerMenu;
        return (
            <React.Fragment>
                <div>
                    <h3>{t('home.meals.lunch')}</h3>
                    {lunchMeal ?
                        <Autocomplete
                            disablePortal
                            id="combo-box-meals"
                            value={{ label: lunchMeal.name, menu: lunchMeal }}
                            options={mealListProp}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    const { menu } = newValue;
                                    const updatedMenu = { menu: { meal: menu } };
                                    setLunchMenu(updatedMenu)
                                }
                            }}
                            isOptionEqualToValue={isOptionEqualToValue}
                            renderInput={(params) => <TextField {...params} label={t(`menu_form.type.dish`)}/>}
                        />
                        :
                        <React.Fragment>
                            <Autocomplete
                                disablePortal
                                id="combo-box-meals"
                                value={{
                                    label: lunchMain.name,
                                    menu: lunchMain
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        const { menu } = newValue;
                                        const updatedMenu = { menu: { ...lunchMenu.menu, main: menu } };
                                        setLunchMenu(updatedMenu);

                                    }
                                }}
                                options={mainListProp}
                                isOptionEqualToValue={isOptionEqualToValue}
                                renderInput={(params) => <TextField {...params} label={t(`menu_form.type.main`)}/>}
                            />
                            <br/>
                            <Autocomplete
                                disablePortal
                                id="combo-box-meals"
                                value={{
                                    label: lunchSide.name,
                                    menu: lunchSide
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        const { menu } = newValue;
                                        const updatedMenu = { menu: { ...lunchMenu.menu, side: menu } };
                                        setLunchMenu(updatedMenu);

                                    }
                                }}
                                isOptionEqualToValue={isOptionEqualToValue}
                                options={sideListProp}
                                renderInput={(params) => <TextField {...params} label={t(`menu_form.type.side`)}/>}
                            />
                        </React.Fragment>}
                </div>
                <div>
                    <h3>{t('home.meals.dinner')}</h3>
                    {dinnerMeal ?
                        <Autocomplete
                            disablePortal
                            id="combo-box-meals"
                            value={{ label: dinnerMeal.name, menu: dinnerMeal }}
                            options={mealListProp}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    const { menu } = newValue;
                                    const updatedMenu = { menu: { meal: menu } };
                                    setDinnerMenu(updatedMenu);
                                }
                            }}
                            isOptionEqualToValue={isOptionEqualToValue}
                            renderInput={(params) => <TextField {...params} label={t(`menu_form.type.dish`)}/>}
                        />
                        :
                        <React.Fragment>
                            <Autocomplete
                                disablePortal
                                id="combo-box-meals"
                                value={{
                                    label: dinnerMain.name,
                                    menu: dinnerMain
                                }}
                                options={mainListProp}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        const { menu } = newValue;
                                        const updatedMenu = { menu: { ...dinnerMenu.menu, main: menu } };
                                        setDinnerMenu(updatedMenu);

                                    }
                                }}
                                isOptionEqualToValue={isOptionEqualToValue}
                                renderInput={(params) => <TextField {...params} label={t(`menu_form.type.main`)}/>}
                            />
                            <br/>
                            <Autocomplete
                                disablePortal
                                id="combo-box-meals"
                                value={{
                                    label: dinnerSide.name,
                                    menu: dinnerSide
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        const { menu } = newValue;
                                        const updatedMenu = { menu: { ...dinnerMenu.menu, side: menu } };
                                        setDinnerMenu(updatedMenu);

                                    }
                                }}
                                options={sideListProp}
                                isOptionEqualToValue={isOptionEqualToValue}
                                renderInput={(params) => <TextField {...params} label={t(`menu_form.type.side`)}/>}
                            />
                        </React.Fragment>}
                </div>
            </React.Fragment>
        )
    }

    return (
        generateEditForm()
    )

}