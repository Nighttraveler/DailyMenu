import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Grid, IconButton, MenuItem, Modal } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MealTypesEnum } from '../../initData';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    minWidth: '60%'
};

export default function EditMenu({ menu, handleUpdate }) {

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
        <Box sx={style}>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField id='standard-basic'
                                   label={t('menu_form.title')}
                                   value={menuState.name}
                                   onChange={handleMenuNameChange}
                                   multiline
                                   fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id='menu-type-selector'
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
                        <Button variant='contained' color='primary' type={'submit'}>{t('form.edit')}</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen} edge='end' aria-label='delete'>
                <EditIcon/>
            </IconButton>
            ️
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </React.Fragment>
    );
}