# My meteor app

Just a simple app from this tutorial:
http://code.tutsplus.com/tutorials/rapid-web-application-development-with-meteor--cms-25130

## Adding persistent data with MongoDB
The line Tasks = new Mongo.Collection("tasks"); tells Meteor to set up a MongoDB collection named tasks.
The repercussion for this in Meteor is that on the client it creates a cached connection to the server collection.

To insert data we can use the servers console. 
To start it from a new terminal window, cd into your app’s directory and run 
(this must be done whilst meteor is running in a separate tab):
```
$ meteor mongo
```

Now, inside the console for your app’s Mongo DB, add a record with:
```
db.tasks.insert({ text: "New task from mongo!", createdAt: new Date() });
```

