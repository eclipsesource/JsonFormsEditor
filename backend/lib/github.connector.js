
var request = require('request');
var config = require('../config/config.js');

var api = {};

api.getRepoList = function(token, callback){
	var genToken = (token ? "?access_token="+token : "");
    var options = {
		url: "https://api.github.com/user/repos"+genToken,
		headers: {
			//    "Authorization": "token "+token,
			"User-Agent": config.appName
		}
	};
    request(options, function(error, response, body){
	    if(error){
		callback(error);
	    }else{
		callback(null, response);
	    }
    });
};

api.getRepoBySearch = function(query, callback){
	var options = {
		url: "https://api.github.com/search/repositories?q="+query,
		headers: {
			"User-Agent": config.appName
		}
	};
	request(options, function(error, response, body){
		if(error){
			callback(error);
		}else{
			callback(null, response);
		}
	});
};

api.getBranchList = function(token, ownerName, repoName, callback){
	if(!ownerName||!repoName){
		callback('Missing data');
		return;
	}
	var genToken = (token ? "?access_token="+token : "");
	var options = {
		url: "https://api.github.com/repos/"+ownerName+"/"+repoName+"/branches"+genToken,
		headers: {
			"User-Agent": config.appName
		}
	};

	request(options, function(error, response, body){
		if(error){
			callback(error);
		}else{
			callback(null, response);
		}
	});
};
api.getFilesFromBranch = function(token, ownerName, repoName, branchName, callback){
	if(!ownerName||!repoName||!branchName){
		callback('Missing data');
		return;
	}

	var genToken = (token ? "?access_token="+token : "");
	var options = {
                url: "https://api.github.com/repos/"+ownerName+"/"+repoName+"/commits/"+branchName+genToken,
		headers: {
			"User-Agent": config.appName
		}
	};
	request(options, function(error, response, body){
		if(error){
			callback(error);
		}else{
		        
			callback(null, response);
		}
	});
};

api.getFilesFromTree = function(token, treeUrl, callback){
    if(!treeUrl){
	callback('Missing data');
    }

	var genToken = (token ? "?access_token="+token : "");
    var options = {
	url: treeUrl+genToken,
	headers: {
	    "User-Agent":config.appName
	}
    };
    request(options, function(error, response, body){
	    if(error){
		callback(error);
	    }else{
		callback(null, response);
	    }
    });
};

module.exports = api;