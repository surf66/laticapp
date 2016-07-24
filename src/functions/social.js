var Twitter = require('twitter');
var q = require('q');

module.exports = {
  getTweets: function() {
    var deferred = q.defer();

    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.get('https://api.twitter.com/1.1/search/tweets.json?q=%23wafc&src=typd', function(error, tweets, response) {
      if (!error) {
        deferred.resolve(tweets);
      }
    });

    return deferred.promise;
  }
}
