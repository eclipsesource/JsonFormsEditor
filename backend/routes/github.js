/**
 * Created by pancho111203 on 15/02/16.
 */

var express = require('express');
var keys = require('../config/keys.js');
var config = require('../config/config.js');
var passport = require('passport');
var Strategy = require('passport-github').Strategy;
var connector = require('../lib/github.connector.js');
var github = express();


passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

github.use(passport.initialize());
github.use(passport.session());

passport.use(new Strategy({
    clientID: keys.clientId,
    clientSecret: keys.clientSecret,
    callbackURL: config.appUrl + '/github/getRepoList'
}, function(accessToken, refreshToken, profile, cb){

	    cb(null, {
	      accessToken: accessToken,
	      profile:profile
	    });
}));


github.get('/login', passport.authenticate('github'));

github.get('/getRepoList', passport.authenticate('github', {failureRedirect: '/login'}),
	   function(req, res, next){
	       var code = req.user.accessToken;  
		   connector.getRepoList(code, function(error, result){
			   if(error){
				   return next(error);
			   }
			   var response = "<script>";
			   response+= "opener.postMessage("+JSON.stringify(result)+", '*');";
			   response+= "</script>";
			   res.writeHead(200, {"Content-Type": "text/html"});
			   res.end(response);
	       });

           }
);

github.get('/getBranchList', passport.authenticate('github', {failureRedirect: '/login'}),
		function(req, res, next){
			var code = req.user.accessToken;
			var repoName = req.query.repoName;
			console.log('THE FOLLOWING SHOULD BE REPONAME');
			console.log(repoName);
			var userName = req.user.username;
			console.log('THE FOLLOWING SHOULD BE USERNAME');
			console.log(userName);

			connector.getBranchList(code, userName, repoName, function(error, result){
				if(error){
					return next(error);
				}
				res.json(result);
			});


		}
);
github.get('/getFilesFromBranch', passport.authenticate('github', {failureRedirect: '/login'}),
		function(req, res, next){
			var code = req.user.accessToken;
			var repoName = req.query.repoName;
			console.log('THE FOLLOWING SHOULD BE REPONAME');
			console.log(repoName);
			var userName = req.user.username;
			console.log('THE FOLLOWING SHOULD BE USERNAME');
			console.log(userName);
			var branchName = req.query.branchName;
			console.log('THE FOLLOWING SHOULD BE BRANCHNAME');
			console.log(branchName);
			connector.getFilesFromBranch(code, userName, repoName, branchName, function(error, result){
				if(error){
					return next(error);
				}
				res.json(result);
			});


		}
);

module.exports = github;