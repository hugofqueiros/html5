/**
 * Created by hfq on 22/02/16.
 *
 * state = 0
 */

import { createStore } from 'redux';

const counter = (state = 0, action) => {
	switch(action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		// if it is an unknown state it will return the current state
		default:
			return state
	}
};

/*
const store = createStore(counter);

console.log(store.getState()); // -> returns 0 bc its the initial state of the redux store (app)

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // -> returns 1

// let's you register a callback, will cal anytime and action is dispatched
store.subscribe(() => {
	document.body.innerText = store.getState();
});
*/


export default counter;