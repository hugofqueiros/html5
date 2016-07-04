/**
 * Created by hugo.queiros on 04/07/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

let Mixin = InnerComponent => class extends React.Component {
    // without constructor we cannot use this in the constructor
    constructor() {
        super();

        this.state = {
            val: 1
        };

        this.update = this.update.bind(this);
    }

    componentWillMount() {
        console.log('will mount');
    }

    update(e) {
        this.setState({
            val: this.state.val + 1
        })
    }

    render() {
        return <InnerComponent
            update={this.update}
            title="title"
            {...this.state}
            {...this.props}
        />
    }

    componentDidMount() {
        console.log('Mount');
    }

};

// witout this because it's a stateless component
const Button = (props) => <button title={props.title} onClick={props.update} > {props.txt} - {props.val}</button>;

const Label = (props) => <label onMouseMove={props.update}> {props.txt} - {props.val}</label>

let ButtonMixin = Mixin(Button);

class App2 extends React.Component {

    render() {
        return (
            <div>
                <ButtonMixin txt="Button" />
            </div>
        )
    }
}

export default App2;