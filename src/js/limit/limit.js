angular.module('ez.paginator').directive('ezPaginatorLimit', [
  '$routeParams',
  '$location',
  'EzPaginatorConfig',
  function(
    $routeParams,
    $location,
    EzPaginatorConfig
  ) {
    return {
      restrict: 'A',
      scope: {
        pagination: '=ezPaginatorLimit',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/limit/limit.html',
      link: function(scope, $el, attrs) {

        scope.config = EzPaginatorConfig.get(scope, attrs);

        var useCallback = typeof scope.onChange === 'function';

        if (!scope.pagination.limit || scope.config.limits.indexOf(scope.pagination.limit) === -1)  {
          if (!useCallback && !!$routeParams.limit && scope.config.limits.indexOf($routeParams.limit)) {
            scope.pagination.limit = $routeParams.limit;
          }
        }

        if (scope.pagination.limit) {
          scope.pagination.limit = scope.config.defaultLimit;
        }

        scope.setLimit = function(limit) {
          scope.pagination.limit = limit;
          scope.pagination.page = 1;

          if (useCallback) {
            scope.onChange(scope.pagination);
          } else {
            $routeParams.limit = limit;

            $location.search($routeParams);
          }
        };

      }
    };
  }
]);

