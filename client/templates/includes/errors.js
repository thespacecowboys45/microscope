Template.errors.helpers({ 
	errors: function() {
		return Errors.find(); 
	}
});

// Remove the error from the DOM after it fades out
Template.error.onRendered(function() { 
	var error = this.data; Meteor.setTimeout(function () {
		Errors.remove(error._id);
	}, 3000);
});