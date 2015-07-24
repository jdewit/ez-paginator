angular.module('ez.paginator').constant('EzPaginatorConfig', {

  /**
   * Max number of paginator pages
   */
  maxPages: 10,

  /**
   * Initial page number
   */
  initialPage: 1,

  /**
   * Update query string with pagination variables
   */
  useGetVars: false,

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
   * State select button class
   */
  stateToggleClass: 'btn btn-default',

  /**
   * State select dropdown menu class
   */
  stateDropdownMenuClass: 'pointer pull-right',

  /**
   * State select container class
   *
   * use "dropup" for up style dropdown
   */
  stateContainerClass: 'dropdown',

  /**
   * A list of possible limits
   */
  limits: [5, 15, 25, 50],

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
   *
   * use "dropup" for up style dropdown
   */
  limitContainerClass: 'dropdown',

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
          config[prop] = attrs[prop];    
        }
      });
    }

    return config;
  }


});
