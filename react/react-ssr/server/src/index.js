// not going to import but running at runtime function for the async await functions
import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

const PORT = 3000;

// for the auth... instead sending the request directly to the api it will direct to the proxy
// if the browser ever attempts the make a request to out renderer server with a route /api
// this will attempt to proxy it off or send it off to the proxy server
app.use(
	'/api',
	proxy('http://react-ssr-api.herokuapp.com', {
		proxyReqOptDecorator(opts) {
            // required to go through the oauth stuff // &destination go back to localhost:3000
			opts.headers[ 'x-forwarded-host' ] = 'localhost:3000';
			return opts;
		}
	})
);

// treat public folder as a static or as a public directory that is available to the ouside world
app.use(express.static('public'));
app.get('*', (req, res) => {
	const store = createStore(req);

    // checks for the components that are going to be rendered and loads data
	const promises = matchRoutes(Routes, req.path)
		.map(({ route }) => {
			return route.loadData ? route.loadData(store) : null;
		})
		.map(promise => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve);
				});
			}
		});

        // if you add a catch statement you quit on the rendering (bailing early and not showing something useful to the user)
        // we shouldn't give up on the server rendering process... at least in this case
	Promise.all(promises).then(() => {
		const context = {};
		const content = renderer(req, store, context);

		if (context.url) {
			return res.redirect(301, context.url);
        }
        // check if it went to the NotFoundPage component
		if (context.notFound) {
			res.status(404);
		}

		res.send(content);
    });
});

app.listen(PORT, () => {
	console.log('Listening on port 3000: ', PORT);
});
