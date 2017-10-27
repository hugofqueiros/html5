import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import mutation from '../../mutations/signup';
import query from '../../queries/currentUser';
import AuthForm from '../AuthForm/';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: [] }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch((res) => {
            const errors = res.graphQLErrors.map((error) => { return error.message });
            this.setState({ errors });
        });
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm
                    onSubmit={({ email, password }) => { this.onSubmit({ email, password }) }}
                    errors={this.state.errors} 
                />
            </div>
        );
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);