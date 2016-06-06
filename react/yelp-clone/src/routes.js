/**
 * Created by hugo.queiros on 30/05/16.
 */
import React from 'react';
import { browserHistory, Router, Route, Redirect } from 'react-router';

/**
 * import sub-routes file from Main
 *
 * since a function is exported, and not an object, we'll need to make sure we display the return
 * value of the function rather than the function itself.
 */
import makeMainRoutes from './views/Main/routes';

/*
const Home = React.createClass({
    render: function() {
        return (<div>Hello world</div>)
    }
});
*/

/*const routes = (
    <Router>
        <Route path="/" component={Home} />
    </Router>
);*/


export const makeRoutes = () => {
    const main = makeMainRoutes();

    return (
        <Route path = ''>
            {main}
        </Route>
    )
};

/*export const makeRoutes = () => (
    <Router>
        <Route path="/" component={Home} />
        <Redirect from="*" to="/"></Redirect>
    </Router>
);*/

export default makeRoutes;
