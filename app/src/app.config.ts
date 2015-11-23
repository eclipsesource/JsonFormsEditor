/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
module app{

  import IUrlRouterProvider = ng.ui.IUrlRouterProvider;
  class AppConfig{

    static $inject = ["$urlRouterProvider"];

    constructor($urlRouterProvider: IUrlRouterProvider){
      $urlRouterProvider.otherwise('/tree');
    }
  }

  angular.module('app').config(AppConfig);

}