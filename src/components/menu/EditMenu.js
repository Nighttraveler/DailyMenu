import ModalUnstyled from "@mui/core/ModalUnstyled";
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Grid, IconButton, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MealTypesEnum } from '../../initData';


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
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
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                {body}
            </StyledModal>
        </React.Fragment>
    );
}