<h2>Portal Demo</h2>

This unbranded project is for phase 1 of an internal facing portal. Phase 2 will involve a migration into a CMS system such as the Drupal based Open Atrium product. Migration should be fairly simple though may require the removal of React & JSON components in favor of a more database orientated approach.

A simple REST web service (PHP) has been included to allow modification of the posts JSON file. Eventually would like to move to either SQLite or some kind of NoSQL DB.<br/>
Composer has been added to handle autoloading for the GeoIP location service.<br/>

This is based on a frontend skeleton using Gulp/Babel (ES 2015) + Browserify/SASS/Jasmine/PUG.<br />
Also included is lodash/jQuery/Bootstrap/Font Awesome<br />
Yarn has been included for the option to *not* use NPM.<br />

For deployment, the /build folder can be used directly. Or, if preferred, the project can be cloned and then 'npm start' may be ran to generate a new 'build'.
<br />
If pulling down this project on a new machine, be sure to run npm install and install Composer to run php composer.phar install for the PHP required assets.

There are two ways to use this:<br />
<h4>Method 1 (Retains /build)</h4>

```
npm install
```

<h4>Method 2 (Use Gulp to generate a new /build)</h4>

```
npm start
```

For development Live Reload is implemented by the gulp task 'gulp webserver', however, if you run the 'gulp watch' or 'gulp watch:babel' tasks your source directories will be watched accordingly, as well.<br />
If you add a new directory, a new watch task will need to be generated. CSS/SCSS/JS/IMG/HTML(pages) folders are watched currently.<br />

Two 'methodologies' are supported - either using ES6+SASS+PUG or using regular CSS/JS files. SASS is incorporated with the regular tasks if desired, however, browserify is only implemented for the ES6 code. Using PUG is optional.
<br/>
<br/>
If you'd like to use another grid system or CSS framework feel free to just run:
```
npm uninstall bootstrap-sass
npm uninstall font-awesome
npm uninstall jquery
npm uninstall lodash
```
Note, you will have to modify gulpfile.babel.js to remove references to these libraries because they are copied over by default (bootstrap-sass & font-awesome, etc.). <br/>
source/sass/vendor.scss also contains references to these files due to imports as well as source/index.html or source/pug/_includes/head.pug and source/pug/_includes/foot.pug.<br/>

Gulp Commands:
```
gulp - builds everything from node_modules and source
gulp dirty_build - builds everything from node_modules and source without clearing the build folder
gulp diry_build_babel - builds everything from node_modules and source without clearing the build folder, also uses SASS and ES6+Browserify
gulp watch - watch source directories for changes, if detected deploy to build. Doesn't use ES6/Babel
gulp watch:babel - watch source diretories for changes, if detected deploy to build. Uses ES6/Babel.
gulp webserver - starts live reload monitoring & watching source directories for building (by default uses watch babel)
gulp noes6 - builds everything from node_modules and source, doesn't use ES6
```

Prerequisites:<br/>
[Node/NPM](https://nodejs.org/en/)<br />
[Git](https://github.com)<br/>
[Composer](http://getcomposer.org/)
<br/>
