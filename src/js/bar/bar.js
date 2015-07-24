angular.module('ez.paginator').directive('ezPaginatorBar', [
  'EzPaginatorConfig',
  function(
    EzPaginatorConfig
  ) {
  return {
    restrict: 'EA',
    scope: {
      pagination: '=ezPaginatorBar',
      ezConfig: '=?',
      onChange: '=?'
    },
    templateUrl: 'ez_paginator/bar/bar.html',
    link: function(scope, $el, attrs) {
      scope.config = EzPaginatorConfig.get(scope, attrs);
    }
  };
}]);
