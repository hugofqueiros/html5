/**
 * Created by hugo.queiros on 04/07/16.
 */
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';

// Needed for onTouchTap
injectTapEventPlugin();

render(<Main />, document.getElementById('app'));