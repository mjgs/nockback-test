var request = require('superagent');

var searchRepositories = function(q, sort, order, callback) {
  const query = `q=${encodeURIComponent(q)}&sort=${encodeURIComponent(sort)}&order=${encodeURIComponent(order)}`;
  request
    .get(`https://api.github.com/search/repositories?${query}`)
    .end(function(err, res) {
      if (!err) {
        callback(null, res.body);
      } 
      else {
        callback(err, 'Error Occurred!');
      }
    });
};

module.exports.searchRepositories = searchRepositories;
