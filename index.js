'use strict';
var got = require('got');
var decamelize = require('decamelize');
var deepAssign = require('deep-assign');
var Promise = require('pinkie-promise');
var createErrorClass = require('create-error-class');
var urlLib = require('url');

var vkGot = module.exports = function (method, opts) {
	if (typeof method !== 'string') {
		return Promise.reject(new TypeError('Method should be a string'));
	}

	opts = deepAssign({
		json: true,
		headers: {
			'user-agent': 'htts://github.com/dsblv/vk-got'
		},
		endpoint: 'https://api.vk.com/method/',
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

	return got.post(opts.endpoint + method, opts).then(function (res) {
		if (res.body && typeof res.body.error !== 'undefined') {
			return Promise.reject(new vkGot.VKError(res.body.error, opts));
		}

		return res;
	});
};

vkGot.token = function (opts) {
	return vkGot('access_token', deepAssign({
		endpoint: 'https://oauth.vk.com/'
	}, opts));
};

vkGot.VKError = createErrorClass('VKError', function (err, opts) {
	var url = urlLib.parse(opts.endpoint);

	deepAssign(this, {
		message: err.error_msg,
		code: err.error_code,
		requestBody: opts.body,
		host: url.host,
		hostname: url.hostname,
		method: 'POST',
		path: url.path
	});
});
