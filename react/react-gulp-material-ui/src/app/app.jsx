import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main'; // Custom React Component

/**
 * Needed for onTouchTap
 * Can go away when react 1.0 release
 * check repo: https://github.com/zilverline/react-tap-event-plugin
 */
injectTapEventPlugin();

// Render the main app react component into the app div.
ReactDOM.render(<Main />, document.getElementById('app'));