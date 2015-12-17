Posts = new Mongo.Collection('posts');

/* was used when client-side post submit was enabled
Posts.allow({
	insert:function (userId, doc) {
		console.log("Check if inserts allowed, userId="+userId);
		// only allow posting if you are logged in
		// !! is similar to: if (userId !== undefined) this.userId = Boolean(userId)
		// or
		// rc = (userId != 0)
		// return rc
		return !! userId;
	}
});
*/

validatePost = function (post) { 
	var errors = {};
	if (!post.title) {
		errors.title = "Please fill in a headline";
	}
		
	if (!post.url) {
		errors.url = "Please fill in a URL";	
	}
	
	return errors; 
}

// concept #2 - add permissions to the post
Posts.allow({
	update: function(userId, post) {
		return ownsDocument(userId, post); 
	},
	remove: function(userId, post) {
		return ownsDocument(userId, post);
	}
});


// Just because the user can edit their own post we don't want
// them to be able to edit EVERY field name for the post.  Like,
// we don't want them to be able to assign the post to a different
// user
Posts.deny({
	update: function(userId, post, fieldNames) {
		// may only edit the following two fields:
		return (_.without(fieldNames, 'url', 'title').length > 0);
	}
});

Posts.deny({
	update: function(userId, post, fieldNames, modifier) 
	{
		var errors = validatePost(modifier.$set);
		return errors.title || errors.url; 
	}
});

// NOTE: This is called on BOTH the client, and the server (because it's in the lib/ directory)
Meteor.methods({
	postInsert: function(postAttributes) {
		// parameter validation
	    check(Meteor.userId(), String);
	    check(postAttributes, {
	      title: String,
	      url: String
	    });

	    // validate the post has the required fields
	    var errors = validatePost(postAttributes); 
	    if (errors.title || errors.url) {
	    	throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
	    }
	    
	    // Latency compensation
	    if (Meteor.isServer) {
	    	postAttributes.title += "(server)";
	    	// Disable this was a sideBar Exercise
	    	// wait for 5 seconds
	    	//Meteor._sleepForMs(5000);
	    } else {
	    	postAttributes.title += "(client)";
	    }
	    
	    // check to see if a post with the same url already exists
	    // if so, redirect user to this post instead of adding a new one
	    var postWithSameLink = Posts.findOne({url: postAttributes.url}); 
	    if (postWithSameLink) {
	    	return {postExists: true, _id: postWithSameLink._id } 
	    }
	    
		var user = Meteor.user();
		// _.extend() is part of the Underscore library
		// lets you "extend" one object with properties of another
		var post = _.extend(postAttributes, {
			userId: user._id, author: user.username, submitted: new Date()
		});
		
		var postId = Posts.insert(post);
		
		// I notice that the ID is the same on client and server
		// I wonder if this would be the case if there were many people
		// submitting posts simultaneously
		if (Meteor.isServer) {
			console.log("(server) postId="+postId);
		} else {
			console.log("(client) postId="+postId);
		}
		
		return { _id: postId }; 
	}
});