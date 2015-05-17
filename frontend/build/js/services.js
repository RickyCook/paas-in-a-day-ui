'use strict';

/* Services */

//TODO: Read Security Considerations in http://docs.angularjs.org/api/ng.$http

var app = angular.module('paas-in-a-day-ui.services', ['ngResource']);

// Accessing a service from the Chrome console.
// Space = angular.element(document).injector().get('Space')
// Space.query({siteId: 1},function(res){debugger});

app.factory('Pipeline', function($resource) {
    return {
        app: $resource(
            '/api/apps/:id',
            {id: '@id'}
        ),
        apps: $resource(
            '/api/apps'
        )
    };
});