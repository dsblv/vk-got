'use strict';
var test = require('ava');
var vkGot = require('./');

test('making requests', function (a) {
	return vkGot('users.get', {
		body: {
			'userIds': 'sobo13v',
			'v': '5.37'
		}
	}).then(function (res) {
		a.is(res.body.response[0].id, 15658953);
	});
});

test('accepting token', function (a) {
	a.plan(1);

	return vkGot('users.get', {
		token: 'koten'
	}).catch(function (err) {
		a.ok(err);
	});
});
