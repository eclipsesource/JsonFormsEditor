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


github.use(passport.initialize());
github.use(passport.session());

github.get('/login', passport.authenticate('github'));

var strategy = new Strategy({
    clientID: keys.clientId,
    clientSecret: keys.clientSecret,
    callbackURL: config.appUrl + '/github/getRepoList'
}, function(accessToken, refreshToken, profile, cb){
	console.log(refreshToken);
	    cb(null, {
	      accessToken: accessToken,
	      profile:profile,
	    });
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});


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

// ONLY FOR DEBUGGING
github.get('/getRepoListDev', function(req,res,next){

	var code = req.query.accessToken;
	var username = req.query.user;
	req.session.passport = {
		user:{
			accessToken: code,
			profile: {
				username: 'pancho111203'
			}
		}
	};

	connector.getRepoList(code, function(error, result){
		if(error){
			return next(error);
		}
		res.json(result);
	});
});

github.get('/getBranchList',
		function(req, res, next){
			var code = req.user.accessToken;
			var repoName = req.query.repoName;
			var userName = req.user.profile.username;
			connector.getBranchList(code, userName, repoName, function(error, result){
				if(error){
					return next(error);
				}
				res.json(result.body);
			});


		}
);
github.get('/getFilesFromBranch',
		function(req, res, next){
			var code = req.user.accessToken;
			var repoName = req.query.repoName;
			var userName = req.user.profile.username;
			var branchName = req.query.branchName;


			connector.getFilesFromBranch(code, userName, repoName, branchName, function(error, result){
				if(error){
					return next(error);
				}
			       
				var treeUrl = JSON.parse(result.body).commit.tree.url;
				if(!treeUrl){
				    return next('Cannot find url of file tree');
				}
				connector.getFilesFromTree(code, treeUrl, function(error, result){
					if(error){
					    return next(error);
					}

					res.json(JSON.parse(result.body).tree);
				});
			});


		}
);

github.get('/getFileLevel',
		function(req,res,next){
			var code = req.user.accessToken;
			var url = req.query.url;

			connector.getFilesFromTree(code, url, function(error, result){
				if(error){
					return next(error);
				}
				res.json(JSON.parse(result.body).tree);
			});
		}
);

github.get('/loadFile',
		function(req, res, next) {
			var code = req.user.accessToken;
			var url = req.query.url;

			connector.getFilesFromTree(code, url, function(error, result){
				if(error){
					return next(error);
				}
				res.json(JSON.parse(result.body));
			});
		}
);


module.exports = github;