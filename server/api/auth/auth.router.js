'use strict';

var router = require('express').Router();
let User = require('../users/user.model');


router.post('/login', function (request, response, next) {
	// console.log("Hello again Ashley");
	// console.log(request.body
	User.findOne({
		where: request.body
	})
	.then(function(user) {
		if (!user) {
			response.sendStatus(401);
		} else {
			request.session.userId = user.id;
			reponse.body = user;
			response.sendStatus(204);
		}
	})
	.catch(next);
});

router.post('/signup', function (request, response, next) {
	// console.log("Hello again Ashley");
	// console.log(request.body)
	User.findOrCreate ({
		where: request.body
	})
	.then(function(user) {
		if (!user) {
			response.sendStatus(401);
		} else {
			request.session.userId = user.id;
			response.sendStatus(204);
		}
	})
	.catch(next);
});

router.post('/logout', function (request, response, next) {
	console.log('kill me now:', request.session);
	request.session.destroy();
	console.log('destroy', request.session);

});

module.exports = router;