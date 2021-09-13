import { Button, IconButton } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useCallback } from "react";
import { useTranslation } from 'react-i18next';

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
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
}));

export default function DeleteMenu({ menu, handleDelete }) {

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
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
        <Container align='center' maxWidth={'xl'}>
            <form style={modalStyle} className={classes.paper}
                  onSubmit={handleSubmit}>
                <h4>{t('form.delete_confirmation', { menu: menu.name })}</h4>
                <Button variant="contained" type="submit" size='large' color='secondary'>{t('form.delete')}</Button>
                <Button variant="contained" type="submit" size='large' onClick={handleClose}>{t('form.cancel')}</Button>
            </form>
        </Container>
    );

    return (
        <React.Fragment>
            <IconButton onClick={handleOpen} edge="end" aria-label="delete">
                <DeleteIcon/>
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