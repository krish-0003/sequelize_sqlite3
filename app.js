const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const Employee = require("./Models/employee");
const Department = require("./Models/department");
const bodyparser = require("body-parser");

const department_route = require("./Routes/Department_route");
const employee_route = require("./Routes/Employee_route");

app.use(bodyparser.json());
const { Op } = Sequelize;

Department.hasMany(Employee, {
  foreignKey: "Department_id",
  onDelete: "cascade",
});
Employee.belongsTo(Department, {
  foreignKey: "Department_id",
  onDelete: "cascade",
});

Employee.sync();
Department.sync();

app.use("/api", employee_route);
app.use("/api", department_route);

app.listen(8000);
