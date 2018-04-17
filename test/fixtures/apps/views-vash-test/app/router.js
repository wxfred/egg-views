'use strict';

module.exports = app => {
  app.get('/locals', 'view.renderWithLocals');
  app.get('/include', 'view.include');
  app.get('/helper', 'view.renderWithHelper');
  app.get('/htmlext', 'view.htmlext');
  app.get('/error', 'view.error');
  app.get('/render-string-error', 'view.renderStringError');
  app.get('/use-with', 'view.useWith');
};
