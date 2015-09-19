'use strict';
var got = require('got');
var decamelize = require('decamelize');
var deepAssign = require('deep-assign');
var PinkiePromise = require('pinkie-promise');

module.exports = function (method, opts) {
	if (typeof method !== 'string') {
		return PinkiePromise.reject(new TypeError('Method should be a string'));
	}

	opts = deepAssign({
		json: true,
		headers: {
			'user-agent': 'htts://github.com/dsblv/vk-got'
		},
		body: {}
	}, opts);

	var token = process.env.VK_API_TOKEN || opts.token;
	var body = opts.body;

	if (token) {
		body.accessToken = token;
	}

	Object.keys(body).forEach(function (key) {
		var dcKey = decamelize(key, '_');

		body[dcKey] = body[key];

		if (dcKey !== key) {
			delete body[key];
		}
	});

	return got.post('https://api.vk.com/method/' + method, opts).then(function (data) {
		if (data.body && typeof data.body.error !== 'undefined') {
			return PinkiePromise.reject(data.body.error);
		}

		return data;
	});
};
