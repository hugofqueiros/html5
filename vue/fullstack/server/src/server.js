const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {
    graphiqlExpress,
    graphqlExpress} = require('apollo-server-express');
//const mongoose = require('mongoose');

const port = 10101;
const app = express();

// app modules
const schema = require('./graphql-easy');

// setting up middleware for the app
app.use(cors());
app.use(morgan('dev'));

// setting up graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({
    // TOOD: adding schema and context
    schema
}));

// setting up a graphiql a ui for testing our query
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// starting the server
app.listen(port, () => {
    console.log(`starting grapql server on localhost:${port}`);
});

