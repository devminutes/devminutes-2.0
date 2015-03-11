var devminutesApp = angular.module('devminutes', [
  'ngRoute',
  'dmAnimations',
  'dmControllers',
  'djds4rce.angular-socialshare',
  'angularUtils.directives.dirDisqus'
]);

devminutesApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    // $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(true);   

    $routeProvider.
      when('/episodes', {
        templateUrl: 'partials/episode-list.html',
        controller: 'EpisodeListCtrl'
      }).
      when('/episode/:episodeId', {
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