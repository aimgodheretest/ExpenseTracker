const { DataTypes } = require("sequelize");
const sequelize = require("../utils/dbConnection");

const forgotPasswordTable = sequelize.define("forgotPasswordTable", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = forgotPasswordTable;
