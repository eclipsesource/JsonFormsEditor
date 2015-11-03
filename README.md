# JsonForms Editor
A web-based editor to create and modify UI Schemata and Data Schemata for JsonForms. JsonForms can create fully functional form-based UIs out of that.

Checkout [JsonForms](http://github.eclipsesource.com/jsonforms) for further information.

## Build Process
Grunt is used as the build tool for JsonForms Editor. It is configurer via `Grundfile.js` and `build.config.js`.

The following tasks can be run from the command line:

**> grunt build** compiles all typescript to javascript, compiles all less to css, concatiantes all library scripts to one big `lib.js` and copies all other javascript files to the build directory. It furthermore adds all html templates to the angular-template cache and builds the `index.html` in order to include all the links to the scripts / css files.

**> grunt dev** does the same as `grunt build`, but starts a watch task afterwards. This will rebuild all, when grunt detects any changes in the typescript, javascript, css or html files.

**> grunt** is currently a shortcut to start the `grunt dev` task.

#### How to include new files
In order to include new files (library or source files) to the build process, one needs to add them to the `build.config.js`. This ensures that all files are included in the `index.html` in the specified order.

