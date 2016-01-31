##Installing grunt (builds LESS, only necessary for dev)
```
$ npm install grunt grunt-contrib-less grunt-contrib-watch --save-dev
$ npm install
$ grunt watch
```

##Notes
Bower dependencies are checked in, node modules are not. This is because bower deps are necessary for production, npm/grunt isn't. Since I'm checking in compiled CSS, we don't need npm/grunt/whatever to build it to deploy it.

##Schema
```
/
| - app/                          // Angular app lives here
| - bower_components/             // Destination for bower dependencies. Including.
| - bower.json                    // List of HTML-ly dependencies to include.
| - css/                          // Compiled CSS, only add vendor stuff here.
|   | - style.css                   // LESS compiles everything into this file. Don't touch.
| - docs/                         // Docs
| - Grunfile.js                   // Tells grunt how to build less files.
| - img/
| - index.html                    // App container page
| - js/
| - less/                         // Write your LESS/CSS here
|   | - imports.less                // All *.less files need to be referenced here
```
