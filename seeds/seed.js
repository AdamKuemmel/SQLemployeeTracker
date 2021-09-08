const sequelize = require("../config/connection");
const { Department, Role, Employee } = require("../models");

const DPSeedData = require("./DPSeedData.json");
const employeeSeedData = require("./employeeSeedData.json");
const roleSeedData = require("./roleSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Department.bulkCreate(DPSeedData);
  await Role.bulkCreate(roleSeedData);
  await Employee.bulkCreate(employeeSeedData);

  process.exit(0);
};

seedDatabase();
