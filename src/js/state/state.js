angular.module('ez.paginator').directive('ezPaginatorState', [
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
        pagination: '=ezPaginatorState',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/state/state.html',
      link: function(scope, $el, attrs) {

        scope.config = EzPaginatorConfig.get(scope, attrs);

        scope.pagination.state = scope.config.states[0];

        scope.setState = function(state) {
          scope.pagination.state = state;

          if (typeof scope.onChange === 'function') {
            scope.onChange(scope.pagination);
          }
        };

      }
    };
  }
]);

