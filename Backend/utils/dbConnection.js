const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expenses", "root", "Singh@2026", {
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to DB:", err);
  });
module.exports = sequelize;
