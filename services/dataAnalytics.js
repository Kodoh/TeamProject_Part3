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

async function projects(){
    const rows = await database.query(
        `SELECT * FROM \`project\`;`
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
        `SELECT * FROM \`task\` WHERE task_id IN (SELECT task_id FROM task_employee WHERE employee_id = ${req}) `
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
        (employee_id, employee_name, email, joindate, role)
        VALUES
        ('${req.id}', '${req.name}', '${req.email}', '${req.joindate}', '${req.role}' )`
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
        (task_id, project_id, task_name, hoursCompleted, totalManhours, task_status, start_date, end_date)
        VALUES
        ('${req.id}', '${req.project_id}', '${req.name}', '${req.hoursCompleted}', '${req.totalHours}', '${req.status}', '${req.start}', '${req.end}' )`
    );

    let message = 'Error adding task';

    if(result.affectedRows){
        message = 'task added succesfully';
    }

    return {message};
}

async function taskCompletion(req){
    const result = await database.query(
        `SELECT hoursCompleted/totalManhours AS percentage FROM task WHERE task_id = ${req}`
    );

    const data = formatEmpty(result);
    return{
        data
    }
}

async function projectCompletion(req){
    const result = await database.query(
        `SELECT sum(hoursCompleted)/sum(totalManhours) AS percentage FROM task WHERE project_id IN (SELECT DISTINCT project_id FROM task WHERE task_id IN (SELECT task_id FROM task_employee WHERE employee_id = ${req})) ;`
    );
    const data = formatEmpty(result);
    return{
        data
    }
}

async function employeeCompletion(req){
    const result = await database.query(
        `SELECT sum(task.hoursCompleted)/sum(task.totalManhours) AS percentage FROM task INNER JOIN task_employee ON task_employee.task_id = task.task_id WHERE task_employee.employee_id = ${req}`
    );
    const data = formatEmpty(result);
    return{
        data
    }
}


async function teamCompletion(req){
    const result = await database.query(
        `SELECT sum(task.hoursCompleted)/sum(task.totalManhours) AS percentage FROM task  INNER JOIN task_team ON task_team.task_id = task.task_id WHERE task_team.team_id = ${req}`
    );
    const data = formatEmpty(result);
    return{
        data
    }
}


async function updateCompletedHours(id, body){
    const result = await database.query(
        `UPDATE task SET hoursCompleted = ${body.hours} WHERE task_id = ${id}`
    );

    let message = `Error updating hours completed`;

    if(result.affectedRows){
        message = `Hours completed successfully added`;

    }
    return{message}
}

async function updateTotalHours(id,body){
    const result = await database.query(
        `UPDATE task SET totalManhours = ${body.hours} WHERE task_id = ${id}`
    );
    let message = `Error updating total hours`;
    if(result.affectedRows){
        message = `Total hours successfully updated`;
    }
    return{message}
}

async function updateDueDate(id,body){
    const result = await database.query(
        `UPDATE task SET end_date = ${body.date} WHERE task_id = ${id}`
    );
    let message = `Error updating task due date`;
    if(result.affectedRows){
        message = `Due date successfully updated`;
    }
    return{message}
}

async function daysRemaining(req){

    const result = await database.query(
        `SELECT DATEDIFF(end_date,CURDATE()) FROM task WHERE task_id = ${req}`
    );
  
    
    const data = formatEmpty(result);
    return{
        data
    }
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
    addTeam,
    taskCompletion,
    projectCompletion,
    employeeCompletion,
    teamCompletion,
    updateCompletedHours,
    updateTotalHours,
    updateDueDate,
    daysRemaining,
    projects
}