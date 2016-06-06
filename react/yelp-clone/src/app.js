/**
 * Created by hugo.queiros on 30/05/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './app.css';

/*import {browserHistory, Router, Route} from 'react-router';*/

/*const Home = React.createClass({
    render: function() {
        return (<div>Hello world</div>)
    }
});

const routes = (
    <Router>
        <Route path="/" component={Home} />
    </Router>
);*/

import App from 'containers/App/App';

import {browserHistory} from 'react-router';

import {hashHistory} from 'react-router'
import makeRoutes from './routes';

const routes = makeRoutes();


/*import { hasHistory } from 'react-router';*/

/*import makeRoutes from './routes';

const routes = makeRoutes();

const mountNode = document.querySelector('#root');

ReactDOM.render(
    <App history = { hasHistory }
        router = {routes} />,
mountNode);*/

const mountNode = document.querySelector('#root');
/*ReactDOM.render(
    <App history={hashHistory}
         routes={routes} />,
    mountNode);*/


ReactDOM.render(
    <App
        history={browserHistory}
        routes={routes}/>,
    mountNode);

/*ReactDOM.render(
    <App history = { hasHistory }/>,
    mountNode);*/
