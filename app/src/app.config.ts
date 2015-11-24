/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
module app{

  class AppConfig{

    static $inject = ['$stateProvider', '$urlRouterProvider'];

    constructor($stateProvider : ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider){
      $stateProvider.state('edit', {
        url: '/edit',
        views: {
          'treeContainer': {
            controller: 'MyTreeController',
            controllerAs: 'tree',
            templateUrl: 'app/src/components/tree/tree.html'
          },
          'toolboxContainer': {
            controller: 'ToolboxController',
            controllerAs: 'toolbox',
            templateUrl: 'app/src/components/toolbox/toolbox.html'
          },
          'detailContainer': {
            controller: 'DetailController',
            controllerAs: 'detail',
            templateUrl: 'app/src/components/detail/detail.html'
          }
        }
      });
      $urlRouterProvider.otherwise('/edit');
    }
  }

  angular.module('app').config(AppConfig);

}