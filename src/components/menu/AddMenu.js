import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fab, Grid, MenuItem } from '@mui/material';
import Modal from '@mui/material/Modal';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { MealTypesEnum } from '../../initData';

const PREFIX = 'AddMenu';

const classes = {
    fab: `${PREFIX}-fab`,
    paper: `${PREFIX}-paper`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.fab}`]: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },

    [`& .${classes.paper}`]: {
        position: 'absolute',
        width: '50%',
        minWidth: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    }
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};


const initialMenuState = {
    uuid: null,
    name: '',
    type: MealTypesEnum.MEAL
}

export default function AddMenu({ handleCreate }) {

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
        <Box sx={style}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField id='standard-basic'
                                   label={t('menu_form.title')}
                                   value={menu.name}
                                   onChange={handleMenuNameChange}
                                   multiline
                                   fullWidth={true}
                                   required={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id='menu-type-selector'
                            select
                            label={t('menu_form.type.title')}
                            value={menu.type}
                            onChange={handleMenuTypeChange}
                            fullWidth={true}
                            required={true}
                        >
                            {Object.values(MealTypesEnum).map(value => (
                                <MenuItem key={value} value={value}>
                                    {t(`menu_form.type.${value}`)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item style={{ padding: 20 }} xs={12}>
                        <Button variant='contained' color='primary' type={'submit'}>{t('form.save')}</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );

    return (
        <Root>
            <Fab onClick={handleOpen} color='primary' className={classes.fab} aria-label='add'>
                <AddIcon/>
            </Fab>
            ️
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </Root>
    );
}
