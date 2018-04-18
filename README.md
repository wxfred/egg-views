# egg-views

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-views.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-views
[travis-image]: https://img.shields.io/travis/wxfred/egg-views.svg?style=flat-square
[travis-url]: https://travis-ci.org/wxfred/egg-views
[codecov-image]: https://img.shields.io/codecov/c/github/wxfred/egg-views.svg?style=flat-square
[codecov-url]: https://codecov.io/github/wxfred/egg-views?branch=master
[david-image]: https://img.shields.io/david/wxfred/egg-views.svg?style=flat-square
[david-url]: https://david-dm.org/wxfred/egg-views
[snyk-image]: https://snyk.io/test/github/wxfred/egg-views/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/wxfred/egg-views?targetFile=package.json
[download-image]: https://img.shields.io/npm/dm/egg-views.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-views

<!--
Description here.
-->
Egg view plugin which is similar to [koa-views](https://github.com/queckezz/koa-views), supports many templating engines.

## Install

`egg-views` is using [consolidate](https://github.com/tj/consolidate.js) under the hood.

__NOTE__: you must still install the engine you wish to use, add it to your package.json dependencies.

```bash
$ npm i egg-views --save

# Add one of the following:
$ npm i ejs --save
$ npm i vash --save
...
```

[List of supported engines](https://github.com/tj/consolidate.js#supported-template-engines)

## Usage

```js
// {app_root}/config/plugin.js
exports.views = {
  enable: true,
  package: 'egg-views',
};

// if you choose ejs and use .ejs for extension
// {app_root}/config/config.default.js
exports.view = {
  defaultViewEngine: 'views',
  mapping: {
    '.ejs': 'views',
  },
};

// if you choose vash and use .vash for extension
// {app_root}/config/config.default.js
exports.view = {
  defaultViewEngine: 'views',
  mapping: {
    '.vash': 'views',
  },
};

// if you choose vash and use both .html and .vash for extension
// {app_root}/config/config.default.js
exports.view = {
  defaultViewEngine: 'views',
  mapping: {
    '.html': 'views',
    '.vash': 'views',
  },
};
```

## Configuration

Write configurations of the engine you choose to the `options`.

__WARNING__: be aware that your code could break if we add an option with the same name as one of your data object's properties. See [Conflict](#conflict).

If you choose to use ejs:

```js
// {app_root}/config/config.default.js
exports.views = {
  engine: 'ejs',
  // ejs config
  options: {
    cache: true,
    debug: false,
    compileDebug: true,
    delimiter: null,
    strict: false,
  },
};
```

Or choose to use vash:

```js
// {app_root}/config/config.default.js
exports.views = {
  engine: 'vash',
  // vash config
  options: {
    useWith: true,
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Render

There are three default render functions in egg, while the last one is not supported in `egg-views`.

- ✔︎ `render(name, locals)` renders template file, and set the value to ctx.body.

- ✔︎ `renderView(name, locals)` renders template file, returns the result and don't set the value to any variable.

- ✘ `renderString(tpl, locals)` not supported.

## Conflict

Unfortunately, due to the using of [egg](https://github.com/eggjs/egg) and [consolidate](https://github.com/tj/consolidate.js), some occupied names can't be used as your data object's properties:

- `ctx`
- `gettext`
- `helper`
- `request`
- `locals`
- `name`
- `root`

You should also avoid using the names in configuration options list of the choosing templating engine. Because, if you use these names as your data object's properties, your data will be used as options to build a template firstly, then as the data to construct the final page. For example, if you choose ejs, you should be cautious to use [`cache` `filename` `scope` `debug` ...](https://github.com/tj/ejs#options).

## Questions & Suggestions

Please open an issue [here](https://github.com/wxfred/egg-views/issues).

## License

[MIT](LICENSE)
