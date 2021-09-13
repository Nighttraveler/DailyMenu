import { Button, Container, Fab, Grid, MenuItem } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
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
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        position: 'absolute',
        width: '50%',
        minWidth: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    }
}));

const initialMenuState = {
    uuid: null,
    name: '',
    type: MealTypesEnum.MEAL
}

export default function AddMenu({ handleCreate }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [menu, setMenu] = useState(initialMenuState);
    const [open, setOpen] = React.useState(false);
    const [t] = useTranslation('common');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenuTypeChange = (event) => {
        setMenu({ ...menu, type: event.target.value });
    };

    const handleMenuNameChange = (event) => {
        setMenu({ ...menu, name: event.target.value });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        menu.uuid = uuidv4();
        handleCreate(menu)
        setMenu(initialMenuState);
        handleClose()
    }, [menu, handleCreate]);

    const body = (
        <Container align='center' maxWidth={'xl'} style={modalStyle}
                   className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField id="standard-basic"
                                   label={t('menu_form.title')}
                                   value={menu.name}
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
                            value={menu.type}
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
                        <Button variant="contained" color="primary" type={"submit"}>{t('form.save')}</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );

    return (
        <React.Fragment>
            <Fab onClick={handleOpen} color="primary" className={classes.fab} aria-label="add">
                <AddIcon/>
            </Fab>
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
