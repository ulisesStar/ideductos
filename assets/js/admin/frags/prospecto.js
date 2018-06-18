var app = angular.module('myapp');

app.controller('prospectoCtrl', function($scope, $rootScope, $http, alertas, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Prospectos) {

	Prospectos.obtener()
	.then(res => $scope.prospectos = res.data)
	.then(() => $scope.$digest())

	$scope.eliminarProspecto = (idx, prospecto) => {

        $mdDialog.show(
            $mdDialog.confirm().title('¿Seguro que quieres eliminar este prospecto?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
        )
        .then(() => {

            Prospectos.eliminar(prospecto.id).then(function(res) {
                $scope.prospectos.splice(idx, 1)
                alertas.mostrarToastEstandar("Prospecto eliminado exitosamente");
            })

        })

	}


});
