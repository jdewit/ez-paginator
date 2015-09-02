angular.module('ez.paginator').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ez_paginator/bar/bar.html',
    "<div class=\"ez-paginator-bar\"><ez-paginator pagination=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></ez-paginator><ez-paginator-limit ng-if=\"config.showLimit\" pagination=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></ez-paginator-limit><ez-paginator-state ng-if=\"config.showState\" pagination=\"pagination\" on-change=\"onChange\" ez-config=\"config\"></ez-paginator-state></div>"
  );


  $templateCache.put('ez_paginator/limit/limit.html',
    "<span dropdown class=\"ez-paginator-limit\" ng-class=\"config.limitContainerClass\"><a dropdown-toggle ng-class=\"config.limitToggleClass\" title=\"Change Limit\">{{ pagination.limit }} <span class=\"caret\"></span></a><ul ng-class=\"config.limitDropdownMenuClass\"><li ng-repeat=\"limit in config.limits\" ng-class=\"{active: limit == pagination.limit}\"><a ng-click=\"setLimit(limit)\">{{ ::limit }}</a></li></ul></span>"
  );


  $templateCache.put('ez_paginator/pager/pager.html',
    "<ul class=\"ez-pager pager\"><li ng-class=\"{disabled: pagination.page <= 1}\"><a ng-click=\"selectPage(pagination.page - 1)\"><i class=\"{{::config.pagerPrevBtnIconClass}}\"></i> {{::config.pagerPrevBtnText}}</a></li><li ng-class=\"{disabled: pagination.page >= pagination.pages}\"><a ng-click=\"selectPage(pagination.page + 1)\">{{::config.pagerNextBtnText}} <i class=\"{{::config.pagerNextBtnIconClass}}\"></i></a></li></ul>"
  );


  $templateCache.put('ez_paginator/paginator/paginator.html',
    "<ul class=\"ez-paginator pagination\" ng-hide=\"pagination.page == 1 && pagination.pages == 1\"><li ng-if=\"::config.showBoundaryLinks\" ng-class=\"{disabled: pagination.page == 1}\" class=\"pagination-first\"><a ng-click=\"selectPage(1, 'first')\"><i class=\"{{::config.firstBtnIconClass}}\"></i> {{::config.firstBtnText}}</a></li><li ng-if=\"::config.showDirectionLinks\" ng-class=\"{disabled: pagination.page == 1}\" class=\"pagination-prev\"><a ng-click=\"selectPage(pagination.page - 1, 'prev')\"><i class=\"{{::config.prevBtnIconClass}}\"></i> {{::config.prevBtnText}}</a></li><li ng-show=\"pages[0].number != 1\" class=\"pagination-left\"><a ng-click=\"selectPage(pages[0].number - config.maxPages, 'left')\">...</a></li><li ng-repeat=\"page in pages\" ng-class=\"{active: page.number == pagination.page}\" class=\"pagination-page\"><a ng-click=\"selectPage(page.number)\">{{::page.text}}</a></li><li ng-show=\"pages[pages.length -1].number != pagination.pages\" class=\"pagination-right\"><a ng-click=\"selectPage(pages[config.maxPages - 1].number, 'right')\">...</a></li><li ng-if=\"::config.showDirectionLinks\" ng-class=\"{disabled: pagination.page >= pagination.pages}\" class=\"pagination-next\"><a ng-click=\"selectPage(pagination.page + 1, 'next')\">{{::config.nextBtnText}} <i class=\"{{::config.nextBtnIconClass}}\"></i></a></li><li ng-if=\"::config.showBoundaryLinks\" ng-class=\"{disabled: pages[pages.length - 1].number >= pagination.pages}\" class=\"pagination-last\"><a ng-click=\"selectPage(pagination.pages, 'last')\">{{::config.lastBtnText}} <i class=\"{{::config.lastBtnIconClass}}\"></i></a></li></ul>"
  );


  $templateCache.put('ez_paginator/state/state.html',
    "<span dropdown class=\"ez-paginator-state\" ng-class=\"config.stateContainerClass\"><a dropdown-toggle ng-class=\"config.stateToggleClass\" title=\"Change State\">{{ getName(pagination.state) }} <span class=\"caret\"></span></a><ul ng-class=\"config.stateDropdownMenuClass\"><li ng-repeat=\"state in config.states\" ng-class=\"{active: state.id == pagination.state}\"><a ng-click=\"setState(state)\">{{ ::state.name }}</a></li></ul></span>"
  );

}]);
