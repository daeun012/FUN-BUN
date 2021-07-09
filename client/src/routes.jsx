// 경로 설정
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/LoginPage';
import Register from './containers/RegisterPage';
import Chat from './containers/ChatPage';

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:chatId" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
