
app.controller('loginCtrl', function($scope, $http, AuthFactory){

	var user = $scope.user;
	$scope.submitLogin = AuthFactory.submitLogin;

});