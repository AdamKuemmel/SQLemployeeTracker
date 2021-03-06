const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      len: [2, 30],
      isAlpha: true,
    },
    last_name: {
      type: DataTypes.STRING,
      len: [2, 30],
      isAlpha: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "role",
        key: "id",
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      // allowNull: true,
      // references: {
      //   model: "employee",
      //   key: "id",
      // },
    },
  },
  {
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "employee",
  }
);

module.exports = Employee;
