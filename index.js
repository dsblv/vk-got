'use strict';
const got = require('got');
const decamelizeKeys = require('decamelize-keys');
const urlParse = require('url').parse;

class VKError extends Error {
	constructor(err, opts) {
		super(err.error_msg);

		const url = urlParse(opts.endpoint);

		Object.assign(this, {
			name: this.constructor.name,
			message: err.error_msg,
			code: err.error_code,
			requestBody: opts.body,
			host: url.host,
			hostname: url.hostname,
			path: url.path,
			method: 'POST'
		});
	}
}

function VKReq(method, opts) {
	if (typeof method !== 'string') {
		throw new TypeError('Method should be a string');
	}

	opts = Object.assign({
		headers: {
			'user-agent': 'htts://github.com/dsblv/vk-got'
		},
		endpoint: 'https://api.vk.com/method/'
	}, opts, {
		json: true
	});

	const token = process.env.VK_API_TOKEN || opts.token;
	const body = opts.body || {};

	if (token) {
		body.accessToken = token;
	}

	opts.body = decamelizeKeys(body);

	return got.post(`${opts.endpoint}${method}`, opts).then(res => {
		if (res.body && res.body.error) {
			throw new VKError(res.body.error, opts);
		}

		return res;
	});
}

function vkGot() {
	try {
		return VKReq.apply(null, arguments);
	} catch (err) {
		return Promise.reject(err);
	}
}

vkGot.token = function (opts) {
	return vkGot('access_token', Object.assign({
		endpoint: 'https://oauth.vk.com/'
	}, opts));
};

module.exports = vkGot;
