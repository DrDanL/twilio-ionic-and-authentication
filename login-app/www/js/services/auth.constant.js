angular.module('starter')

.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
})

//Define the API request/end point
.constant('API_ENDPOINT', {
    url: 'http://127.0.0.1:8100/app_api'
        //  For a simulator use: url: 'http://127.0.0.1:8080/api'
});
