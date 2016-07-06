/**
 * Created by hugo.queiros on 04/07/16.
 */
import React, {Component} from 'react';
import { IndexLink } from 'react-router'
import NavLink from './NavLink';
import Home from './Home';

/**
 * IndexLink: only active when we're at the index route
 * if I used NavLink Home is always active
 * because parent routes are always active when child routes are active.
 * Unfortunately, / is the parent of everything
 * for the / we want it to only be active when the index route is active.
 *
 * <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
 *
 * or
 *
 * <li><Link to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</Link></li>
 */
class App extends Component {
    render() {
        return (
            <div>
                <div className="hello">Hello, React Router</div>
                <ul role="nav">
                    <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                </ul>
                {this.props.children || <Home/>}
            </div>
        )
    }
}

export default App;

/*return (
    <div>
        <div className="hello">Hello, React Router</div>
        <ul role="nav">
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/repos" activeClassName="active">Repos</Link></li>
        </ul>
        {this.props.children}
    </div>
)*/

/*
<div>
    <div className="hello">Hello, React Router</div>
    <ul role="nav">
        <li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
        <li><Link to="/repos" activeStyle={{ color: 'red' }}>Repos</Link></li>
    </ul>
    {this.props.children}
</div>*/
