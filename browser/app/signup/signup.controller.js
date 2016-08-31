app.controller('signupCtrl', function($scope, $http, AuthFactory){

	var user = $scope.user;

	$scope.submitSignup = AuthFactory.submitSignup;

});