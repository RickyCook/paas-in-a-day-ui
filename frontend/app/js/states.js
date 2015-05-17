'use strict';

/* States */

var app = angular.module('paas-in-a-day-ui.states', []);

app.config(function ($stateProvider, $urlRouterProvider) {

    // TODO: This is from the old routing and wasn't working their either
    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/404');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',

        resolve: {
            apps: function($stateParams, $state, Pipeline) {
                return Pipeline.apps.get({}).$promise.then(function(apps){
                    return apps;
                }, function(err){
                    $state.go('404');
                });
            }
        }
    });

    $stateProvider.state('app', {
        url: '/apps/:appId',
        templateUrl: 'partials/app.html',
        controller: 'AppCtrl'
    });

    $stateProvider.state('404', {
        url: '/404',
        templateUrl: 'partials/404.html'
    });
});
