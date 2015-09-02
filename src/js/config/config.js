angular.module('ez.paginator').constant('EzPaginatorConfig', {

  showBoundaryLinks: false,

  showDirectionLinks: true,

  firstBtnText: '',

  firstBtnIconClass: 'fa fa-angle-double-left',

  prevBtnText: '',

  prevBtnIconClass: 'fa fa-angle-left',

  nextBtnText: '',

  nextBtnIconClass: 'fa fa-angle-right',

  lastBtnText: '',

  lastBtnIconClass: 'fa fa-angle-double-right',

  pagerPrevBtnText: 'Previous',

  pagerPrevBtnIconClass: 'fa fa-angle-double-left',

  pagerNextBtnText: 'Next',

  pagerNextBtnIconClass: 'fa fa-angle-double-right',

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
  stateDropdownMenuClass: 'dropdown-menu pointer pull-right',

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
  limitDropdownMenuClass: 'dropdown-menu pointer pull-right',

  /**
   * Limit select container class
   */
  limitContainerClass: 'dropup',

});
