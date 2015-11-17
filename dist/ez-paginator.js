angular.module("ez.paginator", []);

angular.module("ez.paginator").directive("ezPaginatorBar", [ "EzConfigResolver", "EzPaginatorConfig", function(EzConfigResolver, EzPaginatorConfig) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/bar/bar.html",
        link: function(scope, $el, attrs) {
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
        }
    };
} ]);

angular.module("ez.paginator").constant("EzPaginatorConfig", {
    showBoundaryLinks: false,
    showDirectionLinks: true,
    firstBtnText: "",
    firstBtnIconClass: "fa fa-angle-double-left",
    prevBtnText: "",
    prevBtnIconClass: "fa fa-angle-left",
    nextBtnText: "",
    nextBtnIconClass: "fa fa-angle-right",
    lastBtnText: "",
    lastBtnIconClass: "fa fa-angle-double-right",
    pagerPrevBtnText: "Previous",
    pagerPrevBtnIconClass: "fa fa-angle-double-left",
    pagerNextBtnText: "Next",
    pagerNextBtnIconClass: "fa fa-angle-double-right",
    maxPages: 10,
    initialPage: 1,
    showPaginator: true,
    showState: true,
    showLimit: true,
    states: [ {
        id: "active",
        name: "Active"
    }, {
        id: "deleted",
        name: "Deleted"
    } ],
    defaultState: "active",
    stateToggleClass: "btn btn-default",
    stateDropdownMenuClass: "dropdown-menu pointer pull-right",
    stateContainerClass: "dropup",
    limits: [ 5, 15, 25, 50 ],
    defaultLimit: 15,
    limitToggleClass: "btn btn-default",
    limitDropdownMenuClass: "dropdown-menu pointer pull-right",
    limitContainerClass: "dropup"
});

angular.module("ez.paginator").directive("ezPaginatorLimit", [ "$routeParams", "$location", "EzConfigResolver", "EzPaginatorConfig", function($routeParams, $location, EzConfigResolver, EzPaginatorConfig) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/limit/limit.html",
        link: function(scope, $el, attrs) {
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
            var useCallback = typeof scope.onChange === "function";
            if (!scope.pagination.limit || scope.config.limits.indexOf(scope.pagination.limit) === -1) {
                var limit = $location.search().limit;
                if (!useCallback && !!limit && scope.config.limits.indexOf(limit)) {
                    scope.pagination.limit = limit;
                }
            }
            if (!scope.pagination.limit) {
                scope.pagination.limit = scope.config.defaultLimit;
            }
            scope.setLimit = function(limit) {
                scope.pagination.limit = limit;
                scope.pagination.page = 1;
                if (useCallback) {
                    scope.onChange(scope.pagination);
                } else {
                    $routeParams.limit = limit;
                    $routeParams.page = 1;
                    $location.search($routeParams);
                }
            };
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPager", [ "EzConfigResolver", "EzPaginatorConfig", "$location", "$routeParams", function(EzConfigResolver, EzPaginatorConfig, $location, $routeParams) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/pager/pager.html",
        link: function(scope, $el, attrs) {
            var useCallback = typeof scope.onChange === "function";
            var init = function() {
                scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
                scope.pagination.items = scope.pagination.items || [];
                if (!scope.pagination.page && !useCallback) {
                    scope.pagination.page = $location.search().page;
                }
                if (!scope.pagination.page) {
                    scope.pagination.page = scope.config.initialPage;
                }
                if (!scope.pagination.limit) {
                    scope.pagination.limit = scope.config.defaultLimit;
                }
                if (!scope.pagination.pages) {
                    scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit) || 1;
                }
                if (!scope.pagination.itemCount) {
                    scope.pagination.itemCount = scope.pagination.items.length;
                }
            };
            scope.selectPage = function(pageNumber) {
                if (pageNumber < 1) {
                    pageNumber = 1;
                } else if (pageNumber > scope.pagination.pages) {
                    pageNumber = scope.pagination.pages;
                }
                scope.pagination.page = pageNumber;
                if (useCallback) {
                    scope.onChange(scope.pagination);
                } else {
                    $routeParams.page = scope.pagination.page;
                    $location.search($routeParams);
                }
            };
            init();
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPaginator", [ "$location", "$routeParams", "EzPaginatorConfig", "EzConfigResolver", function($location, $routeParams, EzPaginatorConfig, EzConfigResolver) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/paginator/paginator.html",
        link: function(scope, $el, attrs) {
            var useCallback = typeof scope.onChange === "function";
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
            scope.$watch("pagination.pages", function(n, o) {
                if (n !== o) {
                    draw();
                }
            });
            scope.pagination.update = function() {
                scope.selectPage(scope.pagination.page);
            };
            function draw() {
                scope.pages = [];
                if (!scope.pagination.items) {
                    scope.pagination.items = [];
                }
                if (!scope.pagination.limit) {
                    scope.pagination.limit = scope.config.defaultLimit;
                }
                if (!scope.pagination.itemCount) {
                    scope.pagination.itemCount = scope.pagination.items.length;
                }
                if (!scope.pagination.pages) {
                    scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit) || 1;
                }
                var _pageNumber = scope.pagination.page;
                if (_pageNumber !== 1) {
                    var offset = Math.floor(scope.config.maxPages / 2);
                    if (_pageNumber + offset > scope.pagination.pages) {
                        _pageNumber = scope.pagination.pages - scope.config.maxPages + 1;
                    } else {
                        _pageNumber = _pageNumber - offset;
                    }
                    if (_pageNumber < 1) {
                        _pageNumber = 1;
                    }
                }
                for (var i = 1, l = scope.pagination.pages; _pageNumber <= l && i <= scope.config.maxPages; i++) {
                    scope.pages.push({
                        text: _pageNumber,
                        number: _pageNumber
                    });
                    _pageNumber++;
                }
            }
            scope.selectPage = function(pageNumber, init) {
                if (!pageNumber) {
                    if (!useCallback) {
                        pageNumber = $location.search().page || scope.config.initialPage;
                    } else {
                        pageNumber = scope.config.initialPage;
                    }
                }
                pageNumber = parseInt(pageNumber, 10);
                if (pageNumber < 1) {
                    pageNumber = 1;
                } else if (pageNumber > scope.pagination.pages) {
                    pageNumber = scope.pagination.pages;
                }
                scope.pagination.page = pageNumber;
                if (!init) {
                    if (useCallback) {
                        scope.onChange(scope.pagination);
                    } else {
                        $routeParams.page = scope.pagination.page;
                        $location.search($routeParams);
                    }
                    if (!scope.pages.length || scope.pages[0].number > scope.pagination.page || !scope.pages[scope.config.maxPages - 1] || scope.pages[scope.config.maxPages - 1].number < scope.pagination.page) {
                        draw();
                    }
                }
            };
            scope.selectPage(null, true);
            draw();
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPaginatorState", [ "$routeParams", "$location", "EzConfigResolver", "EzPaginatorConfig", function($routeParams, $location, EzConfigResolver, EzPaginatorConfig) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/state/state.html",
        link: function(scope, $el, attrs) {
            scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
            var useCallback = typeof scope.onChange === "function";
            if (!scope.pagination.state) {
                if (!useCallback) {
                    scope.pagination.state = $location.search().state;
                } else {
                    scope.pagination.state = scope.config.defaultState;
                }
            }
            scope.getName = function getState(id) {
                var state = scope.config.states[0];
                if (!!id) {
                    for (var i = 0; i < scope.config.states.length; i++) {
                        if (scope.config.states[i].id === id) {
                            state = scope.config.states[i];
                            break;
                        }
                    }
                }
                return state.name;
            };
            scope.setState = function(state) {
                scope.pagination.state = state.id;
                scope.pagination.page = 1;
                if (useCallback) {
                    scope.onChange(scope.pagination);
                } else {
                    $routeParams.state = state.id;
                    $routeParams.page = 1;
                    $location.search($routeParams);
                }
            };
        }
    };
} ]);