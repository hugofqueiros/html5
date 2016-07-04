/**
 * Created by hugo.queiros on 04/07/16.
 */
import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'

class App4 extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                {id: 1, name: 'Pedro'},
                {id: 2, name: 'Hugo'},
                {id: 3, name: 'Bea'},
                {id: 4, name: 'Cenas'}
            ]
        }
    }

    render() {
        // have to set a key so virtual dom knows which component changed
        let rows = this.state.date.map(person => {
            return <PersonRow key={person.id} data={person} />
        });

        return (
            <table>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

const PersonRow = (props) => {
    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.name}</td>
        </tr>
    )
};

export default App4;