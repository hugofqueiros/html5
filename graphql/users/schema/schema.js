const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;

const users = [
    { id: '1', firstName: 'Bill', age: 20 },
    { id: '2', firstName: 'Samantha', age: 21 },
];

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: { type: GraphQLString } },
            // go to the database and find the data we are looking for
            resolve(parentValue, args) {
                console.log('parentValue', parentValue)
                console.log('ARGS: ', args);
                //return _.find(users, { id: args.id });
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);  // bc axios returns a promise with data inside a property data object
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});