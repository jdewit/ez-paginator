EZ-PAGINATOR
============
Angular pagination directive. 

###Demo

View <a href="http://cdn.rawgit.com/jdewit/ez-paginator/master/index.html">DEMO</a>.

###Features
- "state" selector
- "limit" selector
- $routeParam updates or callback updates

###Requirements
- Angular 1.3+
- ez-dropdown (for paginator-bar)
- Bootstrap CSS

###Installation
```
$ bower install ez-paginator
```

```js
<link href="bower_components/ez-paginator/dist/ez-paginator.min.css"/>

<script src="bower_components/ez-paginator/dist/ez-paginator.min.js"/>
```

```js
angular.module('yourApp', ['ez.paginator'])
```

###Configuration
See <a href="src/js/config/config.js">Config</a> for the available configuration options.

Each option can be customized by:
1. Altering the ```EzPaginatorConfig``` constant
2. Setting a ```ez-config``` attribute with other config options
3. Setting the value of the config option via an attribute

See the demo for sample usage.
