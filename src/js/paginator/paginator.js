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

        var page = scope.pagination.page;

        scope.config = EzConfigResolver.resolve(scope, attrs, EzPaginatorConfig);

        scope.$watch('pagination.page', function(n, o) {
          if (n !== o && n !== page) {
            scope.selectPage(n, 'init');
          }
        });

        scope.$watch('pagination.pages', function(n, o) {
          if (n !== o) {
            scope.selectPage(scope.config.initialPage, 'init');
          }
        });

        scope.pagination.update = function() {
          scope.selectPage(scope.pagination.page, 'init');
        };

        setInterval(function() {
          scope.$apply();
        }, 2000);



        scope.selectPage = function(pageNumber, type) {
          if (!pageNumber) {
            if (!useCallback) {
              pageNumber = $location.search().page || scope.config.initialPage;
            } else {
              pageNumber = scope.config.initialPage;
            }
          }

          pageNumber = parseInt(pageNumber, 10);

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

          page = pageNumber;

          var _pageNumber = pageNumber;

          if (type === 'next') {
            if (pageNumber > scope.pagination.pages) {
              return;
            } else if (scope.pages[scope.pages.length - 1].number === (pageNumber - 1)) {
              type = 'right';
            }
          } else if (type === 'prev') {
            if (pageNumber < 1) {
              return;
            } else if (scope.pages[0].number === (pageNumber + 1)) {
              pageNumber = pageNumber - scope.config.maxPages + 1;
              type = 'left';
            }
          }

          if (!!type && type !== 'next' && type !== 'prev') {
            if (type === 'left') {
              if (pageNumber < 1) {
                pageNumber = 1;
              }

              _pageNumber = pageNumber;

              pageNumber = pageNumber + scope.config.maxPages - 1;
            } else if (type === 'right') {
              if ((_pageNumber + scope.config.maxPages) > scope.pagination.pages) {
                _pageNumber = scope.pagination.pages - scope.config.maxPages + 1;
              }
            } else if (type === 'last') {
              _pageNumber = scope.pagination.pages - scope.config.maxPages + 1;
            } else if (type === 'init') {
              // center number on load if page number is not 1
              if (pageNumber !== 1) {
                var offset = Math.floor(scope.config.maxPages / 2);

                if ((pageNumber + offset) > scope.pagination.pages) {
                  _pageNumber = scope.pagination.pages - scope.config.maxPages; 
                } else {
                  _pageNumber = pageNumber - offset;
                }


                if (_pageNumber < 1) {
                  _pageNumber = 1;
                }
              }
            }

            scope.pages = [];

            for (var i = 1, l = scope.pagination.pages; _pageNumber <= l && i <= scope.config.maxPages; i++) {
              scope.pages.push({
                text: _pageNumber,
                number: _pageNumber
              });

              _pageNumber++;
            }
          }

          // ensure page is valid
          if (pageNumber < 1) {
            pageNumber = 1;
          } else if (pageNumber > scope.pagination.pages) {
            pageNumber = scope.pagination.pages;
          }

          scope.pagination.page = pageNumber;

          if (type !== 'init') {
            if (useCallback) {
              scope.onChange(scope.pagination);
            } else {
              $routeParams.page = scope.pagination.page;

              $location.search($routeParams);
            }
          }
        };

        scope.selectPage(scope.pagination.page, 'init');
      }
    };
  }
]);
