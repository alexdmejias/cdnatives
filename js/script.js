var cdnApp = angular.module('cdnApp', []);

cdnApp.controller('cdnController', function($scope, $http) {
    $scope.optionTags = false;
    $scope.optionProd = false;

    $http.get('data/cdn_data.json').success(function(data) {
        $scope.libs = data;
        $scope.currentCdn = $scope.libs[0]['cdns'][0];
        $scope.toCopy = $scope.currentCdn.urls[0];
    });


    $scope.sendToInput = function(cdn) {
        $scope.currentCdn = cdn;

        var url = $scope.currentCdn.urls[0];

        if ($scope.optionProd === true) {
            url = cdn.urls[1]
        }

        if ($scope.optionTags === true) {
            url = '<script src="' + url + '"></script>';
        }

        $scope.toCopy = url;
    }

    $scope.toggleOption = function(option) {
        if($scope[option] == true) {
            $scope[option] = false;
        } else {
            $scope[option] = true;
        }

        $scope.sendToInput($scope.currentCdn);
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