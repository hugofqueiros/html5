import React, { Component } from 'react';

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {title: ""};
    }

    render() {
        return (
            <div>
                <h3>Crete a new song</h3>
                <form>
                    <label>Song Title:</label>
                    <input 
                        onChange={event => this.state({title: event.target.value})}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

export default SongCreate;