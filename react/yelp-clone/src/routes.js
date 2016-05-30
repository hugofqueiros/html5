/**
 * Created by hugo.queiros on 30/05/16.
 */
import React from 'react';
import { browserHistory, Router, Route, Redirect } from 'react-router';

/*import MakeMainRoutes from './views/Main/router';*/

export const makeRoutes = () => {
/*    const main = makeMainRoutes();*/

    return (
        <Route path = ''>
            {main}
        </Route>
    )
};

export default makeRoutes;
