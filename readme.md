# vk-got [![Build Status](https://travis-ci.org/dsblv/vk-got.svg?branch=master)](https://travis-ci.org/dsblv/vk-got)

> Convenience wrapper for [got](https://github.com/sindresorhus/got) to interact with the [VK API](https://vk.com/dev/methods)

*Inspired by [gh-got](https://github.com/sindresorhus/gh-got)*.


## Install

```
$ npm install --save vk-got
```


## Usage

```js
const vkGot = require('vk-got');

vkGot('users.get', {
	body: {
		'userIds': 'hypercrab'
	}
}).then(res => {
	const user = res.body.response[0];
	console.log(`${user.first_name} ${user.last_name}`);
});
//=> 'Dima Sobolev'
```


## API

### vkGot(method, [options])

#### method

Type: `string`  
*Required*

One of the many [VK API methods](https://vk.com/dev/methods).

#### options

Basically same as [got](https://github.com/sindresorhus/got), except `token`, `endpoint` and `body`.

##### token

Type: `string`

VK [access token](https://vk.com/dev/authentication).

Can be overridden globally with the `VK_ACCESS_TOKEN` environment variable.

##### endpoint

Type: `string`  
Default: `https://api.vk.com/method/`

##### body

Type: `object`

Data to send with request. All keys are [decamelized](https://github.com/dsblv/decamelize-keys) before being sent, so you can write them in `camelCase`.

### vkGot.token([options])

Shorthand method for [requesting access token](https://vk.com/dev/authentication).


## License

MIT © [Dimzel Sobolev](https://github.com/dsblv)
