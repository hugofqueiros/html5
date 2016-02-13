TasksPersist = new Mongo.Collection("tasksPersist");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: [
      { text: "This is task 1" },
      { text: "This is task 2" },
      { text: "This is task 3" }
    ]
  });

  Template.body.helpers({
    tasksPersist: function () {
      // Show newest tasks at the top
      return TasksPersist.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      TasksPersist.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.taskPers.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      TasksPersist.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      TasksPersist.remove(this._id);
    }
  });
}
