var importFns = require("./dl-avatars-modules");
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];

//num
if (process.argv.length !== 4) {
  console.log("Two arguments needed. Include owner, repo name");
  return;
};
//check for .env
fs.exists('./.env', (exists) => {
  if (!exists) {
    throw new Error ("Create an .env file with your user token");
  };
});

importFns.getRepoContributors(owner, repo, function (err, result) {
  // FIXME: it is not very clear what the result variable holds.
  // Please rename it to something more expressive.
  if (err) {
    throw err;
  }

  function addAvatarFiles(directoryName) {
    result.forEach(function(cv, index) {
    // FIXME: it is not very clear what the cv variable holds.
    // Please rename it to something more expressive.
      importFns.downloadImageByURL(cv.avatar_url, directoryName + '/' + cv.id + '.jpg');
    });
  }

  // THUMBSUP: Nice error handling. Very helpful messages.

  //checks to make sure the owner and repo exist
  if (result.message === "Not Found"){
    console.log("Make sure owner and/or repo exist on github");
    return;
  }

  //check for legit token
  if (result.message === "Bad credentials") {
    console.log("Check to make sure your token is correct");
    return;
  }

  var avatarDirectory = './avatars'; // FIXME: Consider making this a constant.
  //check to see if path avatars exists
  fs.exists(avatarDirectory, (exists) => {
    if (exists) {
      addAvatarFiles(avatarDirectory);
    } else {
      fs.mkdirSync(avatarDirectory);
      addAvatarFiles(avatarDirectory);
    }
    // The code above is great. Just a suggestion...
    // You could also write it like this:
    if (!exists) {
      fs.mkdirSync(avatarDirectory);
    }
    addAvatarFiles(avatarDirectory);
  });
});

