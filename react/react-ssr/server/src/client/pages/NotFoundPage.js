import React from 'react';

// we are rendering our application with our browser router
const NotFoundPage = ({ staticContext = {} }) => {
	staticContext.notFound = true;
	return <h1>Ooops, route not found.</h1>;
};

export default {
	component: NotFoundPage
};
