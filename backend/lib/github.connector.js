
var request = require('request');
var config = require('../config/config.js');

var api = {};

api.getRepoList = function(token, callback){

    var options = {
	url: "https://api.github.com/user/repos?access_token="+token,
	headers: {
	    //    "Authorization": "token "+token,
	    "User-Agent": config.appName
	}
    }
    request(options, function(error, response, body){
	    if(error){
		callback(error);
	    }else{
		callback(null, response);
	    }
    });
};

module.exports = api;