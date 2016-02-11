

// Without persistent data
/*
if (Meteor.isClient) {
  // Code here only runs on the client
  // Assign some tasks to populate your data

  Template.body.helpers({
    tasks: [
      { text: "Plant cucumbers in fresh manure" },
      { text: "Move avocados to larger pots" },
      { text: "Go Fishing with Ben" },
      { text: "Take the wife to yoga" },
      { text: "Cancel tv subscription" }
    ]
  });
}
*/

Tasks = new Mongo.Collection("tasks");
// With persistent data MongoDB
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });

  Template.todo.helpers({
    tasks: function () {
      return Tasks.find({});
    },
    createdAt: function () {
      console.log('this', this);
      return moment(this.createdAt).fromNow();
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
