const sequelize = require("./../Database/sequelize");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = sequelize.define(
  "Employee",
  {
    id: {
      field: "Employee_Id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "Name",
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          arg: false,
          msg: "Name is required",
        },
        isAlpha: {
          arg: true,
          msg: "string contains only alpha characters",
        },
      },
    },
    Department_id: {
      field: "Department_id",
      type: Sequelize.INTEGER,
    },
    age: {
      field: "Age",
      type: Sequelize.INTEGER,
    },
    address: {
      field: "Address",
      type: Sequelize.STRING,
    },
    joiningdate: {
      field: "Joining Date",
      type: Sequelize.DATEONLY,
    },
    bank_details: {
      field: "Bank Details",
      type: Sequelize.CHAR,
    },
    salary: {
      field: "Salary",
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
