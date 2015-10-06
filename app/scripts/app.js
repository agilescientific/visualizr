'use strict';

/**
 * @ngdoc overview
 * @name visualizrApp
 * @description
 * # visualizrApp
 *
 * Main module of the application.
 */
angular
  .module('visualizrApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('#');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({ redirectTo: '/'
    })
  });
