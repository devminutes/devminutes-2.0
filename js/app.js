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
      when('/', {
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
        redirectTo: '/'
      });
}]);

devminutesApp.service('masterLoader', function($http, $q) {
  this.master = null;

  this.load = function() {
    if (this.master) {
      return $q.when(this.master);
    }

    return $http.get('common/episode-grammer.pegjs').then(function(response) {
      this.master = new DMMaster(response.data);
      return this.master;
    }.bind(this))
  }
});

devminutesApp.service('listService', function($http, $q) {
  this.data = null;

  this.load = function() {
    if (this.data) {
      return $q.when(this.data);
    }

    return $http.get('episodes/000-list.dme').then(function(response) {
      this.data = response.data;
      return this.data;
    }.bind(this))
  }
});

devminutesApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = "DevMinutes";
    });
}]);