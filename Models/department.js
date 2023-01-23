const sequelize = require("./../Database/sequelize");
const { Sequelize, DataTypes } = require("sequelize");

module.exports = sequelize.define(
  "Department",
  {
    id: {
      field: "Department_id",
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "Department_Name",
      type: Sequelize.STRING,
      required: true,
    },
    code: {
      field: "Department_code",
      type: Sequelize.CHAR,
      required: true,
    },
    head_name: {
      field: "Department_Head_Name",
      type: Sequelize.STRING,
      required: true,
    },
    subdepartment: {
      field: "Sub_Department_Name",
      type: DataTypes.TEXT,
    },
    strength: {
      field: "Department_Strength",
      type: Sequelize.INTEGER,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);
