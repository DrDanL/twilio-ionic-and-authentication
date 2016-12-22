angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    username: '',
    password: ''
  };

  //If the user is able to login with valid details, send them to the dashboard
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('dashboard');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})
