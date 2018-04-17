'use strict';

const debug = require('debug')('koa-views');
const consolidate = require('consolidate');
const pretty = require('pretty');
const RENDER = Symbol('ViewsView#_render');

module.exports = class ViewsView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.config = ctx.app.config.views;
  }

  [RENDER](filename, locals, { engineSource = consolidate, options = {}, engine } = {}) {
    return new Promise((resolve, reject) => {
      const suffix = filename.ext;
      const state = Object.assign({}, locals, options);
      // deep copy partials
      state.partials = Object.assign({}, options.partials || {});

      const render = engineSource[engine];
      if (!engine || !render) reject(new Error(`Engine not found for the ".${suffix}" file extension`));

      render(filename, state, function(err, html) {
        if (err) reject(err);

        // since pug has deprecated `pretty` option
        // we'll use the `pretty` package in the meanwhile
        if (locals.pretty) {
          debug('using `pretty` package to beautify HTML');
          html = pretty(html);
        }
        resolve(html);
      });
    });
  }

  async render(filename, locals, viewOptions) {
    Object.assign(this.config.options, viewOptions);
    const config = Object.assign({}, this.config, { filename });
    return await this[RENDER](filename, locals, config);
  }

  renderString() {
    return Promise.reject(new Error('Function "renderString" is not support'));
  }

};
