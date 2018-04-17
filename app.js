'use strict';

module.exports = app => {
  app.view.use('views', require('./lib/view'));
};
