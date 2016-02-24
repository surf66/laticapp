var express = require("express");
var app = express();
var social = require("../functions/social.js");
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var keys = require('../config/keys.js');

module.exports = {
  setup: function() {
    app.engine('html', require('hogan-express'));
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.set('partials', {
      head: 'head.html',
      header: 'header.html',
      footer: 'footer.html'
    });
    app.use(express.static('../public'));
    app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    this.defineRoutes();
    this.setupPassport();
  },
  startServer: function() {
    var server = app.listen(3000, function(){
      var host = server.address().address;
      var port = server.address().port;
      console.log("Server up @ http://%s:%s", host, port);
    });
  },
  setupPassport: function() {
    passport.use(new Strategy({
        consumerKey: keys.twitterConsumerKey,
        consumerSecret: keys.twitterConsumerSecret,
        callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
      },
      function(token, tokenSecret, profile, cb) {
        return cb(null, profile);
      }
    ));

    passport.serializeUser(function(user, cb) {
      cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });
  },
  defineRoutes: function() {
    app.get('/', function(req, res){
      var loadScreenClass = "";

      if(req.user) {
        loadScreenClass = "fadeOutUpBig";
      }

      res.render('index.html', { user: req.user, loading: loadScreenClass });
    });

    app.get('/login/twitter', passport.authenticate('twitter'));

    app.get('/login/twitter/return',
      passport.authenticate('twitter', { failureRedirect: '/' }),
      function(req, res) {
        res.redirect('/');
      });

    app.get('/tweets', function(req, res) {
      social.getTweets().then(function(response) {
        res.send(response);
      });
    });
  }
}
