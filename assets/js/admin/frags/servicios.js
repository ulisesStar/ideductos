var app = angular.module('myapp');

app.controller('serviciosCtrl', function($scope, $rootScope, $http, alertas, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, Servicio) {

		var self = this

    class Contenedor {
        constructor(){
            this.paginas = 18,
            this.pagina = 4,
            this.items = []

        }

        obtener(){
            Servicio.obtener().then(res => {
                self.servicios.items = res.data.map(n => new OneServicio_(n))
                $scope.$digest()
            })
        }

        nuevo(){
            $mdDialog.show({
                templateUrl: '/dialogs/nuevoServicio',
                parent: angular.element(document.body),
                bindToController: true,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controller: function($scope, $mdDialog, alertas, $state, Servicio) {
                    $scope.submit = function(servicio) {
                        Servicio.crear(servicio).then(res =>{
                            $mdDialog.hide();
                            $state.go('servicio', {id : res.data.id});
                        })

                        alertas.mostrarToastEstandar("Servicio agregado exitosamente");
                        
                    }
                    $scope.close = function() {
                        $mdDialog.hide(false);
                    }
                }
            })

        }
        
        cambioPagina(){
            console.log('si estoy cambiando de pagina')
        }
    }

    class OneServicio_ {
        constructor(arg){
            this.id = arg.id,
            this.nombre = arg.nombre    
        }

        eliminar(idx){

            $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar este Servicio?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {

                Servicio.eliminar(this.id).then(function(res) {
                    self.servicios.items.splice(idx, 1)
                    alertas.mostrarToastEstandar("Servicio eliminado exitosamente");
                })

            })

        }
    }

    self.servicios = new Contenedor()
    self.servicios.obtener()

});
