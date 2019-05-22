const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers'); // to connect our resolvers map to Apollo Server

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: { version: '1.7.25' },
        dataSources: () => ({
            launchAPI: new LaunchAPI(),
            userAPI: new UserAPI({ store })
        })
    }
);

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
