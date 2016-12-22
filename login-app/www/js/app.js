angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: 'js/controllers/outside.template.html'
  })
  .state('outside.login', {
    url: '/login',
    templateUrl: 'js/controllers/login/login.template.html',
    controller: 'LoginCtrl'
  })
  .state('outside.register', {
    url: '/register',
    templateUrl: 'js/controllers/register/register.template.html',
    controller: 'RegisterCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'js/controllers/dashboard/dashboard.template.html',
    controller: 'dashboardCtrl'
  });

  $urlRouterProvider.otherwise('/outside/login');
})
//On the device running (or browser)
.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login' && next.name !== 'outside.register') {
        event.preventDefault();
        $state.go('outside.login');
      }
    }
  });
});
