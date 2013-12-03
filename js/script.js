var cdnApp = angular.module('cdnApp', []);

cdnApp.controller('cdnController', function($scope, $http) {
	$http.get('data/cdn_data.json').success(function(data) {
		$scope.libs = data;
	})
})