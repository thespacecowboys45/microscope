// This all happens client-side
Template.postEdit.onCreated(function() { 
	Session.set('postEditErrors', {});
});

Template.postEdit.helpers({ 
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field]; 
	},
	errorClass: function (field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	} 
});

Template.postEdit.events({ 'submit form': function(e) 
	{
	    e.preventDefault();
		var currentPostId = this._id;
		var postProperties = {
				url: $(e.target).find('[name=url]').val(), 
				title: $(e.target).find('[name=title]').val()
		}
		
		// Validate the post has the required fields
		var errors = validatePost(post); 
		if (errors.title || errors.url) {
			// use 'return' to terminate execution, not because we want to return anything back
			return Session.set('postEditErrors', errors);	
		}		
		
		Posts.update(currentPostId, {$set: postProperties}, function(error) { 
			if (error) {
		        // display the error to the user
				//alert(error.reason);
				throwError(error.reason);
			} else {
		        Router.go('postPage', {_id: currentPostId});
		    }
		}); 
	},
	
	'click .delete': function(e) { 
		e.preventDefault();
		if (confirm("Delete this post?")) { 
			var currentPostId = this._id; 
			Posts.remove(currentPostId); 
			Router.go('postsList');
		} 
	}
});