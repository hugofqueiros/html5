import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
    // it's api because we want to go to our render server
    const authButton = auth ? (
		<a href="/api/logout">Logout</a>
	) : (
		<a href="/api/auth/google">Login</a>
	);

    // we use Link when we want to navigate around the react app
	return (
		<nav>
			<div className="nav-wrapper">
				<Link to="/" className="brand-logo">
					React SSR
				</Link>
				<ul className="right">
					<li>
						<Link to="/users">Users</Link>
					</li>
					<li>
						<Link to="/admins">Admins</Link>
					</li>
					<li>{authButton}</li>
				</ul>
			</div>
		</nav>
	);
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
