angular.module('ez.paginator').directive('ezPaginatorState', [
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
        pagination: '=ezPaginatorState',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/state/state.html',
      link: function(scope, $el, attrs) {

        scope.config = EzPaginatorConfig.get(scope, attrs);

        var useCallback = typeof scope.onChange === 'function';

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
  }
]);

