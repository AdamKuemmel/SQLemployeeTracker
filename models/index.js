const Department = require("./Department");
const Employee = require("./Employee");
const Role = require("./Role");

//role has one department , creating a foriegn key in the "role" table
Role.belongsTo(Department, {
  foreignKey: "department_id",
});

//create he association from the car side

Department.hasMany(Role, {
  foreignKey: "department_id",
});

//employee has one role, creating a foriegn id in the "employee" table

Employee.belongsTo(Role, {
  foreignKey: "role_id",
});

//employee has has one manager or null if manager BOOLEAN? if manager remove foreing id?

Role.hasMany(Employee, {
  foreignKey: "role_id",
});

// Employee.hasOne(Employee, {
//   foreignKey: "manager_id",
// });

module.exports = { Department, Employee, Role };
