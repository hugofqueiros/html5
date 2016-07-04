import React from 'react';
import ReactDOM from 'react-dom';

let Mixin = InnerComponents => class extends React.Component {

};

class App extends React.Component {
  // without constructor we cannot use this in the constructor
  constructor() {
    super();

    this.state = {
      txtState: 'txt State',
      red: 0,
      green: 0,
      blue: 0,
      val: 1,
      val2: 0,
      increasing: false
    };

    this.update = this.update.bind(this);
  }

  update(e) {
    console.log('update', e);
    console.log('ReactDom', ReactDOM.findDOMNode(this.refs.red.refs.ind));

    this.setState({
      //txtState: e.target.value,
      red: ReactDOM.findDOMNode(this.refs.red.refs.ind).value,
      green: ReactDOM.findDOMNode(this.refs.green.refs.ind).value,
      blue: ReactDOM.findDOMNode(this.refs.blue.refs.ind).value,
      val: this.state.val + 1,
      m: 2
    });
  }

  componentWillMount() {
    console.log('mounting');

    //this.inc = setInterval(this.update, 500);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    this.setState({increasing: nextProps.val > this.props.val})
  }

  souldComponentUpdate(nextProps, nextState) {
    console.log('souldComponentUpdate');
    return nextProps.val % 5 === 0;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
  }

  componentDidMount() {
    console.log('mounted');
  }

  componentWillUnmount() {

    console.log('unmount');
    //clearTimeout(this.inc);
  }

  render() {
    const color = "rgb(" + this.state.red + ',' + this.state.green + ',' + this.state.blue + ')';

    //const txt = this.props.txt;
    //const txtState = this.state.txtState;

    const style = {
      backgroundColor: color
    };

    return (
        <div style={style}>
          <Slider ref="red" update={this.update} />
          <Slider ref="green" update={this.update} />
          <Slider ref="blue" update={this.update} />
          <Button>I <Heart/> React</Button>
          <button onClick={this.update}>{this.state.val}</button>
          <Wrapper />
          <button onClick={this.update}>
            {this.props.val}
          </button>
        </div>
    )
  }
}

/*

 <Widget txt={txtState} update={this.update} />
 <Widget txt={txtState} update={this.update} />
 <Widget txt={txtState} update={this.update} />

{this.props.txt}
<div>{txtState}</div>
<input type="text" onChange={this.update.bind(this)} />
*/

/*App.propTypes = {
    txt: React.PropTypes.string,
    cat: React.PropTypes.number.isRequired
};

App.defaultProps = {
    txt: 'My default props'
};*/

class Button extends React.Component {
  render() {
    return (
        <button>{this.props.children}</button>
    )
  }
}

const Heart = () => <span className="glyphicon glyphicon-heart"></span>

class Slider extends React.Component {
    render() {
      return(
          <div>
            <input
              type="range"
              min="0"
              max="255"
              ref="ind"
              onChange={this.props.update} />
          </div>
      )
    }
}

// Stateless component
const Widget = (props) => {
    return (
        <div>
          <div>{props.txt}</div>
          <input type="text"
                 onChange={props.update} />
        </div>
    )
};

class Wrapper extends React.Component{
  constructor() {
    super();
  }

  mount() {
    ReactDOM.render(<App/>, document.getElementById('app'))
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  }

  render() {
    return(
        <div>
          <button onClick={this.mount.bind(this)}>Mount</button>
          <button onClick={this.unmount.bind(this)}>unMount</button>
        </div>
    )
  }
}

export default App;


// return <div>Hello</div>      tag   props, html
// = return React.createElement('div', null, 'Hello')

// stateless component function
/*
const App = () => <div>Hello Gigigo</div>

export default App*/
