import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/currentUser';

class Header extends Component {
    render() {
        console.log('this.props.data', this.props.data);

        return (
            <h1>
                Header
            </h1>
        );
    }
}

export default graphql(query)(Header);