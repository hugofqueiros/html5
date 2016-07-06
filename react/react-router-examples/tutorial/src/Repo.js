/**
 * Created by hugo.queiros on 04/07/16.
 */
import React, {Component} from 'react';

class Repo extends Component {
    render() {
        const { userName, repoName } = this.props.params;

        console.log('params', this.props.params);
        console.log('username', userName);
        console.log('repoName', repoName);

        return (
            <div>
                <h2>{userName} / {repoName}</h2>
            </div>
        )
    }
}

export default Repo;

/*
<div>
    <h2>{this.props.params.repoName}</h2>
</div>*/
