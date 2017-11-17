import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

export default req => {
    // so not add axios to every action creators to figure out that it is a server or a client making requests
    // this creates an instance with a custom config
    // this is for the server, there is another one for the clien where we don't have to attach the cookie
    // we need to add the header that is sent by the client, if the user has a cookie it attaches it
    // the api is goin to be tricked into thinking the request is actually coming from a real user
    const axiosInstance = axios.create({
		baseURL: 'http://react-ssr-api.herokuapp.com',
		headers: { cookie: req.get('cookie') || '' }
	});

	const store = createStore(
		reducers,
		{},
		applyMiddleware(thunk.withExtraArgument(axiosInstance))
	);

	return store;
};
