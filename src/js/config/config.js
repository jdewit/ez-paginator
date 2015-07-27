angular.module('ez.paginator').constant('EzPaginatorConfig', {

  /**
   * Max number of paginator pages show
   */
  maxPages: 10,

  /**
   * Initial page number
   */
  initialPage: 1,

  /**
   * Show paginator by default
   */
  showPaginator: true,

  /**
   * Show state selector for paginator bar
   */
  showState: true,
  
  /**
   * Show limit selector for paginator bar
   */
  showLimit: true,

  /**
   * A list of possible states
   */
  states: [
    {
      id: 'active',
      name: 'Active'
    },
    {
      id: 'deleted',
      name: 'Deleted'
    }
  ],

  /**
   * Default state if none is set
   */
  defaultState: 'active',

  /**
   * State select button class
   */
  stateToggleClass: 'btn btn-default',

  /**
   * State select dropdown menu class
   */
  stateDropdownMenuClass: 'pointer pull-right',

  /**
   * State select container class
   */
  stateContainerClass: 'dropup',

  /**
   * A list of possible limits
   */
  limits: [5, 15, 25, 50],

  /**
   * Default limit if none is set
   */
  defaultLimit: 15,

  /**
   * Limit select button class
   */
  limitToggleClass: 'btn btn-default',

  /**
   * Limit select dropdown menu class
   */
  limitDropdownMenuClass: 'pointer pull-right',

  /**
   * Limit select container class
   */
  limitContainerClass: 'dropup',

  /**
   * Get resolved config
   *
   * Resolve this constant with options set on attrs or ezConfig
   */
  get: function(scope, attrs) {
    var config = angular.extend({}, this);

    delete config.get; // remove get function

    if (!!scope.ezConfig) {
      config = angular.extend(config, scope.ezConfig);
    }

    if (!!scope && !!attrs) {
      var properties = Object.getOwnPropertyNames(this);

      properties.forEach(function(prop) {
        if (attrs.hasOwnProperty(prop)) {
          if (typeof config[prop] === 'boolean') {
            if (attrs[prop] === 'true') {
              config[prop] = true;
            } else if (attrs[prop] === 'false') {
              config[prop] = false;
            } else {
              config[prop] = scope.$parent[attrs[prop]];
            }
          } else {
            config[prop] = attrs[prop];    
          }
        }
      });
    }

    return config;
  }

});
