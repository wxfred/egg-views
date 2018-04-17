'use strict';

const path = require('path');
const mm = require('egg-mock');
const fs = require('mz/fs');

const fixtures = path.join(__dirname, 'fixtures');

describe('test/egg-views.test.js', () => {

  describe('render', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/views-test',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should render with locals', () => {
      return app.httpRequest()
        .get('/locals')
        .expect('hello world\n')
        .expect(200);
    });

    it('should render with include', () => {
      return app.httpRequest()
        .get('/include')
        .expect('hello header\nhello footer\n')
        .expect(200);
    });

    it('should render with helper', () => {
      return app.httpRequest()
        .get('/helper')
        .expect('hello world\n')
        .expect(200);
    });

    it('should render with cache', function* () {
      const cacheFile = path.join(fixtures, 'apps/views-test/app/view/cache.ejs');
      yield fs.writeFile(cacheFile, '1');
      yield app.httpRequest()
        .get('/cache')
        .expect('1')
        .expect(200);

      yield fs.writeFile(cacheFile, '2');
      yield app.httpRequest()
        .get('/cache')
        .expect('1')
        .expect(200);
    });

    it('should render with html extension', () => {
      return app.httpRequest()
        .get('/htmlext')
        .expect('hello world\n')
        .expect(200);
    });

    it('should render error', () => {
      return app.httpRequest()
        .get('/error')
        .expect('Could not find matching close tag for "<%".')
        .expect(200);
    });
  });

  describe('renderString', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'apps/views-test',
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

  describe('no cache', () => {
    let app;
    before(() => {
      mm.env('local');
      app = mm.app({
        baseDir: 'apps/views-test',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should render without cache', function* () {
      const cacheFile = path.join(fixtures, 'apps/views-test/app/view/cache.ejs');
      yield fs.writeFile(cacheFile, '1');
      yield app.httpRequest()
        .get('/cache')
        .expect('1')
        .expect(200);

      yield fs.writeFile(cacheFile, '2');
      yield app.httpRequest()
        .get('/cache')
        .expect('2')
        .expect(200);
    });
  });
});
