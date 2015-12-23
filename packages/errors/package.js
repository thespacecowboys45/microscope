Package.describe({
  name: 'thespacecowboys45:errors',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Discover Meteors microscope errors package',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/thespacecowboys45/microscope.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  // original
  //api.use('ecmascript');
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  
  // original
  //api.addFiles('errors.js');
  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');
  
  if (api.export) {
	  api.export('Errors');
  }
});

Package.onTest(function(api) {
	/* - original code
  api.use('ecmascript');
  api.use('tinytest');
  api.use('thespacecowboys45:errors');
  api.addFiles('errors-tests.js');
    */
	api.use('ecmascript');
	api.use('thespacecowboys45:errors', 'client');
	api.use(['tinytest', 'test-helpers'], 'client');
	
	api.addFiles('errors-tests.js', 'client');
});
