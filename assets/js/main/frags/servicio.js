var app = angular.module('myapp');

app.controller('servicioCtrl', function($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Servicio, Imagenes) {
    
  var self = this
  var id = $stateParams.id;

  Servicio.one(id)
  .then(res => { 
    $scope.servicio = res.data
    //self.background = $scope.servicio.ImagenServicio[0].imagen;
    $scope.$digest();
  })

  Servicio.TodosSubservicios(id)
  .then(res => $scope.subservicios = res.data)
  .then(() => $scope.$digest())


});
