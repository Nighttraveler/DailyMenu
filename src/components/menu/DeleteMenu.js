import ModalUnstyled from "@mui/core/ModalUnstyled";
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';


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
                <Button variant='contained' type='submit' size='large' color='secondary'>{t('form.delete')}</Button>
                <Button variant='contained' type='submit' size='large' onClick={handleClose}>{t('form.cancel')}</Button>
            </form>
        </Box>
    );

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen} edge='end' aria-label='delete'>
                <DeleteIcon/>
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