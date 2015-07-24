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

      scope.config = EzPaginatorConfig.get(scope, attrs);

      // set mandatory defaults if none provided
      scope.pagination.maxPages = scope.pagination.maxPages || scope.config.maxPages;
      scope.pagination.limit = scope.pagination.limit || scope.config.limit;
      scope.pagination.items = scope.pagination.items || [];
      scope.pagination.page = scope.pagination.page || scope.config.initialPage;

      var update = function() {
        scope.hasBeenInitialized = true;

        // if the pages property has not been set than we assume all of the items have been provided
        // and we can calculate the number of pages manually
        // for server side pagination, pages should be set already
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
        if (typeof scope.onChange === 'function') {
          scope.onChange(scope.pagination);
        } else {
          angular.extend($routeParams, {
            page: scope.pagination.page,
            state: scope.pagination.state,
            limit: scope.pagination.limit,
          });

          $location.search($routeParams);
        }
      };

      scope.$watch('pagination.items', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          update();
        }
      });

      update();
    }
  };
}]);
