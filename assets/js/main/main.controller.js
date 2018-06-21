app.controller('mainCtrl', function ($scope, $rootScope, $http, $mdDialog, mdDialog, $timeout, $mdSidenav, $state, $stateParams) {

$scope.enviarAhome = () =>{
	$state.go('home')
}

});
