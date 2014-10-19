var devminutesApp = angular.module('devminutes', [
  'ngRoute',
  'dmAnimations',
  'dmControllers',
  'angularUtils.directives.dirDisqus'
]);

devminutesApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/episodes', {
        templateUrl: 'partials/episode-list.html',
        controller: 'EpisodeListCtrl'
      }).
      when('/episodes/:episodeId', {
        templateUrl: 'partials/episode-detail.html',
        controller: 'EpisodeDetailCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      }).
      otherwise({
        templateUrl: 'partials/episode-list.html',
        controller: 'EpisodeListCtrl'
      });
}]);

devminutesApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = "DevMinutes";
    });
}]);