var Twitter = require('twitter');
var q = require('q');
var keys = require('../config/keys.js');

module.exports = {
  getTweets: function() {
    var deferred = q.defer();

    var client = new Twitter({
      consumer_key: keys.twitterConsumerKey,
      consumer_secret: keys.twitterConsumerSecret,
      access_token_key: keys.twitterAccessTokenKey,
      access_token_secret: keys.twitterAccessTokenSecret
    });

    client.get('https://api.twitter.com/1.1/search/tweets.json?q=%23wafc&src=typd', function(error, tweets, response) {
      if (!error) {
        deferred.resolve(tweets);
      }
    });

    return deferred.promise;
  }
}
