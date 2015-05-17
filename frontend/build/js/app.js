'use strict';

$.material.init();
$.material.ripples();
$.material.input();
$.material.checkbox();
$.material.radio();

var app = angular.module('paas-in-a-day-ui', [
    'ngCookies',
    'ngResource',
    'ui.router',
    'paas-in-a-day-ui.partials',
    'paas-in-a-day-ui.states',
    'paas-in-a-day-ui.filters',
    'paas-in-a-day-ui.services',
    'paas-in-a-day-ui.directives',
    'paas-in-a-day-ui.controllers'
]);

app.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

app.config(function ($locationProvider) {
    //$locationProvider.html5Mode(true); // TODO: Reenable html5
});

app.run(function ($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
