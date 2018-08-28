const expect = require('chai').expect;
const nock = require('nock');
const path = require('path');

const getUserFollowers = require('../lib/index').getUserFollowers;

const nockFixtureDirectory = path.resolve(__dirname, './fixtures');
const fixturesFilename = 'usersFixtures.json';

describe('GET followers', function() {
  before(function(done) {
    nock.back.fixtures = nockFixtureDirectory;
    nock.back(fixturesFilename, function (nockDone) {
      this.nockDone = function () {
        nockDone();
      };
      done();
    }.bind(this));
  });

  after(function() {
    this.nockDone();
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
