import test from'ava';
import vkGot from'./';

test('cheking for method', a => {
	return vkGot().catch(err => {
		a.ok(err);
	});
});

test.serial('making requests', a => {
	return vkGot('users.get', {
		body: {
			userIds: 'sobo13v',
			v: '5.37'
		}
	}).then(res => {
		a.is(res.body.response[0].id, 15658953);
	});
});

test.serial('accepting token', a => {
	return vkGot('users.get', {
		token: 'no token :('
	}).catch(err => {
		a.ok(err);
	});
});

test.serial('requesting token', a => {
	return vkGot.token({
		body: {
			code: 'no code :(',
			clientId: 'nope',
			clientSecret: 'nope',
			redirectUri: 'http://localhost/code'
		}
	}).catch(err => {
		a.is(err.statusCode, 401);
	});
});
