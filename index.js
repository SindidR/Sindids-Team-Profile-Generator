function initApp() {
    startHtml();
    addCrew();
}

const inquirer = require('inquirer');
const fs = require('fs');

const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')

const employees = [];

function startHtml () {
    `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"
  href="./dist/style.css">
  <title>Team Profile Generator</title>
</head>
<body>
<div class="container">
    <div class="row">`;
fs.writeFile("./dist/index.html", html, function(err){
if(err){
    console.log(err)
}
});
console.log("start");
}
function addHtml(crew) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOffice();
            data = `<div class="col-6">
            <div class="card">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email : ${email}</li>
                <li class="list-group-item">Office : ${office}</li>
            </ul>
            </div>
        </div>`
    }
    console.log("adding team member");
        fs.appendFile("./dist/index.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });

}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./dist/index.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}
    
    

function addCrew() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your Name?',
            name: 'name',
          },
          {
            type: 'input',
            message: 'What is your ID?',
            name: 'id',
          },
          {
            type: 'input',
            message: 'What is your Email?',
            name: 'email',
          },
          {
            type: 'list',
            message: 'What is your Role?',
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
            name: 'role'
          }
        ])
.then(function({name, id, email, role}) {
    let roleData = "";
    if (role === "Engineer") {
        roleData = "GitHub username";
    } else if (role === "Intern") {
        roleData = "School Name";
    } else if (role === "Manager") {
        roleData = "Office Number"
    }
    inquirer
    .prompt([{
        message: `Enter Crew Members ${roleData}`,
        name: "roleData"
    },
    {
        type: 'confirm',
        message: 'Do you want to add anymore Crew members?',
        name: 'confirmAddCrew'
        }
    ])
    .then(function({roleData, confirmAddCrew}) {
        let newCrew;
        if (role === "Engineer") {
            newCrew = new Engineer(name, id, email, roleInfo);
         } else if (role === "Manager") {
            newCrew = new Manager(name, id, email, roleInfo);
        } else if (role === "Intern") {
            newCrew = new Intern(name, id, email, roleInfo);
        }
        employees.push(newCrew);
        addHtml(newCrew)
            .then(function() {
                if (confirmAddCrew === confirm) {
                    addCrew();
                } else { 
                    finishHtml();
                }
                
            });
        });
    });
}
