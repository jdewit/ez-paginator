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
    useGetVars: false,
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
    stateToggleClass: "btn btn-default",
    stateDropdownMenuClass: "pointer pull-right",
    stateContainerClass: "dropdown",
    limits: [ 5, 15, 25, 50 ],
    limitToggleClass: "btn btn-default",
    limitDropdownMenuClass: "pointer pull-right",
    limitContainerClass: "dropdown",
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
                    config[prop] = attrs[prop];
                }
            });
        }
        return config;
    }
});

angular.module("ez.paginator").directive("ezPaginatorLimit", [ "$routeParams", "EzPaginatorConfig", function($routeParams, EzPaginatorConfig) {
    return {
        restrict: "A",
        replace: true,
        scope: {
            pagination: "=ezPaginatorLimit",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/limit/limit.html",
        link: function(scope, $el, attrs) {
            scope.config = EzPaginatorConfig.get(scope, attrs);
            scope.pagination.limit = scope.config.limits[0];
            scope.setLimit = function(limit) {
                scope.pagination.limit = limit;
                if (typeof scope.onChange === "function") {
                    scope.onChange(scope.pagination);
                } else {}
            };
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPager", [ "$location", "$routeParams", function($location, $routeParams) {
    return {
        restrict: "EA",
        scope: {
            pager: "="
        },
        templateUrl: "common/mdPager/md_pager.html",
        link: function(scope) {
            scope.pageChanged = function() {
                var params = $routeParams;
                params.page = !params.limit || scope.pager.limit === parseInt(params.limit, 10) ? scope.pager.currentPage : 1;
                params.limit = scope.pager.limit;
                $location.search(params);
            };
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
            scope.config = EzPaginatorConfig.get(scope, attrs);
            scope.pagination.maxPages = scope.pagination.maxPages || scope.config.maxPages;
            scope.pagination.limit = scope.pagination.limit || scope.config.limit;
            scope.pagination.items = scope.pagination.items || [];
            scope.pagination.page = scope.pagination.page || scope.config.initialPage;
            var update = function() {
                scope.hasBeenInitialized = true;
                if (!scope.pagination.pages) {
                    scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit);
                }
                if (!scope.pagination.pages || scope.pagination.pages === 1) {
                    scope.config.showPaginator = false;
                } else {
                    scope.config.showPaginator = true;
                }
                scope.pagination.itemCount = scope.pagination.items.length;
            };
            scope.pageChanged = function() {
                if (typeof scope.onChange === "function") {
                    scope.onChange(scope.pagination);
                } else {
                    angular.extend($routeParams, {
                        page: scope.pagination.page,
                        state: scope.pagination.state,
                        limit: scope.pagination.limit
                    });
                    $location.search($routeParams);
                }
            };
            scope.$watch("pagination.items", function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    update();
                }
            });
            update();
        }
    };
} ]);

angular.module("ez.paginator").directive("ezPaginatorState", [ "$routeParams", "EzPaginatorConfig", function($routeParams, EzPaginatorConfig) {
    return {
        restrict: "A",
        replace: true,
        scope: {
            pagination: "=ezPaginatorState",
            ezConfig: "=?",
            onChange: "=?"
        },
        templateUrl: "ez_paginator/state/state.html",
        link: function(scope, $el, attrs) {
            scope.config = EzPaginatorConfig.get(scope, attrs);
            scope.pagination.state = scope.config.states[0];
            scope.setState = function(state) {
                scope.pagination.state = state;
                if (typeof scope.onChange === "function") {
                    scope.onChange(scope.pagination);
                }
            };
        }
    };
} ]);