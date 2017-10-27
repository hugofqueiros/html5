import React, { Component } from 'react';

import './AuthForm.css';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: ''};
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const {errors} = this.props;

        return (
            <div className="row">
                <form onSubmit={this.onSubmit.bind(this)} className="col s6">
                    <div className="input-field">
                        <input 
                            placeholder="Email"
                            value={this.state.email}
                            onChange={(event) => { this.setState({ email: event.target.value }) }}
                        />
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={(event) => { this.setState({ password: event.target.value }) }}
                        />
                    </div>
                    <div className="errors">
                        {errors.map(error => <div key={error}>{error}</div>)}
                    </div>
                    <button className="btn">Submit</button> 
                </form>
            </div>
        );
    }
}

export default AuthForm;