var cdnApp = angular.module('cdnApp', []);

cdnApp.controller('cdnController', function($scope, $http) {
	$http.get('data/cdn_data.json').success(function(data) {
		$scope.libs = data;
	})

	$scope.toCopy = 'inital value';

	$scope.sendToInput = function(w) {
		$scope.toCopy = w;
		console.log($scope);
	}
})