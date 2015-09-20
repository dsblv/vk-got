'use strict';
var test = require('ava');
var vkGot = require('./');

test('cheking for method', function (a) {
	return vkGot().catch(function (err) {
		a.ok(err);
	});
});

test.serial('making requests', function (a) {
	return vkGot('users.get', {
		body: {
			userIds: 'sobo13v',
			v: '5.37'
		}
	}).then(function (res) {
		a.is(res.body.response[0].id, 15658953);
	});
});

test.serial('accepting token', function (a) {
	return vkGot('users.get', {
		token: 'no token :('
	}).catch(function (err) {
		a.ok(err);
	});
});

test.serial('requesting token', function (a) {
	return vkGot.token({
		body: {
			code: 'no code :(',
			clientId: 'nope',
			clientSecret: 'nope',
			redirectUri: 'http://localhost/code'
		}
	}).catch(function (err) {
		a.is(err.statusCode, 401);
	});
});
