
var dmServices = angular.module('dmServices', []);
 
 dmServices.factory('Episodes', ['$http',
  function($http){
    this.config = function() {
      return "test";
    }
  }]);