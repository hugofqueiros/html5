/**
 * Created by hugo.queiros on 04/07/16.
 */

import React, {PropTypes} from 'react'
import ReactDom from 'react-dom'

class App3 extends React.Component {

    constructor() {
        super();
        this.state = {
            red: 0,
            green: 0,
            blue: 0
        };
        this.update = this.update.bind(this)
    }

    update(e) {
        this.setState({
            red: ReactDom.findDOMNode(this.refs.red.refs.inp).value,
            green: ReactDom.findDOMNode(this.refs.green.refs.inp).value
        })
    }

    // cast to a number {+this.state.val}
    render() {
        return (
            <div>
                <h1>React</h1>
                <NumInput
                    ref="red"
                    min={0}
                    max={255}
                    step={1}
                    val={this.state.val}
                    label="Red"
                    type="number"
                    update={this.update}
                />
                <NumInput
                    ref="green"
                    min={0}
                    max={255}
                    step={1}
                    val={this.state.val}
                    label="Green"
                    type="number"
                    update={this.update}
                />
            </div>
        )
    }
}

class NumInput extends React.Component {

    render() {
        const label = this.props.label !== '' ?
            <label>{this.props.label} - {this.props.val}</label> : '';

        const defaultValue = this.props.min > this.props.val ? this.props.min : this.props.val;

        console.log('defaultValue', defaultValue);

        return (
            <div>
                <input
                    ref="inp"
                    type={this.props.type}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    defaultValue={this.props.val}
                    onChange={this.props.update}/>
            </div>
        )
    }
}

NumInput.PropsTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    val: PropTypes.number,
    label: PropTypes.string,
    update: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['number', 'range'])
};

NumInput.defaultProps = {
    min: 0,
    max: 0,
    step: 1,
    val: 1,
    label: '',
    type: 'range'
};


export default App3;