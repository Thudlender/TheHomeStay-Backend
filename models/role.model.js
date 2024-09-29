const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

//defind DB Schema
const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Role;
