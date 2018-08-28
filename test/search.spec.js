const expect = require('chai').expect;
const nock = require('nock');
const path = require('path');

const searchRepositories = require('../lib/search').searchRepositories;

const nockFixtureDirectory = path.resolve(__dirname, './fixtures');
const fixturesFilename = 'searchFixtures.json';

describe('GET search', function() {
  before(function(done) {
    const nockBackOptions = {};
    nock.back.fixtures = nockFixtureDirectory;
    nock.back(fixturesFilename, nockBackOptions, function (nockDone) {
      this.nockDone = function () {
        nockDone();
      };
      done();
    }.bind(this));
  });

  after(function() {
    this.nockDone();
  });

  it('returns repositories search results', function(done) {
    this.timeout(5000);
    const q = 'nock'
    const sort = '';
    const order = '';

    searchRepositories(q, sort, order, function(err, results) {
      expect(err).to.be.null;
      expect(Object.keys(results).length).is.equal(3);
      expect(Array.isArray(results.items)).to.equal(true);
      expect(results.items.length).to.be.above(0);
      expect(results.total_count).to.be.a('Number');
      done();
    });
  });
});
