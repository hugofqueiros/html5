/**
 * Created by hugo.queiros on 03/06/16.
 */
import React from 'react';
import {Link} from 'react-router';

import styles from './styles.module.css';

export class Header extends React.Component {
    render() {
        return (
            <div className={styles.topbar}>
                <Link to="/"><h1>Yelp</h1></Link>
                <section>
                    <a href="http://hugofqueiros.com" target="blank">hugofqueiros.com</a>
                </section>
            </div>
        )
    }
}

export default Header;
