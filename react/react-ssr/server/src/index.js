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

app.use(
	'/api',
	proxy('http://react-ssr-api.herokuapp.com', {
		proxyReqOptDecorator(opts) {
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

	Promise.all(promises).then(() => {
		const context = {};
		const content = renderer(req, store, context);

		if (context.url) {
			return res.redirect(301, context.url);
		}
		if (context.notFound) {
			res.status(404);
		}

		res.send(content);
	});
});

app.listen(PORT, () => {
	console.log('Listening on port 3000: ', PORT);
});
