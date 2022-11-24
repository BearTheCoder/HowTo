//Connects to my database on HostGator from an app running on Railway

function callSQL() {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'www.bearthecoder.tech', // HostGator website
    user: 'username',
    password: 'password', //Put in dotenv
  });

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
}

module.exports = { callSQL };
