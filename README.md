EZ-PAGINATOR
============
Angular Bootstrap pagination directive. 

Provides additional functionality for the angular-ui bootstrap paginator

###Demo

View <a href="http://cdn.rawgit.com/jdewit/ez-paginator/master/index.html">DEMO</a>.

###Features
- "state" selector
- "limit" selector
- $routeParam updates or callback updates

###Requirements
- Angular 1.3+
- AngularUI Bootstrap

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

###Server side pagination
If you are not setting all of the items on the pagination object, you need to provide ensure that the properties "itemCount" and "pages" exits.Where itemCount is the number of total items in all the pages, and pages is the total number of pages.
