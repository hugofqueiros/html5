/**
 * Created by hugo.queiros on 30/05/16.
 */
import React, { PropTypes } from 'react';
import { Router } from 'react-router';

import styles from './styles.module.css'


/**
 * <Router /> component in the app as a child of the component with rules designate
 * with children should be placed on the page at any given route.
 * Thus <App /> component will be a container for the route handling, rather than an
 * element to hold/display content.
 *
 * this is an efficient method for holding/generating routes on a per-route basis.
 * Il also allows us to create custom data handlers/component generators which come
 * in handy for dealing with data layers, such as Redux
 *
 * React can be used with class App or with React.creatClass
 *
 * app container is used to return an instance of the <Router /> component.
 *
 * The <Router /> component require us to pass a history object which tells the
 * browser how to listen for the location object on a document. The history tells
 * our react component how to route.
 *
 * types of historu objects (more popular): browserHistory and hashHistory types
 *
 * browserHistory object uses the native html5 react router to give us the
 * routes that appear to be server-based.
 *
 * hashHistory uses the # sign to manage navigation. hash-based history, an old trick
 * for client-side routing is supported in all browsers.
 */
class App extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    /**
     * pass in our custom router. wrap routes into this <App /> component
     *
     * to use <App /> component, need to pass through the two props the component
     * itself expects to receive when we render the <App /> component:
     *
     * - history - importing the browserHistory object from react router and pass
     * this export directly.
     * - routes - sending JSX that defines our routes
     *
     */
    static propTypes = {
        history: PropTypes.object.isRequired,
        routes: PropTypes.element.isRequired
    };

    // class getter
    get content() {
        return (
            <Router
                routes={this.props.routes}
                history={this.props.history} />)
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                {this.content}
            </div>
        )
    };
}

export default App;
