The Type List tells graphql that we would have a data of List with the following properties: id, title and owner, the “!” attach to the data type; which means the field is required. Then we create a query type which shows how we want to query data from the Data source. We export the template literal, so we can use it to create a schema.

Here we are creating a resolver. A Resolver is a means we use to get data form the data source. In the case we are using it to resolve data following the rules given in our query in typeDefs.js. Though we are not connecting to a real database yet. We export the object which we would used to make an executable schema using graphql-tools.

This returns a graphql schema from the resolvers and typeDefs 
