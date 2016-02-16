var app = angular.module('parabolControllers');

app.controller('CreateCtrl', ['$scope','ScriptService','$mdToast', function($scope, ScriptService, $mdToast) {

  $scope.saveScript = function(name, scriptCode){
      ScriptService.saveScript(name, scriptCode, function(){
        $scope.showConfirmation();
      });
  }

  $scope.showConfirmation = function() {
   $mdToast.show(
     $mdToast.simple()
       .content('Script saved')
       .position('right top')
       .hideDelay(3000)
   );
 };

}]);
