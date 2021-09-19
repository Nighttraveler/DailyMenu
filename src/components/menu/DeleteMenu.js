import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, ButtonGroup, IconButton, Modal } from '@mui/material';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

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

export default function DeleteMenu({ menu, handleDelete }) {

    const [open, setOpen] = React.useState(false);
    const [t] = useTranslation('common');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        handleDelete(menu);
        handleClose();
    }, [menu, handleDelete]);

    const body = (
        <Box sx={style}>
            <form
                onSubmit={handleSubmit}>
                <h4>{t('form.delete_confirmation', { menu: menu.name })}</h4>
                <ButtonGroup variant={"contained"}>
                    <Button type='submit' size='large' color='error'>{t('form.delete')}</Button>
                    <Button type='submit' size='large' onClick={handleClose}>{t('form.cancel')}</Button>
                </ButtonGroup>
            </form>
        </Box>
    );

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen} edge='end' aria-label='delete'>
                <DeleteIcon/>
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