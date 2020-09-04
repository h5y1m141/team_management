import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import { AppLayoutTemplate } from './components/templates/AppLayoutTemplate'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { TeamList } from './pages/TeamList'
import { theme } from './styles/theme'

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/sign_up" exact component={SignUp} />
          <Route path="/sign_in" exact component={SignIn} />

          <AppLayoutTemplate>
            <Route path="/" exact>
              <Redirect to="/teams" />
            </Route>
            <Route path="/teams" exact component={TeamList} />
          </AppLayoutTemplate>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
