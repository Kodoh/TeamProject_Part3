const express = require('express');

//const mysql = require('mysql2');

const app = express();
const dataAnalyticsRouter = require("./routes/dataAnalytics");


/*

// database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jn3Flw70!',
    database: 'mydb'
});

app.use(express.json());        // MIDDLEWARE


// examples of data based on database ERD
const projects = [
    { project_id: 1, project_name: 'test', start_date: '13/04/2023', end_date: '25/05/2023', project_status: 'in progress' }

]

const teams = [
    { team_id: 1, team_name: 'Team 1' },
    { team_id: 2, team_name: 'Team 2' }
]

const employee = [
    { employee_id: 1, employee_name: 'Campbell Ward', is_manager: false },
    { employee_id: 2, employee_name: 'Jake Anderson', is_manager: true }
]

const tasks = [
    { task_id: 1, project_id: 1, task_name: 'Test code', manhours: 2, task_status: 'in progress', start_date: '13/04/2023', end_date: '20/04/2023' }

]

const team_employee = [
    { team_id: 1, employee_id: 1 },
    { team_id: 2, employee_id: 2 }
]

const task_employee = [
    { task_id: 1, employee_id: 1 }
]

const task_team = [
    { task_id: 1, team_id: 1 }
]


app.get('/dataAnalytics', (req, res) => {
    res.send("Welcome the the data analytics subsystem!");
});

app.get('/dataAnalytics/tasks', (req, res) => {  // gets all tasks
    res.send(tasks);
})

app.get('/dataAnalytics/task/:id', (req, res) => { // gets specific task

    const task = tasks.filter(c.task_id == req.params.id);
    if (!task) res.status(404).send(`Could not find task`); // 404 NOT FOUND
    res.send(task);
})

app.get('/dataAnalytics/employee/:employee_id', (req, res) => { // gets specific employee

    const emp = employee.filter(c => c.employee_id == req.params.employee_id);
    if (!emp) res.status(404).send(`Could not find employee '${req.params.employee_id}'`); // 404 NOT FOUND
    res.send(emp);
})

app.get('/dataAnalytics/employees', (req, res) => { // gets all employees

    res.send(employee);
})



app.get('/dataAnalytics/teams', (req, res) => { // gets all teams
    res.send(teams);

})

app.get('/dataAnalytics/team/:id', (req, res) => { // gets specific team

    const t = teams.filter(c => c.team_id == req.params.id);
    if (!t) res.status(404).send(`Could not find team '${req.params.id}'`); // 404 NOT FOUND
    res.send(t);
})


app.get('/dataAnalytics/teamTasks/:id', (req, res) => { // gets tasks assigned to specified team

    const t = task_team.filter(c => c.team_id == req.params.id);
    if (!t) res.status(404).send(`Could not find any tasks for team '${req.params.id}'`); // 404 NOT FOUND
    res.send(t);
})


app.get('/dataAnalytics/employeeTasks/:id', (req, res) => { // gets tasks for specific employee

    const t = task_employee.filter(c => c.employee_id == req.params.id);
    if (!t) res.status(404).send(`Could not find any tasks for employee '${req.params.id}'`); // 404 NOT FOUND
    res.send(t);
})

app.get('/dataAnalytics/teamEmployees/:id', (req, res) => { // gets employees assigned to specified team
    const emp = team_employee.filter(c => c.team_id == req.params.id);
    if (!emp) res.status(404).send(`Could not find any employees in team '${req.params.id}'`); // 404 NOT FOUND
    res.send(emp);

})

app.post('/dataAnalytics/addEmployee', (req, res) => { // add new employee 


    if (req.body.id == undefined || req.body.name == undefined || req.body.manager == undefined) {
        res.status(400).send('Ensure that an ID, name and manager status is attached');
    }

    const newTask = {
        employee_id: req.body.id,
        employee_name: req.body.name,
        is_manager: req.body.manager
    };
    employee.push(newEmp);
    res.send(employee);


})

app.post('/dataAnalytics/addTeam', (req, res) => { // add new team 

    if (req.body.id == undefined || req.body.name == undefined) {
        res.status(400).send('Ensure that an ID and team name is attached');
    }

    const newTeam = {
        team_id: req.body.id,
        team_name: req.body.name
    };
    teams.push(newTeam);
    res.send(teams);
})

app.post('/dataAnalytics/addTask', (req, res) => { // add new task

    if (req.body.id == undefined || req.body.project_id == undefined || req.body.name == undefined || req.body.hours == undefined || req.body.status == undefined || req.body.start == undefined || req.body.end == undefined) {
        res.status(400).send('Ensure that all relevant information is provided');
    }

    const newTask = {
        task_id: req.body.id,
        project_id: req.body.project_id,
        task_name: req.body.name,
        manhours: req.body.hours,
        task_status: req.body.status,
        start_date: req.body.start,
        end_date: req.body.end
    };
    tasks.push(newTask);
    res.send(tasks);
} )

app.use(express.json());
app.use("",dataAnalyticsRouter);


// Dynamic port (3000 by default) --> use `export PORT = {portNo}` to change 
const PORT = process.env.PORT || 3000;      
app.listen(PORT, () => console.log(`server is now listening on port ${PORT}`));