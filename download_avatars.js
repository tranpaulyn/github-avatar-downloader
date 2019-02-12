var request = require('request');
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('response', function(res) {
            console.log(res)
        })
        .pipe(fs.createWriteStream(filePath))
}


getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    // console.log("Result:", result);
    // accessing the object
    // going through every user access the user avatar url
    for (var i = 0; i < result.length; i++) {
        // var avatarURL = result[i].avatar_url;
        console.log("Contributor:", result[i].login);
        console.log("Avatar Image URL:", result[i].avatar_url);
    }
  });
  
downloadImageByURL("https://avatars1.githubusercontent.com/u/43004?v=4", "avatars/pbakaus.jpg")