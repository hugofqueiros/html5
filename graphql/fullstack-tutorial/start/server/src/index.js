const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers'); // to connect our resolvers map to Apollo Server

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();

const dataSources = () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
});
// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = new Buffer(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] ? users[0] : null;

    return { user: { ...user.dataValues } };
};

const server = new ApolloServer({
        typeDefs,
        resolvers, // Apollo Server will automatically add the launchAPI and userAPI to our resolvers' context so we can easily call them.
        context,
        playground: { version: '1.7.25' },
        dataSources
    }
);

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
