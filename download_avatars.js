var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var token = require('./secrets.js')

// Use the request library to progromatically fetch the list of contributors via HTTPS for the given repo
// the callback handles asynchronous nature of results that are returned from getRepoContributors
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': token
        }
    };
    // parse the JSON string into an object and pass this object to the cb function
    request(options, function(err, res, body) {
        cb(err, JSON.parse(body));
    });
    
}


getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
    // accessing the object
    var user = []
    // going through every user access the user avatar url
    for (var i = 0; i < result.length; i++) {
        user = result[i].login;
        var avatarURL = result[i].avatar_url;
        console.log(user);
        console.log(avatarURL);
    }
  });