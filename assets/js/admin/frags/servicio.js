var app = angular.module('myapp');

app.controller('servicioCtrl', function($scope, $rootScope, $http, alertas, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, SubServicio, Servicio, SubServicio, Imagenes) {

	var id = $stateParams.id;
	var self = this
    var control = 0;
    var control2 = 0;
    $scope.muestrate = false;
    $scope.infomuestra = false;
	$scope.aparece = false;

	Servicio.one(id)
	.then(res => $scope.servicio = res.data)
	.then(() => $scope.$digest())

    Imagenes.obtenerDeServicio(id)
    .then(res => $scope.imagenes = res.data)
    .then(() => $scope.$digest())

	$scope.editarServicio = (servicio) =>{

		obj = {
			id: servicio.id,
			nombre: servicio.nombre,
			descripcion: servicio.descripcion
		}

		Servicio.editar(obj)
		.then(res => alertas.mostrarToastEstandar("Guardado exitosamente!!!"))
		.then(() => $scope.$digest())

        $scope.infomuestra = false

	}

    $scope.habilitarEdicion = () => {

        if(control2 === 0){
            control2 = 1;
            $scope.infomuestra = true
        }
        else{
            control2 = 0;
            $scope.infomuestra = false
 
        }
    }

    class Contenedor {
        constructor(){
            this.paginas = 18,
            this.pagina = 4,
            this.items = []
            this.obj = {}

        }

        obtener(){
            Servicio.TodosSubservicios(id).then(res => {
                self.subservicio.items = res.data.map(n => new OneSubServicio_(n))
                $scope.$digest()
            })
        }

        submit(subservicio){

        	console.log(subservicio)
        	if(subservicio.id === undefined){

        		self.subservicio.obj.nombre = subservicio.nombre,
				self.subservicio.obj.descripcion = subservicio.descripcion,
				self.subservicio.obj.idServicio = id
				
				SubServicio.crear(self.subservicio.obj)
				.then(res => self.subservicio.items.push(new OneSubServicio_(res.data)))
				.then(res => alertas.mostrarToastEstandar("SubServicio agregado exitosamente"))
				.then(res => $scope.aparece = false)
				.then(() => $scope.$digest())

        	}else{

        		SubServicio.editar(subservicio)
				.then(res => alertas.mostrarToastEstandar("SubServicio editado exitosamente"))
				.then(res => $scope.aparece = false)
				.then(() => $scope.$digest())
				.then(() => delete $scope.subservicio)

        	}
        }
        
        cambioPagina(){
           
        }
    }

    class OneSubServicio_ {
        constructor(arg){
            this.id = arg.id,
            this.nombre = arg.nombre,
            this.descripcion = arg.descripcion    
        }

        editar(subservicio){

    		$scope.aparece = true
    		$scope.subservicio = subservicio
            control = 1
    	}

        eliminar(idx){

            $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar este Sub-Servicio?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {

                SubServicio.eliminar(this.id).then(function(res) {
                    self.subservicio.items.splice(idx, 1)
                    alertas.mostrarToastEstandar("Sub-Servicio eliminado exitosamente");
                })

            })
        }

        muestraImagen(Subservicio){
            $scope.idSubservicio = Subservicio.id

            Imagenes.obtenerDeSubServicio($scope.idSubservicio)
            .then(res => $scope.subimagenes = res.data)
            .then(() => $scope.$digest())

            $scope.muestrate = true
        }

    }

    self.subservicio = new Contenedor()
    self.subservicio.obtener()


    $scope.guardarImagen = (imagen) => {
        var imagen2 = 'data:image/png;base64,' + imagen.base64;
        imagenServicios = {
            imagen: imagen2,
            idServicio: id
        }

        Imagenes.crear(imagenServicios)
        .then(res => $scope.imagenes.push(res.data))
        .then(() => $scope.$digest())

        resetDropify()
    }

    $scope.eliminarImagen = function(id, $index) {

        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar esta Imagen?').textContent('Para eliminar de forma permanente selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Imagenes.eliminar(id).then(function(res) {
                $scope.imagenes.splice($index, 1)
                alertas.mostrarToastEstandar("Imagen eliminada exitosamente");
            })

        }, function() {});
    } 

    function resetDropify() {
        $scope.inputImage = null; 
        $(".dropify-clear").trigger("click");
    }

    $scope.cerrarImagenesSub = () =>{
        $scope.muestrate = false;
        resetDropify()
    }

    $scope.guardarImagenSubservicio = (imagen) => {

        imagenSubServicios = {
            imagen: imagen,
            idSubServicio: $scope.idSubservicio
        }
        Imagenes.crear(imagenSubServicios)
        .then(res => $scope.subimagenes.push(res.data))
        .then(() => $scope.$digest())

        resetDropify()

    }

    $scope.apareceSubServicio = () => {
        if(control === 0){
            control = 1;
            $scope.aparece = true;

        }
        else{
            control = 0;
            $scope.aparece = false;
            delete $scope.subservicio
        }
        
    }

});
