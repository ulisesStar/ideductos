

app.directive('clPaging', ClPagingDirective);

ClPagingDirective.$inject = [];
function ClPagingDirective() {
    return {
        restrict: "EA",
        scope: {
            clPages: "=",
            clAlign: "@",
            clAlignModel: "=",
            clPageChanged: "&",
            clSteps: "=",
            clCurrentPage: "="
        },
        controller: ClPagingController,
        controllerAs: "vm",
        templateUrl: '/partials/paginacion'
    }
}

function ClPagingController($scope) {
    var vm = this;
    vm.first = "navigate_before",
    vm.last = "navigate_next",
    vm.index = 0,
    vm.clSteps = $scope.clSteps,
    vm["goto"] = function(index) {
        $scope.clCurrentPage = vm.page[index]
    },
    vm.gotoPrev = function() {
        $scope.clCurrentPage = vm.index,
        vm.index -= vm.clSteps
    },
    vm.gotoNext = function() {
        vm.index += vm.clSteps,
        $scope.clCurrentPage = vm.index + 1
    },
    vm.gotoFirst = function() {
        vm.index = 0,
        $scope.clCurrentPage = 1
    },
    vm.gotoLast = function() {
        vm.index = parseInt($scope.clPages / vm.clSteps) * vm.clSteps,
        vm.index === $scope.clPages
            ? vm.index = vm.index - vm.clSteps
            : "",
        $scope.clCurrentPage = $scope.clPages
    },
    $scope.$watch("clCurrentPage", function(value) {
        vm.index = parseInt((value - 1) / vm.clSteps) * vm.clSteps,
        $scope.clPageChanged()
    }),
    $scope.$watch("clPages", function() {
        vm.init()
    }),

    vm.init = function() {
        vm.stepInfo = function() {
            for (var result = [], i = 0; i < vm.clSteps; i++)
                result.push(i);
            return result
        }(),
        vm.page = function() {
            for (var result = [], i = 1; i <= $scope.clPages; i++)
                result.push(i);
            return result
        }()
    }
}

app.component('imagenes', {
    bindings: {
        id: '=',
    },
    controllerAs: 'ctrl',
    templateUrl: '/partials/imagenes',
    controller: function($rootScope, $scope, $mdDialog, $mdPanel, Imagenes) {


        console.log(this.id)
        Imagenes.obtenerDeSubServicio(this.id)
        .then(res => $scope.imagen = res.data)
        .then(() => $scope.$digest())

    }



})
