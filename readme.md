# vk-got [![Build Status](https://travis-ci.org/dsblv/vk-got.svg?branch=master)](https://travis-ci.org/dsblv/vk-got)

> Convenience wrapper for [got](https://github.com/sindresorhus/got) to interact with the [VK API](https://vk.com/dev/methods)

Inspired by [gh-got](https://github.com/sindresorhus/gh-got).

## Install

```
$ npm install --save vk-got
```


## Usage

```js
import vkGot from 'vk-got';

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

### vkGot(method, [options]) → `promise`

#### method

*Required*  
Type: `string`

One of many [VK API methods](https://vk.com/dev/methods).

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

Data to send with request. All keys are [decamelized](https://github.com/sindresorhus/decamelize) before being sent, so you can write them in `camelCase`!

### vkGot.token([options]) → `promise`

Shorthand method for [requesting access token](https://vk.com/dev/authentication).


## Errors

`vk-got` extends [got errors](https://github.com/sindresorhus/got#errors) with one VK-specific error type.

### vkGot.VKError

When you're lucky enough to catch one of [VK errors](https://vk.com/dev/errors).


## Credits

`vk-got` is built ontop of [got](https://github.com/sindresorhus/got), a very useful module made by [Sindre Sorhus](https://github.com/sindresorhus) and [Vsevolod Strukchinsky](https://github.com/floatdrop) – two real open-source gangsters. Shout out to them!

## License

MIT © [Dimzel Sobolev](http://vk.com/sobo13v)
