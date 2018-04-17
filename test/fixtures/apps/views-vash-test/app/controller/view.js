'use strict';

exports.renderWithLocals = function* (ctx) {
  yield ctx.render('locals.vash', {
    data: 'world',
  });
};

exports.include = function* (ctx) {
  yield ctx.render('include/index.vash');
};

exports.renderWithHelper = function* (ctx) {
  yield ctx.render('helper.vash');
};

exports.htmlext = function* (ctx) {
  yield ctx.render('vash.html');
};

exports.error = function* (ctx) {
  try {
    yield ctx.render('error.vash');
  } catch (err) {
    this.body = err.message;
  }
};

exports.renderStringError = function* (ctx) {
  try {
    yield ctx.renderString('hello world');
  } catch (err) {
    ctx.body = err.message;
  }
};

exports.useWith = function* (ctx) {
  yield ctx.render('usewith.vash', {
    data: 'hello',
  });
};

exports.useWithError = function* (ctx) {
  yield ctx.render('usewitherror.vash', {
    data: 'hello',
  });
};
