// This all happens client-side
Template.postSubmit.onCreated(function() { 
	Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({ 
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field]; 
	},
	errorClass: function (field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	} 
});

Template.postSubmit.events({ 'submit form': function(e) {
		console.log("postSubmit form submitted");
	    e.preventDefault();
		var post = {
			url: $(e.target).find('[name=url]').val(), 
			title: $(e.target).find('[name=title]').val()
		};
		
		// Validate the post has the required fields
		var errors = validatePost(post); 
		if (errors.title || errors.url) {
			// use 'return' to terminate execution, not because we want to return anything back
			return Session.set('postSubmitErrors', errors);	
		}
		
		// initial code
		//post._id = Posts.insert(post);
		//console.log("New post id: " + post._id);
		//Router.go('postPage', post);
		
		// run the insert server-side
		Meteor.call('postInsert', post, function(error, result) {
			if (error) {
				//return alert(error.reason);
				//return throwError(error.reason);
				
				// uses the new 'errors' package I built
				return Errors.throw(error.reason);
			}
			
			// show this result but route anyway
			if (result.postExists) {
				//alert('This link has already been posted.');
				//throwError('This link has already been posted.');
				
				Errors.throw('This link has already been posted.');
			}
			
			// original placement
			Router.go('postPage', {_id: result._id});	
		});
		
		// Disable - this was a sideBar Exercise
		// Move outside the method call to demonstrate latency compensation
		//Router.go('postsList');
    }
});