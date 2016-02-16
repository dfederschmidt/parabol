var app = angular.module('parabolServices', []);

app.factory("ScriptService", function($http) {
  return {
    executeScript: function(selectedSockets, scriptCode) {
      $http({
        method: 'POST',
        url: '/execution',
        data: {
          script: scriptCode,
          selectedSockets: selectedSockets
        }
      }).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    },
    saveScript: function(scriptName, scriptCode, callback) {
      $http({
        method: 'POST',
        url: '/script',
        data: {
          name: scriptName,
          code: scriptCode
        }
      }).then(function successCallback(response) {
        callback();
      }, function errorCallback(response) {
        console.log(response)
        callback();
      });
    },
    loadScripts: function(callback){
      $http({
        method: 'GET',
        url: '/script',
        data: {
        }
      }).then(function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        console.log(response);
      });
    },
    deleteScript: function(scriptId, callback) {
      $http({
        method: 'DELETE',
        url: '/script/' + scriptId,
        data: {
        }
      }).then(function successCallback(response) {
        callback();
      }, function errorCallback(response) {
        console.log(response)
        callback();
      });
    },
  };
});
