'use strict';

exports.renderWithLocals = function* (ctx) {
  yield ctx.render('locals.ejs', {
    data: 'world',
  });
};

exports.include = function* (ctx) {
  yield ctx.render('include/index.ejs');
};

exports.renderWithHelper = function* (ctx) {
  yield ctx.render('helper.ejs');
};

exports.cache = function* (ctx) {
  yield ctx.render('cache.ejs');
};

exports.htmlext = function* (ctx) {
  yield ctx.render('ejs.html');
};

exports.error = function* (ctx) {
  try {
    yield ctx.render('error.ejs');
  } catch (err) {
    this.body = err.message;
  }
};

exports.renderStringError = function* (ctx) {
  try {
    yield ctx.renderString('<% a');
  } catch (err) {
    ctx.body = err.message;
  }
};
