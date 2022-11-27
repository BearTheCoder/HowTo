const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
});

const connection = pool.getConnection()
  .then((connection) => {
    connection.query("SHOW DATABASES;")
      .then((result) => console.log(result));
  });
