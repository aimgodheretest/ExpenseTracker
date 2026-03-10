const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Singh@2026",
  database: "expenses",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Database Connection Created!`);

  //Create User table to store the user data;
  const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
   )`;

  connection.execute(usersTable, (err) => {
    if (err) {
      console.log(err);
      connection.end();
      return;
    }
    console.log(`Student table created...`);
  });
});

module.exports = connection;
