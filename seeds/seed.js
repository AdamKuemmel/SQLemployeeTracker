const sequelize = require("../config/connection");
const { Department, Role, Employee } = require("../models");

const DPSeedData = require("./DPSeedData.json");
const employeeSeedData = require("./employeeSeedData.json");
const roleSeedData = require("./roleSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Department = await Driver.bulkCreate(DPSeedData);
  const Role = await Driver.bulkCreate(roleSeedData);
  const Employee = await Driver.bulkCreate(EmployeeSeedData);

  process.exit(0);
};

seedDatabase();
