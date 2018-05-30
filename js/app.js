﻿/**
 *
 * Responsive website using AngularJS
 * http://www.script-tutorials.com/responsive-website-using-angularjs/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Script Tutorials
 * http://www.script-tutorials.com/
 */

'use strict';

// angular.js main app initialization
var app = angular.module('iris-polymers', []).
    config(function ($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', { templateUrl: 'pages/index.html', activetab: 'projects', controller: HomeCtrl }).
        when('/about-us/:aboutId', {
          templateUrl: function (params) { return params.about; },
          controller: AboutCtrl,
          activetab: 'about-us'
        }).
        when('/home', {
          templateUrl: 'pages/index.html',
          controller: HomeCtrl,
        }).
        when('/contact-us', {
          templateUrl: 'pages/contact-us.html',
          controller: ContactCtrl,
          activetab: 'contact-us'
        }).
        when('/about-us', {
          templateUrl: 'pages/about-us.html',
          controller: AboutCtrl,
          activetab: 'about-us'
        }).
        otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    }).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
          $scope.part = $route.current.activetab;
        });

        // onclick event handlers
        $scope.showForm = function () {
          $('.contactRow').slideToggle();
        };
        $scope.closeForm = function () {
          $('.contactRow').slideUp();
        };

        // save the 'Contact Us' form
        $scope.save = function () {
          $scope.loaded = true;
          $scope.process = true;
          $http.post('sendemail.php', $scope.message).success(function () {
              $scope.success = true;
              $scope.process = false;
          });
        };
  }]);

app.config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);

