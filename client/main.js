// moved to lib/router.js
//Meteor.subscribe('posts');

// Sidebar code
Meteor.startup(function() {
	console.log("We are here");
	Tracker.autorun(function() {
		console.log("There are " + Posts.find().count() + " posts.");
	});
});