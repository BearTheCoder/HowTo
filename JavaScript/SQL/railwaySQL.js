const mySql = require('mysql2'); //npm install mysql2 (more up to date than "npm i mysql")
require('dotenv').config; //npm install dotenv (also create a ".env" file and upload database pw there)
const connectionString = `mysql://root:${process.env.SQL_PASS}@containers-us-west-135.railway.app:6000/railway`;

var connection = mySql.createConnection(connectionString);

connection.promise().connect()
  .then((result) => console.log(`Connected! \n ${result}`))
  .catch((err) => console.log(err));

connection.promise().query('show tables;')
  .then((result) => { console.log(result); })
  .catch((err) => { console.log(err); });

connection.promise().query(
  'CREATE TABLE test2 (testCol1 varchar(255), textCol2 varchar(255));'
)
  .then((result) => { console.log(result); })
  .catch((err) => { console.log(err); });

connection.promise().query(
  "INSERT INTO test2 VALUES('blah blah', 'blah2 blah2');"
)
  .then((result) => { console.log(result); })
  .catch((err) => { console.log(err); });

connection.promise().query(
  "SELECT * FROM test2"
)
  .then((result) => { console.log(result); })
  .catch((err) => { console.log(err); });