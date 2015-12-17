MICROSCOPE
============
Learning from the Discover Meteor book.

Packages Installed
==================
meteor add twbs:bootstrap
meteor add iron:router
meteor add sacha:spin <-- spinner icon
meteor add ian:accounts-ui-bootstrap-3
meteor add accounts-password
meteor add check <-- check a JavaScript object against a predefined pattern
meteor add audit-argument-checks <-- makes sure you are using 'check' in every Meteor method

Configurations
==============
meteor remove autopublish
meteor remove insecure

NOTES
------
anything main.* is loaded AFTER everything else
Files in /lib are loaded BEFORE anything else 

In meteor, the var keyword limits the scope of an object to the current file.

Meteor Shell:
type 'meteor shell' to get into it


AUTORUN
=======
Getting code to run automatically anytime reactive data sources inside it change.
In this case the Session variable 'pageTitle'
Tracker.autorun( function() { console.log('Value is: ' + Session.get('pageTitle')); } );

AUTOPUBLISH
===========
meteor remove autopublish


CONCEPTS with autopublsh off
----------------------------
create a 'publications.js' file in server/.  This tells the app which collections
to make available.

Then, in the client main.js, subscribe to the publication

CONCEPT - PUBLICATION/SUBSCRIPTION
------------------------------------
On the server, take a parameter from the client which the client
sets in order to filter which data she wants.


CONCEPT - ROUTING
------------------
{{pathFor}} spacebar helper - tells Iron router to return the URL component of any route.

QUESTIONS
----------
Q:What is the 'fetch' command for browser-side?  Ex: Posts.find().fetch()
A:find() returns a cursor.  fetch() transforms this into an array.  Mostly
  used in the browser console - not directly in the meteor app