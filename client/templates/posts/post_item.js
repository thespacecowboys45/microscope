Template.postItem.helpers({
	ownPost: function() {
		// true if the postItem's userId is the current metoer userId
		return this.userId == Meteor.userId();
	},
	domain: function() {
		var a = document.createElement('a'); 
		a.href = this.url;
		return a.hostname;
	} 
});