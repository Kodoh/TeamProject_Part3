const { text } = require('express');
const express = require('express');
const router = express.Router();
const dataAnalytics = require('../services/dataAnalytics');


router.get('/dataAnalytics/tasks', async function(req ,res, next){
    try{
        res.json(await dataAnalytics.tasks());

    } catch(err){
        console.error(err.message);
        next(err);
    }
});


router.get('/dataAnalytics/task/:id', async function(req ,res, next){
    try{
        res.json(await dataAnalytics.task(req.params.id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/employee/:employee_id', async function(req ,res, next){
    try{
        res.json(await dataAnalytics.employee(req.params.employee_id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/employees', async function(req ,res, next){
    try{
        res.json(await dataAnalytics.employees());

    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/teams', async function(req, res, next){
    try{
        res.json(await dataAnalytics.teams());

    } catch(err){
        console.error(err.message);
        next(err);
    }
});


router.get('/dataAnalytics/team/:id', async function(req, res, next){
    try{
        res.json(await dataAnalytics.team(req.params.id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});


router.get('/dataAnalytics/teamTasks/:id', async function(req, res, next){
    try{
        res.json(await dataAnalytics.teamTasks(req.params.id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/employeeTasks/:id', async function(req, res, next){
    try{
        res.json(await dataAnalytics.employeeTasks(req.params.id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/teamEmployees/:id', async function(req, res, next){
    try{
        res.json(await dataAnalytics.teamEmployees(req.params.id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});


router.post('/dataAnalytics/addEmployee', async function(req, res, next){
    try{
        res.json(await dataAnalytics.addEmployee(req.body));
    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.post('/dataAnalytics/addTeam', async function(req, res, next){
    try{
        res.json(await dataAnalytics.addTeam(req.body));
    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.post('/dataAnalytics/addTask', async function(req, res, next){
    try{
        res.json(await dataAnalytics.addTask(req.body));
    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/taskCompletion/:id', async function(req, res, next){
    try{
        res.json(await dataAnalytics.taskCompletion(req.params.id));
    } catch (err){
        console.error(err.message);
        next(err);
    }
});


router.get('/dataAnalytics/projectCompletion/:id', async function(req,res,next){
    try{
        res.json(await dataAnalytics.projectCompletion(req.params.id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/employeeCompletion/:id', async function(req,res,next){
    try{
        res.json(await dataAnalytics.employeeCompletion(req.params.id));
    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.get('/dataAnalytics/teamCompletion/:id', async function(req,res,next){
    try{
        res.json(await dataAnalytics.teamCompletion(req.params.id));

    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.put('/dataAnalytics/updateCompletedHours/:id', async function(req,res,next){
    try{
        res.json(await dataAnalytics.updateCompletedHours(req.params.id,req.body));

    } catch(err){
        console.error(`Error while updating task`, err.message);
        next(err);
    }
});

router.put('/dataAnalytics/updateTotalHours/:id', async function(req,res,next){
    try{
        res.json(await dataAnalytics.updateTotalHours(req.params.id,req.body));

    } catch(err){
        console.error(`Error while updating task`, err.message);
        next(err);
    }
});

router.put('/dataAnalytics/updateDueDate/:id', async function(req,res,next){
    try{
        res.json(await dataAnalytics.updateDueDate(req.params.id, req.body));

    }catch(err){
        console.error(`Error updating task date`, err.message);
        next(err);
    }
});

router.get('/dataAnalytics/daysRemaining/:id', async function(req,res,next){
    try{
        res.json(await dataAnalytics.daysRemaining(req.params.id));
    }catch(err){
        console.error(`Error getting time remaining`, err.message);
        next(err);
    }
});







module.exports =router;