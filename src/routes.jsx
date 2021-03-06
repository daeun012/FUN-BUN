// 경로 설정
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/LoginPage';
import Register from './containers/RegisterPage';
import Chat from './containers/ChatPage';

const theme = createTheme({
  palette: {
    primary: {
      light: '#a6d4fa',
      main: '#90caf9',
      dark: '#648dae',
    },
    secondary: {
      light: '#ea8f8f',
      main: '#f44336',
      dark: '#a05050',
    },
    background: {
      default: '#ffff',
    },
  },
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif'],
  },
});

const styles = () => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
});
const MainRouter = ({ classes }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={3}>
      <Router history={history}>
        <div className={classes.root}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute exact path={['/', '/match', '/match/:matchId', '/chat/:chatId']} component={Chat} />
          </Switch>
        </div>
      </Router>
    </SnackbarProvider>
  </ThemeProvider>
);

export default withStyles(styles)(MainRouter);
