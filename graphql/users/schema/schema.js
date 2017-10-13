const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList
} = graphql;

const users = [
    { id: '1', firstName: 'Bill', age: 20 },
    { id: '2', firstName: 'Samantha', age: 21 },
];

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({ // to solve the problem of circular reference -> this function gets defined but not executed
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: { //http://localhost:3000/companies/2/users -> get all users that belong to that company from the json server
            type: new GraphQLList(UserType),
            // we don't need any ards
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(resp => resp.data);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        // association
        company: {  // we can drop the Id on the companyId (User Model - graphQl)
            type: CompanyType,
            resolve(parentValue, args) { // association 1 user -> one company
                console.log('resolve company on user: ', parentValue, args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(resp => resp.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: { type: GraphQLString } },
            // go to the database and find the data we are looking for
            resolve(parentValue, args) {
                console.log('ROOT USER parentValue', parentValue)
                console.log('ROOT USER ARGS: ', args);
                //return _.find(users, { id: args.id });
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);  // bc axios returns a promise with data inside a property data object
            }
        },
        company: { // sigling to user
            type: CompanyType,
            args: {id : { type: GraphQLString } },
            resolve(parentValue, args) {
                console.log('ROOT COMPANY parentValue', parentValue)
                console.log('ROOT COMPANY ARGS: ', args);
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(resp => resp.data);
            } 
        }
    }
});

const mutation = new GraphQLObjectType ({
    name: 'Mutation',
    fields: { // fields add the action that you want to make
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) }, // has to have it on validation
                age: {type: new GraphQLNonNull(GraphQLInt) },   // has too
                companyId: {type: GraphQLString } // a user doesn't have to have a company
            },
            resolve(parentValue, {firstName, age}) {
                return axios.post('http://localhost:3000/users', {
                    firstName,
                    age
                }).then(res => res.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, {id}) {
                return axios.delete(`http://localhost:3000/users/${id}`)
                    .then(res => res.date);
            }
        },
        editUser: {
            type: UserType,     // what you want to get from the response
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}, // you will always need to send the id 
                firstName: { type: GraphQLString }, // these are optional
                age: {type: GraphQLInt },
                companyId: {type: GraphQLString }
            },
            resolve(parentValue, {id, firstName, age, companyId}) {
                return axios.patch(`http://localhost:3000/users/${id}`, {
                    firstName, // args
                    age,
                    companyId
                }).then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});