import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {Router, hashHistory, Route, IndexRouter} from 'react-router';

import App from './components/App';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: { 
    credentials: 'same-origin' // apollo client should send along cookies to the server reqs
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}></Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
