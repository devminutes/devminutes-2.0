var devminutesControllers = angular.module('dmControllers', [ 'ngSanitize' ]);

devminutesControllers.controller('EpisodeListCtrl', 
  function($scope, $http, $sce, masterLoader, listService) {
    $scope.episodes = [];
    masterLoader.load().then(function(master) {
      listService.load().then(function(data) {
        var configuration = master.parseConfiguration(data);
        var newestEpisodeId = configuration[0].id;

        for (index = 0; index < configuration.length; index++) {
          var episodeConfig = configuration[index];
        
          $http.get('episodes/' + episodeConfig.fileName).success(function(data) {
            var episode = master.parseEpisode(data);
            episode.soundcloudPlayer = $sce.trustAsHtml(episode.soundcloudPlayer);

            episode.fileName = configuration.filter(function (ec) {
              return ec.id === episode.id;
            })[0].fileName;

            if (episode.id == newestEpisodeId) {
              $scope.newestEpisode = episode;
            } else {
              $scope.episodes.push(episode);
            }
          });
        }
      });
    });
    $scope.orderProp = '-id';
  }
);

devminutesControllers.controller('EpisodeDetailCtrl',
  function($scope, $routeParams, $http, $sce, $rootScope, masterLoader, listService) {
    $scope.contentLoaded = false;

    var episodeId = $routeParams.episodeId;
    masterLoader.load().then(function(master) {
      listService.load().then(function(data) {
        var episodeConfiguration = master.findEpisodeConfigurationById(data, episodeId);
        $http.get('episodes/' + episodeConfiguration.fileName).success(function(data) {
          var episode = master.parseEpisode(data);
          episode.soundcloudPlayer = $sce.trustAsHtml(episode.soundcloudPlayer);

          $scope.episode = episode;
          $scope.contentLoaded = true;

          $rootScope.title = 'DevMinutes - ' + episode.name;
        });
      });
    });
  }
);

devminutesControllers.controller('AboutCtrl', ['$scope', '$routeParams', '$http',  
    function($scope, $routeParams, $http) {
        $rootScope.title = 'DevMinutes - o podcastu';
    }
]);