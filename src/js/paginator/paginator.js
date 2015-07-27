angular.module('ez.paginator').directive('ezPaginator', [
  '$location',
  '$routeParams',
  'EzPaginatorConfig',
  function(
    $location,
    $routeParams,
    EzPaginatorConfig
  ) {
    return {
      restrict: 'A',
      scope: {
        pagination: '=ezPaginator',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/paginator/paginator.html',
      link: function(scope, $el, attrs) {
        var useCallback = typeof scope.onChange === 'function';

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

          // if the pages property has not been set than we assume all of the items have been provided
          // and we can calculate the number of pages manually
          // for server side pagination, "pages" & "itemCount" should be set already
           
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
  }
]);
