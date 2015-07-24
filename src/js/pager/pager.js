angular.module('ez.paginator').directive('ezPager', ['$location', '$routeParams', function($location, $routeParams) {
  return {
    restrict: 'EA',
    scope: {
      pager: '='
    },
    templateUrl: 'common/mdPager/md_pager.html',
    link: function(scope) {
      scope.pageChanged = function() {
        var params = $routeParams;

        params.page = !params.limit || (scope.pager.limit === parseInt(params.limit, 10)) ? scope.pager.currentPage : 1;
        params.limit = scope.pager.limit;

        $location.search(params);
      };
    }
  };
}]);
