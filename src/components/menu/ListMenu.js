import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import { IconButton, ListItemSecondaryAction, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteMenu from './DeleteMenu';
import EditMenu from './EditMenu';

const PREFIX = 'ListMenu';

const classes = {
    root: `${PREFIX}-root`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));


export default function ListMenu({ menuListProp, handleDelete, handleUpdate }) {

    const [menuList, setMenuList] = React.useState([]);
    const [filterText, setFilterText] = React.useState("");
    const [t] = useTranslation('common');

    useEffect(() => {
        setMenuList(menuListProp)
        console.log("ListMenu useEffect")
    }, [menuListProp]);

    const handleFilterChange = (event) => {
        console.log(event.target.value, "handleFilterChange")
        setFilterText(event.target.value.toLowerCase());
    }

    const listToUse = () => {
        if (filterText) {
            return menuList.filter(menu => {
                const menuName = menu.name.toLowerCase();
                return menuName.includes(filterText)
            });
        }
        return menuListProp;
    }

    return (
        <Root className={classes.root}>

            <List component='ul'>
                <ListItem key={'filterText'} divider={true}>
                    <TextField
                        onChange={handleFilterChange}
                        type={"text"}
                        value={filterText}
                        label={"filtra pa"}
                        fullWidth={true}
                        size={"medium"}

                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => {
                            setFilterText('')
                        }} edge='end' aria-label='delete'>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {listToUse().map((menu) => {
                        return (
                            <ListItem key={menu.uuid} button divider={true}>
                                <ListItemText primary={menu.name}
                                              secondary={t(`menu_form.type.${menu.type}`)}/>
                                <ListItemSecondaryAction>
                                    <EditMenu menu={menu} handleUpdate={handleUpdate}/>
                                    <DeleteMenu menu={menu} handleDelete={handleDelete}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                )}
            </List>
        </Root>
    );
}

ListMenu.propTypes = {
    menuListProp: PropTypes.array.isRequired
}
