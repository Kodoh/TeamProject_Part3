const database = require('./connection');
const config = require('../database');

function formatEmpty(rows){
    if(!rows){
        return [];

    }
    return rows;
}

async function tasks(){
    const rows = await database.query(
        `SELECT * FROM \`task\`;`
    );

    const data = formatEmpty(rows);

    return {
        data
    }
}


async function task(req){

    const rows = await database.query(
        `SELECT * FROM \`task\` WHERE task_id = ${req}`
    );

    const data = formatEmpty(rows);
    return {
        data
    }
    
}

async function employee(req){

    const rows = await database.query(
        `SELECT * FROM \`employee\` WHERE employee_id = ${req}`
    );
    const data = formatEmpty(rows);
    return{
        data
    }
}


async function employees(){
    const rows = await database.query(
        `SELECT * FROM \`employee\`;`
    );

    const data = formatEmpty(rows);
    return{
        data
    }
}

async function teams(){
    const rows = await database.query(
        `SELECT * FROM \`team\`;`
    );
    const data = formatEmpty(rows);
    return {
        data
    }
}

async function team(req){
    const rows = await database.query(
        `SELECT * FROM \`team\` WHERE team_id = ${req}`
    );
    const data = formatEmpty(rows);
    return{
        data
    }
}


async function teamTasks(req){
    const rows = await database.query(
        `SELECT * FROM \`task_team\` WHERE team_id = ${req}`
    );
    const data = formatEmpty(rows);
    return{
        data
    }
}

async function employeeTasks(req){
    const rows = await database.query(
        `SELECT * FROM \`task_employee\` WHERE employee_id = ${req}`
    );
    const data = formatEmpty(rows);
    return{
        data
    }
}

async function teamEmployees(req){
    const rows = await database.query(
        `SELECT * FROM \`task_employee\` WHERE team_id = ${req}`
    );
    const data = formatEmpty(rows);
    return{
        data
    }
}

async function addEmployee(req){
    const result = await database.query(
        `INSERT INTO \`employee\`
        (employee_id, employee_name, isManager)
        VALUES
        ('${req.id}', '${req.name}', '${req.manager}' )`
    );

    let message = 'Error adding employee';

    if(result.affectedRows){
        message = 'employee added succesfully';
    }

    return {message};
}


async function addTeam(req){
    const result = await database.query(
        `INSERT INTO \`team\`
        (team_id, team_name)
        VALUES
        ('${req.id}', '${req.name}' )`
    );

    let message = 'Error adding team';

    if(result.affectedRows){
        message = 'team added succesfully';
    }

    return {message};
}

async function addTask(req){
    const result = await database.query(
        `INSERT INTO task
        (task_id, project_id, task_name, manhours, task_status, start_date, end_date)
        VALUES
        ('${req.id}', '${req.project_id}', '${req.name}', '${req.hours}', '${req.status}', '${req.start}', '${req.end}' )`
    );

    let message = 'Error adding task';

    if(result.affectedRows){
        message = 'task added succesfully';
    }

    return {message};
}

module.exports ={
    tasks,
    task,
    employee,
    employees,
    teams,
    team,
    teamTasks,
    teamEmployees,
    employeeTasks,
    addEmployee,
    addTask,
    addTeam
}