var cdnApp = angular.module('cdnApp', []);

cdnApp.controller('cdnController', function($scope, $http) {
    $http.get('data/cdn_data.json').success(function(data) {
        $scope.libs = data;
    })

    $scope.toCopy = 'no cdn selected';

    $scope.sendToInput = function(w) {
        $scope.toCopy = w;
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