const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./userType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: { // current user
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user
      }
    }
  }
});

module.exports = RootQueryType;
