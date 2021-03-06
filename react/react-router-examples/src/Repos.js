/**
 * Created by hugo.queiros on 04/07/16.
 */
import React, {Component} from 'react';
import NavLink from './NavLink'

class Repos extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const userName = event.target.elements[0].value;
        const repo = event.target.elements[1].value;
        const path = `/repos/${userName}/${repo}`;
        console.log('handle Submit', userName, repo, path);

        this.context.router.push(path);
    }

    render() {
        return (
            <div>
                <h2>Repos</h2>
                <ul>
                    <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
                    <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                    {/* will render `Repo.js` when at /repos/:userName/:repoName */}
                    <li>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="userName" /> / {' '}
                            <input type="text" placeholder="repo"/>{' '}
                            <button type="submit">Go</button>
                        </form>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

Repos.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Repos;