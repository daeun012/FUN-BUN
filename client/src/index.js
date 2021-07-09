import React from 'react';
import { render } from 'react-dom';
import MainRouter from './routes';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById('root')
);
