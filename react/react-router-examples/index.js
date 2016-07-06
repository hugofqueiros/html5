/**
 * Created by hugo.queiros on 04/07/16.
 */
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';
import App from './src/App';
import About from './src/About';
import Repos from './src/Repos';
import Repo from './src/Repo';
import Home from './src/Home';

//render(<App/>, document.getElementById('app'));

/*render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        {/!* add the routes here *!/}
        <Route path="/repos" component={Repos}/>
        <Route path="/about" component={About}/>
    </Router>
), document.getElementById('app'));*/

/**
 * URLs are build on a hack: the hash. Default because it will always work
 */
/*render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />

            <Route path="/repos" component={Repos}>
                 <Route path="/repos/:userName/:repoName" component={Repo} />
            </Route>
            <Route path="/about" component={About}/>
        </Route>
    </Router>
), document.getElementById('app'));*/

/**
 * Better way
 * Modern browsers let JS manipulate the URL without making an http request,
 * so we don't need to rely on the hash (#) portion of the url to do routing,
 * but there's a catch
 * "start": "webpack-dev-server --inline --content-base . --history-api-fallback"
 */
render((
    <Router history={browserHistory}>
            <Route path="/" component={App}>
                    <IndexRoute component={Home} />

                    <Route path="/repos" component={Repos}>
                            <Route path="/repos/:userName/:repoName" component={Repo} />
                    </Route>
                    <Route path="/about" component={About}/>
            </Route>
    </Router>
), document.getElementById('app'));
