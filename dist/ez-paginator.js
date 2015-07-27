angular.module("ez.paginator", []);

angular.module("ez.paginator").directive("ezPaginatorBar", [ "EzPaginatorConfig", function(EzPaginatorConfig) {
    return {
        restrict: "EA",
        scope: {
            pagination: "=ezPaginatorBar",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/bar/bar.html",
        link: function(scope, $el, attrs) {
            scope.config = EzPaginatorConfig.get(scope, attrs);
        }
    };
} ]);

angular.module("ez.paginator").constant("EzPaginatorConfig", {
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
    stateDropdownMenuClass: "pointer pull-right",
    stateContainerClass: "dropup",
    limits: [ 5, 15, 25, 50 ],
    defaultLimit: 15,
    limitToggleClass: "btn btn-default",
    limitDropdownMenuClass: "pointer pull-right",
    limitContainerClass: "dropup",
    get: function(scope, attrs) {
        var config = angular.extend({}, this);
        delete config.get;
        if (!!scope.ezConfig) {
            config = angular.extend(config, scope.ezConfig);
        }
        if (!!scope && !!attrs) {
            var properties = Object.getOwnPropertyNames(this);
            properties.forEach(function(prop) {
                if (attrs.hasOwnProperty(prop)) {
                    if (typeof config[prop] === "boolean") {
                        if (attrs[prop] === "true") {
                            config[prop] = true;
                        } else if (attrs[prop] === "false") {
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

angular.module("ez.paginator").directive("ezPaginatorLimit", [ "$routeParams", "$location", "EzPaginatorConfig", function($routeParams, $location, EzPaginatorConfig) {
    return {
        restrict: "A",
        scope: {
            pagination: "=ezPaginatorLimit",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/limit/limit.html",
        link: function(scope, $el, attrs) {
            scope.config = EzPaginatorConfig.get(scope, attrs);
            var useCallback = typeof scope.onChange === "function";
            if (!scope.pagination.limit || scope.config.limits.indexOf(scope.pagination.limit) === -1) {
                if (!useCallback && !!$routeParams.limit && scope.config.limits.indexOf($routeParams.limit)) {
                    scope.pagination.limit = $routeParams.limit;
                }
            }
            if (scope.pagination.limit) {
                scope.pagination.limit = scope.config.defaultLimit;
            }
            scope.setLimit = function(limit) {
                scope.pagination.limit = limit;
                if (useCallback) {
                    scope.onChange(scope.pagination);
                } else {
                    $routeParams.limit = limit;
                    $location.search($routeParams);
                }
            };
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPager", [ "EzPaginatorConfig", "$location", "$routeParams", function(EzPaginatorConfig, $location, $routeParams) {
    return {
        restrict: "A",
        scope: {
            pagination: "=ezPager",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/pager/pager.html",
        link: function(scope, $el, attrs) {
            var useCallback = typeof scope.onChange === "function";
            var init = function() {
                scope.config = EzPaginatorConfig.get(scope, attrs);
                scope.pagination.items = scope.pagination.items || [];
                if (!scope.pagination.page && !useCallback) {
                    scope.pagination.page = $routeParams.page;
                }
                if (!scope.pagination.page) {
                    scope.pagination.page = scope.config.initialPage;
                }
                if (!scope.pagination.pages) {
                    scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit);
                }
                if (!scope.pagination.itemCount) {
                    scope.pagination.itemCount = scope.pagination.items.length;
                }
            };
            scope.pageChanged = function() {
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

angular.module("ez.paginator").directive("ezPaginator", [ "$location", "$routeParams", "EzPaginatorConfig", function($location, $routeParams, EzPaginatorConfig) {
    return {
        restrict: "A",
        scope: {
            pagination: "=ezPaginator",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/paginator/paginator.html",
        link: function(scope, $el, attrs) {
            var useCallback = typeof scope.onChange === "function";
            var init = function() {
                scope.config = EzPaginatorConfig.get(scope, attrs);
                scope.pagination.maxPages = scope.pagination.maxPages || scope.config.maxPages;
                scope.pagination.items = scope.pagination.items || [];
                if (!scope.pagination.page && !useCallback) {
                    scope.pagination.page = $routeParams.page;
                }
                if (!scope.pagination.page) {
                    scope.pagination.page = scope.config.initialPage;
                }
                if (!scope.pagination.pages) {
                    scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit);
                }
                if (!scope.pagination.itemCount) {
                    scope.pagination.itemCount = scope.pagination.items.length;
                }
            };
            scope.pageChanged = function(page) {
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

angular.module("ez.paginator").directive("ezPaginatorState", [ "$routeParams", "$location", "EzPaginatorConfig", function($routeParams, $location, EzPaginatorConfig) {
    return {
        restrict: "A",
        scope: {
            pagination: "=ezPaginatorState",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/state/state.html",
        link: function(scope, $el, attrs) {
            scope.config = EzPaginatorConfig.get(scope, attrs);
            var useCallback = typeof scope.onChange === "function";
            if (!scope.pagination.state) {
                if (!useCallback) {
                    scope.pagination.state = $routeParams.state;
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