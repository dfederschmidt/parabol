angular.module('parabol', ['ngRoute','md.data.table','ngMaterial', 'parabolControllers', 'parabolServices', 'btford.socket-io'])

.config(function($routeProvider, $mdThemingProvider){
  $routeProvider.when("/",
    {
      templateUrl: "views/dashboard.html",
      controller: "DashboardCtrl",
    }
  );
  $routeProvider.when("/create",
    {
      templateUrl: "views/create.html",
      controller: "CreateCtrl",
    }
  );
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('amber');
})
.factory('DashboardSocket', function (socketFactory) {
  var dashboardSocket = io.connect('https://' + location.host + "/");
  dashboardSocket = socketFactory({
    ioSocket: dashboardSocket
  });
  return dashboardSocket;
});
