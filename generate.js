var unsecurePlainTextPassword = "sEnha004";
var bcrypt = require("bcryptjs");

bcrypt.genSalt(10, function (err, salt) {
  bcrypt(unsecurePlainTextPassword, salt, function (err, hash) {
    console.log(hash);
  });
});
