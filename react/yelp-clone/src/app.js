/**
 * Created by hugo.queiros on 30/05/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './app.css';

import { hasHistory } from 'react-router';

/*import App from 'containers/App/App';

import { hasHistory } from 'react-router';
import makeRoutes from './routes';

const routes = makeRoutes();

const mountNode = document.querySelector('#root');

ReactDOM.render(
    <App history = { hasHistory }
        router = {routes} />,
mountNode);*/

const mountNode = document.querySelector('#root');

const App = React.createClass({
    render: function() {
        return (<div>Hello World</div>)
    }
});

ReactDOM.render(
    <App history = { hasHistory }/>,
    mountNode);
