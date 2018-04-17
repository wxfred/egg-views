'use strict';

exports.keys = '123456';
exports.view = {
  defaultViewEngine: 'views',
  mapping: {
    '.ejs': 'views',
    '.html': 'views',
  },
};

exports.views = {
  engine: 'ejs',
  options: {
    cache: true,
    debug: false,
    compileDebug: true,
    delimiter: null,
    strict: false,
  },
};
