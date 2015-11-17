angular.module('ez.paginator').directive('ezPaginator', [
  '$location',
  '$routeParams',
  'EzPaginatorConfig',
  'EzConfigResolver',
  function(
    $location,
    $routeParams,
    EzPaginatorConfig,
    EzConfigResolver
  ) {
    return {
      restrict: 'EA',
      scope: {
        pagination: '=',
        ezConfig: '=?',
        onChange: '=?'
      },
      templateUrl: 'ez_paginator/paginator/paginator.html',
      link: function(scope, $el, attrs) {
        var useCallback = typeof scope.onChange === 'function';

        scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);

        scope.$watch('pagination.pages', function(n, o) {
          if (n !== o) {
            draw();
          }
        });

        scope.pagination.update = function() {
          scope.selectPage(scope.pagination.page);
        };

        function draw() {
          scope.pages = [];

          if (!scope.pagination.items) {
            scope.pagination.items = [];
          }

          if (!scope.pagination.limit) {
            scope.pagination.limit = scope.config.defaultLimit;
          }

          if (!scope.pagination.itemCount) {
            scope.pagination.itemCount = scope.pagination.items.length;
          }

          if (!scope.pagination.pages) {
            scope.pagination.pages = Math.ceil(scope.pagination.items.length / scope.pagination.limit) || 1;
          }

          var _pageNumber = scope.pagination.page;

          // center number on load if page number is not 1
          if (_pageNumber !== 1) {
            var offset = Math.floor(scope.config.maxPages / 2);
  
            if ((_pageNumber + offset) > scope.pagination.pages) {
              _pageNumber = scope.pagination.pages - scope.config.maxPages + 1;
            } else {
              _pageNumber = _pageNumber - offset;
            }
  
            if (_pageNumber < 1) {
              _pageNumber = 1;
            }
          }

          for (var i = 1, l = scope.pagination.pages; _pageNumber <= l && i <= scope.config.maxPages; i++) {
            scope.pages.push({
              text: _pageNumber,
              number: _pageNumber
            });

            _pageNumber++;
          }
        }

        scope.selectPage = function(pageNumber, init) {
          if (!pageNumber) {
            if (!useCallback) {
              pageNumber = $location.search().page || scope.config.initialPage;
            } else {
              pageNumber = scope.config.initialPage;
            }
          }

          pageNumber = parseInt(pageNumber, 10);

          // ensure page is valid
          if (pageNumber < 1) {
            pageNumber = 1;
          } else if (pageNumber > scope.pagination.pages) {
            pageNumber = scope.pagination.pages;
          }

          scope.pagination.page = pageNumber;


          if (!init) {
            if (useCallback) {
              scope.onChange(scope.pagination);
            } else {
              $routeParams.page = scope.pagination.page;

              $location.search($routeParams);
            }

            if (!scope.pages.length || scope.pages[0].number > scope.pagination.page || !scope.pages[scope.config.maxPages - 1] || scope.pages[scope.config.maxPages - 1].number < scope.pagination.page) {
              draw();
            }
          }
        };

        scope.selectPage(null, true);
        draw();
      }
    };
  }
]);
