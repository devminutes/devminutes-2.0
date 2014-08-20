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
      otherwise({
        templateUrl: 'partials/episode-list.html',
        controller: 'EpisodeListCtrl'
      });
}]);