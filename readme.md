# vk-got [![Build Status](https://travis-ci.org/dsblv/vk-got.svg?branch=master)](https://travis-ci.org/dsblv/vk-got)

> Convenience wrapper for [got](https://github.com/sindresorhus/got) to interact with the [VK API](https://vk.com/dev/methods)

Inspired by [gh-got](https://github.com/sindresorhus/gh-got).

## Install

```
$ npm install --save vk-got
```


## Usage

```js
const vkGot = require('vk-got');

vkGot('users.get', {
	body: {
		'userIds': 'sobo13v',
		'v': '5.37'
	}
}).then(res => {
	const dima = res.body.response[0];
	console.log(dima['first_name'] + ' ' + dima['last_name']);
});
```


## API

### `vkGot(method, [options])` → `promise`

#### method

*Required*  
Type: `string`

One of many [VK API methods](https://vk.com/dev/methods).

#### options

Basically same as [got](https://github.com/sindresorhus/got), except `token` and `body`.

##### token

Type: `string`

VK [access token](https://vk.com/dev/authentication).

Can be overridden globally with the `VK_ACCESS_TOKEN` environment variable.

##### body

Type: `object`

Data to send with request. All keys are [decamelized](https://github.com/sindresorhus/decamelize) before being sent, so you can write them in `camelCase`!


## Credits

`vk-got` is *literally* built using made by @sindresorhus modules only, so shout out to the guy!


## License

MIT © [Dimzel Sobolev](http://vk.com/sobo13v)
