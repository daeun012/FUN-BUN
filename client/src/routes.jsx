// 경로 설정
import React from 'react';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/LoginPage';
import Register from './containers/RegisterPage';
import Chat from './containers/ChatPage';

const theme = createTheme({
  palette: {
    primary: {
      light: '#939ed5',
      main: '#7986cb',
      dark: '#545d8e',
    },
  },
  typography: {
    fontFamily: ['Noto Sans KR', 'sans-serif'],
  },
});

export default function MainRouter() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </SnackbarProvider>{' '}
    </ThemeProvider>
  );
}
