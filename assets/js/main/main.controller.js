app.controller('mainCtrl', function ($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams, $anchorScroll, $location) {

$scope.enviarAhome = () =>{
	$state.go('home')
}

	$scope.goTo = () => {

		$location.hash('#contacto')
		$anchorScroll()

	}


});
