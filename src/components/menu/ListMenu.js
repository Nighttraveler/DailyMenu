import { ListItemSecondaryAction } from '@mui/material';
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

    const [menuList, setMenuList] = React.useState(menuListProp);
    const [t] = useTranslation('common');

    useEffect(() => {
        console.log('menu list', menuListProp)
        setMenuList(menuListProp)
    }, [menuListProp])

    return (
        <Root className={classes.root}>
            <List component='ul'>
                {menuList.map((menu) => {
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
