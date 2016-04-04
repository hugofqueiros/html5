var React = require('react');

// Render the view on client side
var ReactDOM = require('react-dom')

var Main = React.createClass({
    render: function() {
        return (
            <div>
                Hello World
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById('app'));