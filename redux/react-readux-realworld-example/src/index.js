import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import agent from './agent';
import history from 'history';
import store from './store';

import App from './App';
import './index.css';

ReactDOM.render(


  <App />,
  document.getElementById('root')
);
