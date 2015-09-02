angular.module('ez.paginator').directive('ezPaginatorBar', [
  'EzConfigResolver',
  'EzPaginatorConfig',
  function(
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
    templateUrl: 'ez_paginator/bar/bar.html',
    link: function(scope, $el, attrs) {
      scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);
    }
  };
}]);
