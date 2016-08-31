app.factory('AuthFactory', function($http, $state){

	var AuthFactory ={};
	var currentUser;

	AuthFactory.setUser = function(user){
		currentUser = user;
		console.log(currentUser);
	};

	AuthFactory.get = function () {
		return currentUser;
	};

	AuthFactory.submitLogin = function(user){
		$http.post('/auth/login', user)
		.then(
			() => {
				console.log("/n/n AUTH PROVIDER", AuthFactory);
				// user = response.body;
				AuthFactory.setUser(user);
				$state.go('stories');
			}
		);
	};

	AuthFactory.submitSignup = function(user){
		console.log(user);
		$http.post('/auth/signup', user)
		.then(
			() => $state.go('stories')
		);
	};

	AuthFactory.logout = function() {
		$http.post('/auth/logout');
	}

	return AuthFactory;

});
