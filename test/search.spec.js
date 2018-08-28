const expect = require('chai').expect;
const nock = require('nock');
const nockBack = nock.back;
const path = require('path');

const searchRepositories = require('../lib/search').searchRepositories;

describe('GET search', function() {
  nockBack.fixtures = path.join(__dirname, 'fixtures');
  const nockOptions = {};

  nockBack('searchFixtures.json', nockOptions, function(nockDone) {
    after(function(done) {
      if (typeof process.env.NOCK_BACK_MODE === 'record') {
        nock.restore(); // Stop recording, save fixtures to disk
      }
      nockDone(); // Finish the fixture recording/playback
      done();
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
});
