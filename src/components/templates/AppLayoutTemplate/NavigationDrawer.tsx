import { Grid, makeStyles, Typography } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import React from 'react'
import { Link } from 'react-router-dom'

type SideBarItem = {
  label: string
  link: string
}
export const NavigationDrawer: React.FC = () => {
  const classes = usesStyles()
  const items: SideBarItem[] = [
    { label: 'Team', link: '/user' },
    { label: 'Sign out', link: '/logout' },
  ]
  return (
    <>
      <Grid container>
        <Grid item className={classes.linkItem}>
          {items.map((item: SideBarItem) => (
            <Link key={item.link} to={item.link} className={classes.link}>
              <ListItem button className={classes.menuWrapper}>
                <Typography component="p" variant="subtitle2">
                  {item.label}
                </Typography>
              </ListItem>
            </Link>
          ))}
        </Grid>
      </Grid>
    </>
  )
}
const usesStyles = makeStyles((theme) => ({
  menuIcon: {
    color: 'white',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  btn: {
    marginRight: theme.spacing(2),
  },
  label: {
    padding: theme.spacing(0, 3, 1, 3),
  },
  linkItem: {
    width: '100%',
  },
  spacer: {
    padding: theme.spacing(0, 3, 5, 3),
  },
  menuWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    padding: theme.spacing(0, 3),
  },
}))
