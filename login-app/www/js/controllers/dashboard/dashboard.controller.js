angular.module('starter')

.controller('dashboardCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {

  //Call the API and gab the users details
  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/users').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };

  //Logout and end the session
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})
