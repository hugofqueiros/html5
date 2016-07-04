/**
 * Created by hugo.queiros on 04/07/16.
 */
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './src/App';
import About from './src/About';
import Repos from './src/Repos';
import Repo from './src/Repo';

//render(<App/>, document.getElementById('app'));

/*render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        {/!* add the routes here *!/}
        <Route path="/repos" component={Repos}/>
        <Route path="/about" component={About}/>
    </Router>
), document.getElementById('app'));*/

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        {/* make them children of `App` */}
        <Route path="/repos" component={Repos}/>
        <Route path="/repos/:userName/:repoName" component={Repo} />
        <Route path="/about" component={About}/>
    </Router>
), document.getElementById('app'));
