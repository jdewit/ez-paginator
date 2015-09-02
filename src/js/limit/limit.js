angular.module('ez.paginator').directive('ezPaginatorLimit', [
  '$routeParams',
  '$location',
  'EzConfigResolver',
  'EzPaginatorConfig',
  function(
    $routeParams,
    $location,
    EzConfigResolver,
    EzPaginatorConfig
  ) {
    return {
      restrict: 'EA',
      scope: {
        pagination: '=',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/limit/limit.html',
      link: function(scope, $el, attrs) {
        scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);

        var useCallback = typeof scope.onChange === 'function';

        if (!scope.pagination.limit || scope.config.limits.indexOf(scope.pagination.limit) === -1)  {
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

            $location.search($routeParams);
          }
        };

      }
    };
  }
]);

