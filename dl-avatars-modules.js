var request = require('request');
var fs = require("fs");
require('dotenv').config();
var username = 'jenyeeiam';
var api_token = process.env['GITHUB_API_TOKEN'];
//var api_token = "hafaerou";
const ENDPOINT = 'https://api.github.com/repos/';


exports.getRepoContributors = function(owner, repo, cb){
  if (typeof cb !== "function") {
    console.log("Third input is not a function");
    return;
  };

  request.get({
    url: ENDPOINT + owner + "/" + repo + "/contributors",
    auth: {
      'user': username,
      'pass': api_token//,
      //'sendImmediately': false
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0',
    },
    json:true
  }, function (err, response, body){
    cb(err, body);
    });
};

exports.downloadImageByURL = function(url, filePath) {
  request
  .get(url)
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream(filePath))
};

// exports.errorHandling = function() {
//   //checks for 3 arguments
//   if (process.argv.length !== 4) {
//     console.log("Three arguments needed - getRepoContributors(owner, repo, callbackFn)");
//     return;
//   };

//   //checks for .env file
//   fs.exists('./.env', (exists) => {
//     if (!exists) {
//       console.log("Create and .env file with your user token");
//     };
//   });
// }