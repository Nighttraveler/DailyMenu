import { Button, Grid, IconButton, MenuItem } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit'
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MealTypesEnum } from "../../initData";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '50%',
        minWidth: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
}));

export default function EditMenu({ menu, handleUpdate }) {

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [menuState, setMenuState] = useState(menu);
    const [t] = useTranslation('common');

    const handleMenuTypeChange = (event) => {
        setMenuState({ ...menuState, type: event.target.value });
    };

    const handleMenuNameChange = (event) => {
        setMenuState({ ...menuState, name: event.target.value });
    }

    const handleOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        handleUpdate(menuState);
        handleClose()
    }, [menuState, handleUpdate]);

    const body = (
        <Container align='center' maxWidth={'xl'} style={modalStyle}
                   className={classes.paper}>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField id="standard-basic"
                                   label={t('menu_form.title')}
                                   value={menuState.name}
                                   onChange={handleMenuNameChange}
                                   multiline
                                   fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="menu-type-selector"
                            select
                            label={t('menu_form.type.title')}
                            value={menuState.type}
                            onChange={handleMenuTypeChange}
                            fullWidth={true}
                        >
                            {Object.values(MealTypesEnum).map(value => (
                                <MenuItem key={value} value={value}>
                                    {t(`menu_form.type.${value}`)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item style={{ padding: 20 }} xs={12}>
                        <Button variant="contained" color="primary" type={"submit"}>{t('form.edit')}</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen} edge="end" aria-label="delete">
                <EditIcon/>
            </IconButton>
            ️
            <Modal
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </React.Fragment>
    );
}