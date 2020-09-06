import { AppBar, makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import firebase from '../../../services/Firebase'
import { themeAdditional } from '../../../styles/themeAdditional'
import { Header } from './Header'
import { NavigationDrawer } from './NavigationDrawer'

export const AppLayoutTemplate: React.FC = ({ children }) => {
  const classes = usesStyles()
  const [loggedOut, setLoggedOut] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedOut(true)
      } else {
        setLoggedOut(false)
      }
    })
  }, [])

  if (loggedOut) {
    return <Redirect to="/sign_in" />
  }

  return (
    <div className={classes.root}>
      <Hidden smUp implementation="css">
        <AppBar className={classes.appBar} position="fixed">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
        </AppBar>
      </Hidden>

      {/* SPサイズの時にせり出すDrawer */}
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <NavigationDrawer />
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
            <NavigationDrawer />
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <Hidden xsDown implementation="css">
          <Header />
        </Hidden>
        {children}
      </main>
    </div>
  )
}
const drawerWidth = themeAdditional.screen.navigationDrawerWidth.smUp
const usesStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    padding: theme.spacing(0),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#202124',
    color: '#202124',
    alignItems: 'flex-start',
    paddingLeft: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    backgroundColor: '#202124',
    color: 'white',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#202124',
  },
  content: {
    flexGrow: 1,
    minHeight: '100%',
    maxWidth: themeAdditional.screen.contentMaxWidth.smUp,
    padding: theme.spacing(3, 6, 10, 6),
    backgroundColor: theme.palette.background.default,
  },
  selectPort: {
    width: '80%',
    padding: theme.spacing(1),
  },
  menuIcon: {
    color: 'white',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  btn: {
    marginRight: theme.spacing(1),
  },
}))
