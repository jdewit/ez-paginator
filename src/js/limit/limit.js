angular.module('ez.paginator').directive('ezPaginatorLimit', [
  '$routeParams',
  'EzPaginatorConfig',
  function(
    $routeParams,
    EzPaginatorConfig
  ) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        pagination: '=ezPaginatorLimit',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/limit/limit.html',
      link: function(scope, $el, attrs) {

        scope.config = EzPaginatorConfig.get(scope, attrs);

        scope.pagination.limit = scope.config.limits[0];

        scope.setLimit = function(limit) {
          scope.pagination.limit = limit;

          if (typeof scope.onChange === 'function') {
            scope.onChange(scope.pagination);
          } else {

          }
        };

      }
    };
  }
]);

