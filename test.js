import test from 'ava';
import fn from './';

test('cheking for method', async t => {
	try {
		await fn();
	} catch (err) {
		t.pass();
	}
});

test.serial('making requests', async t => {
	const res = await fn('users.get', {
		body: {
			userIds: 'hypercrab',
			v: '5.50'
		}
	});

	t.is(res.body.response[0].id, 15658953);
});

test.serial('accepting token', async t => {
	try {
		await fn('users.get', {
			token: 'no token :('
		});
	} catch (err) {
		t.pass();
	}
});

test.serial('requesting token', async t => {
	try {
		await fn.token({
			body: {
				code: 'nope',
				clientId: 'nope',
				clientSecret: 'nope',
				redirectUri: 'nope'
			}
		});
	} catch (err) {
		t.is(err.statusCode, 401);
	}
});
