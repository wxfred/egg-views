'use strict';

const path = require('path');

module.exports = appInfo => {
  return {
    keys: '12345678',
    view: {
      defaultViewEngine: 'views',
      mapping: {
        '.vash': 'views',
        '.html': 'views',
      },
    },
    views: {
      engine: 'vash',
      options: {
        root: path.join(appInfo.baseDir, ''),
      },
    },
  };
};
