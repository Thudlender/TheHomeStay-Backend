const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

//defind DB Schema
const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  UserPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
