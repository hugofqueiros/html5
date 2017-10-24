const graphql = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLString 
} = graphql;
const UserType = require('./types/userType');
const AuthService = require('../services/auth');

// signup, login, logup
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {email, password}, req) { // request - represents the request object coming from express
                return AuthService.signup({email, password, req}); // service with helper function that returns a Promise
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const {user} = req;
                req.logout(); // removes the user property from the req express object
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {email, password}, req) {
                return AuthService.login({email, password, req});
            }
        }
    }
});

module.exports = mutation;