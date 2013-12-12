var cdnApp = angular.module('cdnApp', []);

cdnApp.controller('cdnController', function($scope, $http) {
    $http.get('data/cdn_data.json').success(function(data) {
        $scope.libs = data;
    })

    $scope.toCopy = 'no cdn selected';
    $scope.optionTags = false;
    $scope.optionProd = false;

    $scope.sendToInput = function(w) {
        $scope.toCopy = w;
    }

    $scope.toggleOption = function(option) {
        if($scope[option] == true) {
            $scope[option] = false;
        } else {
            $scope[option] = true;
        }
    }

});

cdnApp.directive('selectOnChange', function () {
    return function (scope, element) {
        scope.$watch('toCopy', function(newVal, oldVal) {
            if(oldVal === newVal){
                return
            }
            element[0].select();
        });
    };
});