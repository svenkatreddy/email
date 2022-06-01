const fs = require('fs');

function writeToFile(successful = false, email) {
    if (successful) {
        fs.appendFile('success-emails.txt', `${email},`, function (err) {
        if (err) console.log(err);
        // console.log('Saved!');
        });
    } else {
        fs.appendFile('failed-emails.txt', `${email},`, function (err) {
        if (err) console.log(err);
        // console.log('Saved!');
        });
    }
    
}

module.exports = writeToFile;