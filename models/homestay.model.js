const { DataTypes } = require("sequelize");
const sequelize = require("./db");
// Define DB Schema
const HomeStay = sequelize.define("homestay", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// If true, it will reset after a new run of dev
HomeStay.sync({ force: true })
    .then(() => {
        console.log("table created or already exists");
    })
    .catch((error) => {
        console.log("Error creating table:", error);
    });

module.exports = HomeStay;
