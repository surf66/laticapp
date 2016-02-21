var express = require("express");
var app = express();
var social = require("../functions/social.js");

module.exports = {
  setup: function() {
    app.use(express.static('public'));
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.set('partials', {
      head: 'head.html',
      header: 'header.html',
      footer: 'footer.html'
    });
    app.engine('html', require('hogan-express'));

    app.get('/', function(req, res){
      res.render('index.html');
    });

    app.get('/tweets', function(req, res) {
      social.getTweets().then(function(response) {
        res.send(response);
      });
    });
  },
  startServer: function() {
    var server = app.listen(3000, function(){
      var host = server.address().address;
      var port = server.address().port;
      console.log("Server up @ http://%s:%s", host, port);
    });
  }
}
