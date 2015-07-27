angular.module('ez.paginator').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ez_paginator/bar/bar.html',
    "<div class=\"ez-paginator-bar\"><span ez-paginator=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></span> <span ng-if=\"config.showLimit\" ez-paginator-limit=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></span> <span ng-if=\"config.showState\" ez-paginator-state=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></span></div>"
  );


  $templateCache.put('ez_paginator/limit/limit.html',
    "<span class=\"ez-paginator-limit dropdown\" ng-class=\"config.limitContainerClass\" dropdown><a class=\"dropdown-toggle\" ng-class=\"config.limitToggleClass\" dropdown-toggle title=\"Change Limit\">{{ pagination.limit }} <span class=\"caret\"></span></a><ul class=\"dropdown-menu\" ng-class=\"config.limitDropdownMenuClass\"><li ng-repeat=\"limit in config.limits\" ng-class=\"{active: limit == pagination.limit}\"><a ng-click=\"setLimit(limit)\">{{ ::limit }}</a></li></ul></span>"
  );


  $templateCache.put('ez_paginator/pager/pager.html',
    "<pager class=\"ez-pager\" total-items=\"pagination.itemCount\" items-per-page=\"pagination.limit\" ng-model=\"pagination.page\" ng-change=\"pageChanged()\"></pager>"
  );


  $templateCache.put('ez_paginator/paginator/paginator.html',
    "<pagination class=\"ez-paginator\" ng-if=\"config.showPaginator\" max-size=\"pagination.maxPages\" total-items=\"pagination.itemCount\" items-per-page=\"pagination.limit\" ng-model=\"pagination.page\" ng-change=\"pageChanged()\"></pagination>"
  );


  $templateCache.put('ez_paginator/state/state.html',
    "<span class=\"ez-paginator-state dropdown\" ng-class=\"config.stateContainerClass\" dropdown><a class=\"dropdown-toggle\" ng-class=\"config.stateToggleClass\" dropdown-toggle title=\"Change State\">{{ getName(pagination.state) }} <span class=\"caret\"></span></a><ul class=\"dropdown-menu\" ng-class=\"config.stateDropdownMenuClass\"><li ng-repeat=\"state in config.states\" ng-class=\"{active: state.id == pagination.state}\"><a ng-click=\"setState(state)\">{{ ::state.name }}</a></li></ul></span>"
  );

}]);
