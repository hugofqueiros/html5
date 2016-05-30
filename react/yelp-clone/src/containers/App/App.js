/**
 * Created by hugo.queiros on 30/05/16.
 */
import React, { PropTypes } from 'react';
import { Router } from 'react-router';

class App extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    static propTypes = {
        history: PropTypes.object.isRequired,
        router: PropTypes.element.isRequired
    };

    get content() {
        return (
            <Router
                router = {this.props.router}
                history = {this.props.history} />
        )
    }

    render() {
        return (
            <div style={{ height: '100%'}}>
                {this.content}
            </div>
        )
    }
}

export default App;
