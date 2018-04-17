'use strict';

const mm = require('egg-mock');

describe('test/egg-views-vash.test.js', () => {

  describe('render', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/views-vash-test',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should render with locals', () => {
      return app.httpRequest()
        .get('/locals')
        .expect('hello world')
        .expect(200);
    });

    it('should render with include', () => {
      return app.httpRequest()
        .get('/include')
        .expect('hello header\nhello footer')
        .expect(200);
    });

    it('should render with helper', () => {
      return app.httpRequest()
        .get('/helper')
        .expect('hello world')
        .expect(200);
    });

    it('should render with html extension', () => {
      return app.httpRequest()
        .get('/htmlext')
        .expect('hello world')
        .expect(200);
    });

    it('should render error', () => {
      return app.httpRequest()
        .get('/error')
        .expect(/Problem while compiling template/)
        .expect(200);
    });
  });

  describe('renderString', () => {
    let app;
    before(() => {
      mm.env('local');
      app = mm.app({
        baseDir: 'apps/views-vash-test',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should renderString error', () => {
      return app.httpRequest()
        .get('/render-string-error')
        .expect('Function "renderString" is not support')
        .expect(200);
    });
  });

  describe('configuration tests', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/views-vash-test',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should render with @data instead of @model.data', () => {
      return app.httpRequest()
        .get('/use-with')
        .expect('hello')
        .expect(200);
    });

    it('should render error', () => {
      return app.httpRequest()
        .get('/use-with-error')
        .expect(404);
    });
  });
});
