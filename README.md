# damon-pages-dh

[![Build Status][travis-image]][travis-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> static web app workflow

## Installation

```shell
$ npm install damon-pages-dh

# or yarn
$ yarn add damon-pages-dh
```

## Usage

<!-- TODO: Introduction of API use -->

```javascript
const damonPages = require('damon-pages-dh')
const result = damonPages('zce')
// result => 'zce@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### damonPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; damon_ding <991064183@qq.com>



[travis-image]: https://img.shields.io/travis/ding-hao/damon-pages-dh/master.svg
[travis-url]: https://travis-ci.org/ding-hao/damon-pages-dh
[downloads-image]: https://img.shields.io/npm/dm/damon-pages-dh.svg
[downloads-url]: https://npmjs.org/package/damon-pages-dh
[version-image]: https://img.shields.io/npm/v/damon-pages-dh.svg
[version-url]: https://npmjs.org/package/damon-pages-dh
[license-image]: https://img.shields.io/github/license/ding-hao/damon-pages-dh.svg
[license-url]: https://github.com/ding-hao/damon-pages-dh/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/ding-hao/damon-pages-dh.svg
[dependency-url]: https://david-dm.org/ding-hao/damon-pages-dh
[devdependency-image]: https://img.shields.io/david/dev/ding-hao/damon-pages-dh.svg
[devdependency-url]: https://david-dm.org/ding-hao/damon-pages-dh?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
