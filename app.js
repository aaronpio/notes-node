//Notes Node

console.log('starting app');

const fs = require('fs');
const os = require('os');

var user = os.userInfo();

fs.appendFileSync('greetings.txt', `hello ${user.username} you tool`);