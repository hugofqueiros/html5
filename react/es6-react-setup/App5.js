/**
 * Created by hugo.queiros on 04/07/16.
 */
import React, {Component, PropTypes} from 'react'
import ReactDom from 'react-dom'

class App5 extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '/* Add your jsx here */',
            output: '',
            err: ''
        };
        this.update = this.update.bind(this);
    }

    update(e) {
        let code = e.target.value;
        try {
            this.setState({
                output: babel.transform(code , {
                    stage: 0,
                    loose: 'all'
                }).code,
                err: ''
            })
        }
        catch (err) {
            this.setState({err: err.message})
        }
    }

    render() {
        return (
            <div>
                React JSX Compiler
                <header>{this.state.err}</header>
                <div className="container">
                    <textarea
                        onChange={this.update}
                        defaultValue={this.state.input}
                    />
                </div>
                <pre>
                    {this.state.output}
                </pre>
            </div>

        )
    }
}

export default App5;