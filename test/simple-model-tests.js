'use strict';

const app = require('../server/server'),
  chai = require('chai'),
  expect = chai.expect;

before(function (done) {
  if (app.booting) {
    app.on('booted', done);
  } else {
    done();
  }
});

describe('undefined in where', function() {

  before(function (done) {
    app.models.SimpleModel.create([{name: 'first'}, {name: 'second'}, {name: 'third'}], function() { done(); });
  });

  it('should throw in find', function (done) {
    app.models.SimpleModel.find({name: undefined}, function (err) {
      expect(err).to.exist;
      done();
    });
  });

  it('should throw in destroy all', function (done) {
    app.models.SimpleModel.destroyAll({name: undefined}, function (err) {
      expect(err).to.exist;
      done();
    });
  });
});
