const fs = require('fs');

function writeToFile(email) {
    fs.appendFile('emails.txt', `${email},`, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

module.exports = writeToFile;