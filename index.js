//declare all variables needed
const inquirer = require("inquirer");
const fs = require("fs");
var figlet = require("figlet");
const { init } = require("./models/Department");
const { Employee, Role, Department } = require("./models");
const cTable = require("console.table");
const connection = require("./config/connection");
const uuid = require("./helpers/uuid");
const sequelize = require("./config/connection");

//initQuestions() to direct use to the the function that will perform the action they would like to take

// function renderlogo() {
//   console.log(
//     logo({
//       name: "Employee Management System",
//       font: "Calvin S",
//       lineChars: 10,
//       padding: 2,
//       margin: 3,
//       borderColor: "cyan",
//       logoColor: "bold-magenta",
//       textColor: "magenta",
//     }).render()
//   );
// }

initQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initQuestions",
        message: "What would you like to do?",
        choices: [
          "view all employees",
          "add employee",
          "update employee role",
          "view all roles",
          "add role",
          "view all departments",
          "add department",
          "I WOULD LIKE TO EXIT APPLICATION",
        ],
      },
    ])
    .then((response) => {
      const userAction = response.initQuestions;

      userAction === "view all employees"
        ? viewEmp()
        : userAction === "add employee"
        ? addEmp()
        : userAction === "update employee role"
        ? updateEmp()
        : userAction === "view all roles"
        ? viewRole()
        : userAction === "add role"
        ? addRole()
        : userAction === "view all departments"
        ? viewDep()
        : userAction === "add department"
        ? addDep()
        : userAction === "I WOULD LIKE TO EXIT APPLICATION"
        ? exitApp()
        : console.log("error");
    });
};

async function viewEmp() {
  console.log("\n EMPLOYEES\n");
  const empData = await Employee.findAll();
  const emps = JSON.stringify(empData);

  console.table(JSON.parse(emps));
  initQuestions();
}

addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Please enter your first name",
      },
      {
        type: "input",
        name: "lastName",
        message: "Please enter your last name",
      },
      {
        type: "list",
        name: "roleBox",
        message: "what is your role?",
        choices: [
          "Salesperson",
          "Sales Lead",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },

      {
        type: "list",
        name: "managerBox",
        message: "Who is your manager?",
        choices: ["Adam Kuemmel", "Eugene Porter", "im a manager"],
      },
    ])
    .then((response) => {
      const role = response.roleBox;
      const manager = response.managerBox;
      let roleId;
      let managerId;

      role === "Salesperson"
        ? (roleId = 2)
        : role === "Sales Lead"
        ? (roleId = 1)
        : role === "Lead Engineer"
        ? (roleId = 3)
        : role === "Software Engineer"
        ? (roleId = 4)
        : role === "Account Manager"
        ? (roleId = 5)
        : role === "Accountant"
        ? (roleId = 6)
        : role === "Lawyer"
        ? (roleId = 7)
        : role === "Legal Team Lead"
        ? (roleId = 8)
        : console.log("error");

      manager === "Adam Kuemmel"
        ? (managerId = 1)
        : manager === "Eugene Porter"
        ? (managerId = 2)
        : manager === "im a manager"
        ? (managerId = null)
        : console.log("ERROR");

      Employee.create({
        first_name: response.firstName,
        last_name: response.lastName,
        role_id: roleId,
        manager_id: managerId,
      });
      initQuestions();
    });
};

async function updateEmp() {
  const emp = await Employee.findAll();
  const stringEmp = JSON.stringify(emp);
  const parseEmp = JSON.parse(stringEmp);
  let names;
  workers = () => {
    parseEmp.forEach((key) => {
      const firstName = key.first_name;
      const lastName = key.last_name;

      // var obj = parseEmp[key];

      names = firstName + " " + lastName;
      return names;
    });
  };
  workers();
  console.log(names);
  const { worker, newrole } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose an employee to update:",
      name: "worker",
      choices: [names],

      // () => {
      // console.log(parseEmp);
      // return parseEmp;
      // },
    },
    {
      type: "list",
      message: "What is this employee's new role?",
      name: "newrole",
      choices: () => {
        ["hi"];
        // updating role id
        // workers = () => {
        //   parseEmp.forEach((key) => {
        //     const firstName = key.first_name;

        //     console.log(firstName);
        //     // var obj = parseEmp[key];

        //     let names = key.first_name + " " + key.last_name;

        //     return names;
        //   });
        // };
      },
    },
  ]);
  // sequelize.query(
  //   // updated employee with the user provided role id and last name
  //   "UPDATE employees SET ? WHERE ?",
  //   [
  //     {
  //       role_id: newrole,
  //     },
  //     {
  //       last_name: worker,
  //     },
  //   ],
  //   function (err, res) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(res.affectedRows + " employee updated!\n");

  //     console.table(employee);

  //     start();
  //   }
  // );
}

async function viewRole() {
  console.log("\n ROLES\n");
  const rolesData = await Role.findAll();
  const roles = JSON.stringify(rolesData);

  console.table(JSON.parse(roles));
  initQuestions();
}

addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Please enter the name of the role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of th role?",
      },
      {
        type: "list",
        name: "departBox",
        message: "Which department does the role belong to?",
        choices: ["Engineering", "Finance", "Legal", "Sales"],
      },
    ])
    .then((response) => {
      const department = response.departBox;

      let departId;

      department === "Engineering"
        ? (departId = 1)
        : department === "Finance"
        ? (departId = 2)
        : department === "Legal"
        ? (departId = 3)
        : department === "Sales"
        ? (departId = 4)
        : console.log("error");

      Role.create({
        title: response.roleName,
        salary: response.roleSalary,
        department_id: departId,
      });
      initQuestions();
    });
};

async function viewDep() {
  console.log("\n DEPARTMENTS\n");
  const depData = await Department.findAll();
  const deps = JSON.stringify(depData);

  console.table(JSON.parse(deps));
  initQuestions();
}

addDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departName",
        message: "Please enter the name of the Department",
      },
    ])
    .then((response) => {
      Department.create({
        name: response.departName,
      });
      initQuestions();
    });
};

// // welcomeConsole = () => {
// //   figlet.text(
// //     "Employee Tracker!",
// //     {
// //       font: "epic",
// //       horizontalLayout: "default",
// //       verticalLayout: "default",
// //       width: 80,
// //       whitespaceBreak: true,
// //     },
// //     function (err, data) {
// //       if (err) {
// //         console.log("Something went wrong...");
// //         console.dir(err);
// //         return;
// //       }
// //       console.log(data);
// //     }
// //   );
// // };
// // welcomeConsole();
// thanksConsole = () => {};

function exitApp() {
  console.log("GOODBYE!");
}

initQuestions();
