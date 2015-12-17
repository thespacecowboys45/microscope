Template.postsList.helpers({
  posts: function() {
	  //return Posts.find();
	  
	  // sort by date submitted
	  return Posts.find({}, {sort: {submitted: -1}});
  }
});