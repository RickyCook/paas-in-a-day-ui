'use strict';

/* Controllers */

var app = angular.module('paas-in-a-day-ui.controllers', []);

app.controller('HomeCtrl', function ($scope, apps) {
    $scope.apps = apps.data;
});

app.controller('AppCtrl', function ($stateParams, $scope, $timeout, Pipeline) {
    $scope.current_deploy = {};

    // TODO: This connects to the real backend service to display builds.
    //var getApp = function(){
    //    Pipeline.app.get({id: $stateParams.appId}, function(app) {
    //        $scope.current_deploy = app.current_deploy;
    //        $scope.deploys = app.deploys;
    //        $timeout(getApp(),1000);
    //    }, function(){
    //        $timeout(getApp(),1000);
    //    });
    //};
    //getApp();

    // TODO: This is the mocked steps to just show progress!
    $scope.deploys = [
        {author: "Ricky Cook", commit: "af90597c92f5ce744652b963b460e5e1c42e95c7", created: "2015-05-15 07:21:04.346113", state: "Error", tag: "v0.0.4"},
        {author: "Ricky Cook", commit: "af90597c92f5ce744652b963b460e5e1c42e95c7", created: "2015-05-15 07:17:10.022077", state: "Error", tag: "v0.0.3"},
        {author: "Ricky Cook", commit: "af90597c92f5ce744652b963b460e5e1c42e95c7", created: "2015-05-15 07:16:03.578320", state: "Error", tag: "v0.0.2"},
        {author: "Ricky Cook", commit: "af90597c92f5ce744652b963b460e5e1c42e95c7", created: "2015-05-15 07:04:19.283115", state: "Error", tag: "v0.0.1"}
    ];

    var current_deploy = $scope.current_deploy;
    current_deploy.status = {};
    $timeout(function(){
        current_deploy.stage = 'local';
    }, 3000);

    $timeout(function(){
        current_deploy.stage = 'repo';
        current_deploy.status['repo'] = 'tick';
    }, 6000);

    $timeout(function(){
        current_deploy.stage = 'dockci';
        current_deploy.status['dockci'] = 'tick';
    }, 9000);

    $timeout(function(){
        current_deploy.stage = 'registry';
        current_deploy.status['registry'] = 'tick';
    }, 12000);

    $timeout(function(){
        current_deploy.stage = 'chronos';
        current_deploy.status['chronos'] = 'tick';
    }, 15000);

    $timeout(function(){
        current_deploy.stage = 'kubernetes';
        current_deploy.status['kubernetes'] = 'tick';
    }, 18000);

    $timeout(function(){
        current_deploy.stage = 'done';
    }, 21000);
});
