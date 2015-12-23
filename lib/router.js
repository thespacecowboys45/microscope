Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		var rc = Meteor.subscribe('posts');
		var rc2 = Meteor.subscrbe('comments');
		return  [rc, rc2];
	}
});

Router.route('/submit', {name: 'postSubmit'});

// 'name' corresponds to a template name
Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() {
		return Posts.findOne(this.params._id); 
	}
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); }
});


var requireLogin = function() { 
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');			
		}
	} 
	else 
	{
		this.next(); 
	}
}

// If the user navigates to a page with an invalid post ID
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});