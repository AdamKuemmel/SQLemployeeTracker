const Department = require("./Department");
const Employee = require("./Employee");
const Role = require("./Role");
const Manager = require("./Manager");

Role.belongsTo(Employee, {
  foriegnKey: "role_id",
});

Department.belongsTo(Role, {
  foriegnKey: "department_id",
});

Manager.belongsTo(Employee, {
  foriegnKey: "manager_id",
});
module.exports = { Department, Employee, Role, Manager };
