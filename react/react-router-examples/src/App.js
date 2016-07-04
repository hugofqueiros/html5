/**
 * Created by hugo.queiros on 04/07/16.
 */
import React, {Component} from 'react';
import NavLink from './NavLink';

class App extends Component {
    render() {
        return (
            <div>
                <div className="hello">Hello, React Router</div>
                <ul role="nav">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                </ul>
                {this.props.children}
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
