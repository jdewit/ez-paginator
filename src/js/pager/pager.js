angular.module('ez.paginator').directive('ezPager', [
  'EzConfigResolver',
  'EzPaginatorConfig',
  '$location',
  '$routeParams',
  function(
    EzConfigResolver,
    EzPaginatorConfig,
    $location,
    $routeParams
  ) {
    return {
      restrict: 'EA',
      scope: {
        pagination: '=',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/pager/pager.html',
      link: function(scope, $el, attrs) {
        var useCallback = typeof scope.onChange === 'function';

        var init = function() {
          scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);

          scope.pagination.items = scope.pagination.items || [];

          if (!scope.pagination.page && !useCallback) {
            scope.pagination.page = $location.search().page;
          }

          if (!scope.pagination.page) {
            scope.pagination.page = scope.config.initialPage;
          }

          if (!scope.pagination.limit) {
            scope.pagination.limit = scope.config.defaultLimit;
          }

          if (!scope.pagination.pages) {
            scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit) || 1;
          }

          if (!scope.pagination.itemCount) {
            scope.pagination.itemCount = scope.pagination.items.length;
          }
        };

        scope.selectPage = function(pageNumber) {
          if (pageNumber < 1) {
            pageNumber = 1;
          } else if (pageNumber > scope.pagination.pages) {
            pageNumber = scope.pagination.pages;
          }

          scope.pagination.page = pageNumber;


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
