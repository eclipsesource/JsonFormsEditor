/**
 * Created by pancho111203 on 15/02/16.
 */

var express = require('express');
var keys = require('../config/keys.js');

var passport = require('passport');
var Strategy = require('passport-github').Strategy;

var github = express();


passport.use(new Strategy({
    clientID: keys.clientId,
    clientSecret: keys.clientSecret,
    callbackURL: 'http://5.134.117.118:3000/github/callback'
}, function(accessToken, refreshToken, profile, cb){
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    cb(null, profile);
}));


github.get('/login', passport.authenticate('github'));

github.get('/callback', passport.authenticate('github', {failureRedirect: '/login'}),
    function(req, res){
        console.log('authenticated and in callback');
    }
);
github.get('/repos', function(req,res){
    console.log('SUCCESS');
});



module.exports = github;