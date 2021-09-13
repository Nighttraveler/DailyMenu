import { ListItemSecondaryAction } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteMenu from "./DeleteMenu";
import EditMenu from "./EditMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function ListMenu({ menuListProp, handleDelete, handleUpdate }) {
    const classes = useStyles();
    const [menuList, setMenuList] = React.useState(menuListProp);
    const [t] = useTranslation('common');

    useEffect(() => {
        console.log("menu list", menuListProp)
        setMenuList(menuListProp)
    }, [menuListProp])

    return (
        <div className={classes.root}>
            <List component="ul">
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
        </div>
    );
}

ListMenu.propTypes = {
    menuListProp: PropTypes.array.isRequired
}
