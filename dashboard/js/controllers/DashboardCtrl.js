var app = angular.module('parabolControllers',[]);

app.controller('DashboardCtrl', ['$scope','ScriptService','DashboardSocket', '$mdDialog', function($scope, ScriptService, DashboardSocket,$mdDialog) {

  function init(){
    $scope.selectedSockets = [];
    $scope.selectedScripts = [];
    $scope.clients = [];
    $scope.loadScripts();
    DashboardSocket.emit("getConnections", function(){
      console.log("emitted");
    });
  }

  $scope.runScript = function(){
      if ($scope.selectedScripts.length == 1){
        ScriptService.executeScript($scope.selectedSockets, $scope.selectedScripts[0]);
      } else {
        alert("Please execute only 1 script at the same time");
      }
  }

  $scope.saveScript = function(name, scriptCode){
      ScriptService.saveScript(name, scriptCode, function(){
        $scope.loadScripts();
      });
  }
  $scope.loadScripts = function(){
      ScriptService.loadScripts(function(scripts){
        $scope.scripts = scripts;
      })
  }
  $scope.deleteScript = function(scriptId){
      ScriptService.deleteScript(scriptId, function(){
        $scope.loadScripts();
      })
  }
  $scope.editScript = function(script){
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/edittmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    })
    .then(function(answer) {
      console.log(answer);
    }, function() {
    });
  }


  init();

  DashboardSocket.on('dashConnectionEvent', function (data) {
    $scope.clients.push(data);
  });

  DashboardSocket.on('dashDisconnectionEvent', function (data) {
    var index = $scope.clients.indexOf(data);
    $scope.clients.splice(index,1);
  });

  //DEBUG
  DashboardSocket.on('sendConnections', function (data) {
  $scope.clients = data.clients;
  });

  $scope.query = {
     filter: '',
     order: 'name',
     limit: 5,
     page: 1
   };

}]);

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.save = function(script) {
    $mdDialog.hide(script);
  };
}
