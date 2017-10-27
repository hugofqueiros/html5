import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from '../AuthForm/';
import mutation from '../../mutations/login';
import query from '../../queries/currentUser';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
    }

    onSubmit({email, password}) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch((res) => {
            const errors = res.graphQLErrors.map((error) => { return error.message });
            this.setState({ errors });
        })
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm 
                    onSubmit={({ email, password }) => {this.onSubmit({ email, password })}} 
                    errors={this.state.errors}
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);