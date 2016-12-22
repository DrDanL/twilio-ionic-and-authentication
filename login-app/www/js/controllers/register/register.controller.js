angular.module('starter')

.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {

  //Define the scope in memory ready for input
  $scope.user = {
    username: '',
    password: '',
    smsmobile: '',
    sms_id: '',
    code: ''
  };

  //Push the details to the server
  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg.msg
      });
        $scope.user.sms_id = msg.msg;
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };

  //Take the user provided code and push back to our server
  $scope.verify = function() {
    AuthService.verify($scope.user).then(function(msg) {
      //If successful take them back to the login
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'SMS Valid!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Verfication failed!',
        template: errMsg
      });
    });
  };

})
