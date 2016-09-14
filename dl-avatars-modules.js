var request = require('request');
var fs = require("fs");
require('dotenv').config();
// FIXME: username and api_token should also be constants. They are never modified by the program.
var username = 'jenyeeiam';
// FIXME: this variable uses snake case. Other variables in the program use snake case. Pick one style and keep it consistent.
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
      // FIXME: comment above should be remove. any code that is not used should be deleted.
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0',
    },
    json:true
  }, function (err, response, body){
    cb(err, body);
    }); // FIXME: Fix indentation
};

// THUMBS_UP: Nice breakup of functions here.
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
