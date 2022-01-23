import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import { Box } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { StorageService } from "../api/storageService";
import i18n from "../i18n/i18n";
import Home from './Home';
import MenuManager from './menu/MenuManager';
import Settings from './Settings';


const drawerWidth = 240;


function App(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [t] = useTranslation('common');

    //capacitorStorageService.runStartUp();

    useEffect(() => {
        StorageService.retrieveUserPreferences().then(
            value => {
                if (value) {
                    i18n.changeLanguage(value.language);
                }
            });
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerMenu = [
        {
            title: t('drawer.home'),
            path: '/',
            icon: <HomeIcon/>
        },
        {
            title: t('drawer.manage'),
            path: '/manage',
            icon: <StorageIcon/>
        },
        {
            title: t('drawer.settings.title'),
            path: '/settings',
            icon: <SettingsIcon/>
        }
    ]

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                {drawerMenu.map((item, index) => {
                    return (
                        <ListItem onClick={() => setMobileOpen(false)} component={Link} to={item.path} button
                                  key={index}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            {item.title}
                        </ListItem>)
                })}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline/>
                <AppBar position='fixed'>
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}

                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' noWrap>
                            Daily Meal
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="menu"
                >

                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar/>
                    <Switch>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                        <Route path='/manage'>
                            <MenuManager/>
                        </Route>
                        <Route path='/settings'>
                            <Settings/>
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </Router>
    );
}

App.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default App;


