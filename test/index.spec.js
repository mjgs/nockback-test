const expect = require('chai').expect;
const nock = require('nock');
const nockBack = nock.back;
const path = require('path');

const getUserFollowers = require('../lib/index').getUserFollowers;

describe('GET followers', function() {
  nockBack.fixtures = path.join(__dirname, 'fixtures');
  const nockOptions = {};

  nockBack('userFixtures.json', nockOptions, function(nockDone) {
    after(function(done) {
      if (typeof process.env.NOCK_BACK_MODE === 'record') {
        nock.restore(); // Stop recording
      }
      nockDone(); // Finish the fixture recording/playback
      done();
    });

    it('returns users followers', function(done) {
      this.timeout(5000);
      var username = 'octocat';

      getUserFollowers(username, function(err, followers) {
        expect(Array.isArray(followers)).to.equal(true);
        expect(followers).to.have.length.above(1);
        followers.forEach(function(follower) {
          expect(follower).to.be.a('string');
        });
        done();
      });
    });
  });
});
