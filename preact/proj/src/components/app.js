import {h, Component} from 'preact';
import {Router} from 'preact-router';

import Header from './header';
import Banner from './banner';
import Footer from './footer';
import Card from './card';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Other from '../routes/other';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

import style from './app.less';

export default class App extends Component {

    /** Gets fired when the route changes.
     *    @param {Object} event        "change" event from [preact-router](http://git.io/preact-router)
     *    @param {string} event.url    The newly routed URL
     */
    handleRoute = e => {
        this.currentUrl = e.url;
    };

    render() {
        return (
            <div id="app" style={style.App}>
                <Header />
                <Banner />
                <Router onChange={this.handleRoute}>
                    <Home path="/" />
                    <Other path="/other" />
                    <Profile path="/profile/" user="me" />
                    <Profile path="/profile/:user" />
                </Router>
                <Footer />
            </div>
        );
    }
}
