import React from 'react';
import { Switch, Route, Link } from "react-router-dom"
import { AppBar, Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, CssBaseline } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import HomePage from '../page/HomePage';
import ListPage from '../page/ListPage';
import AddPage from '../page/AddPage';
import UpdateID from '../page/UpdateID';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ReorderIcon from '@material-ui/icons/Reorder';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div >
            <div className={classes.toolbar} />
            <List >
                <Link to="/" className={classes.link} style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                </Link>
                <Divider variant="middle" />
                <Link to="/dvd" className={classes.link} style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <ReorderIcon />
                        </ListItemIcon>
                        <ListItemText primary={"DVD List"} />
                    </ListItem>
                </Link>
                <Divider variant="middle" />
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h4" noWrap>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            CILVIES
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/dvd" component={ListPage} />
                    <Route exact path="/dvd/add" component={AddPage} />
                    <Route exact path="/dvd/:id" component={UpdateID} />
                    <Route render={() => <h1>Not Found</h1>} />
                </Switch>
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {

    window: PropTypes.func,
};

export default ResponsiveDrawer;
