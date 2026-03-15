const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbConnection");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  orderId: {
    type: DataTypes.STRING,
  },

  paymentId: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.STRING,
  },
});

module.exports = Order;
