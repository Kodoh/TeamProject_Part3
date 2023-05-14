const { text } = require('express');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
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

router.get('/dataAnalytics/projects', async function (req,res,next){
    try{
        res.json(await dataAnalytics.projects());

    }catch (err){
        console.error(err.message);
        next(err);
    }
})


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

    const{error} = validateEmployee(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        res.json(await dataAnalytics.addEmployee(req.body));
    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.post('/dataAnalytics/addTeam', async function(req, res, next){

    const{error} = validateTeam(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    try{
        res.json(await dataAnalytics.addTeam(req.body));
    } catch(err){
        console.error(err.message);
        next(err);
    }
});

router.post('/dataAnalytics/addTask', async function(req, res, next){

    const{error} = validateTask(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    try{
        res.json(await dataAnalytics.addTask(req.body));
    } catch(err){
        console.error(err.message);
        next(err);
    }
});


router.post('/dataAnalytics/addProject', async function(req,res,next){

    const{error} = validateProject(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        res.json(await dataAnalytics.addProject(req.body));

    }catch(err){
        console.error(err.message);
        next(err);
    }
});

router.post('/dataAnalytics/assignEmpToTask', async function(req, res,next){

    const{error} = validateEmpTask(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        res.json(await dataAnalytics.assignEmpToTask(req.body));
    } catch (err){
        console.error(err.message);
        next(err);
    }
});

router.post('/dataAnalytics/assignEmpToTeam', async function(req, res,next){
    const{error} = validateTeamEmp(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        res.json(await dataAnalytics.assignEmpToTeam(req.body));
    } catch (err){
        console.error(err.message);
        next(err);
    }
});

router.post('/dataAnalytics/assignTaskToTeam', async function(req, res,next){

    const{error} = validateTeamTask(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    try{
        res.json(await dataAnalytics.assignTaskToTeam(req.body));
    } catch (err){
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

router.get('/dataAnalytics/projectNames/:id', async function (req,res,next){
    try{
        res.json(await dataAnalytics.projectNames(req.params.id));

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

    const{error} = validateHours(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    try{
        res.json(await dataAnalytics.updateCompletedHours(req.params.id,req.body));

    } catch(err){
        console.error(`Error while updating task`, err.message);
        next(err);
    }
});

router.put('/dataAnalytics/updateTotalHours/:id', async function(req,res,next){

    const{error} = validateHours(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    try{
        res.json(await dataAnalytics.updateTotalHours(req.params.id,req.body));

    } catch(err){
        console.error(`Error while updating task`, err.message);
        next(err);
    }
});

router.put('/dataAnalytics/updateDueDate/:id', async function(req,res,next){
    const{error} = validateDate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
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



function validateEmployee(employee){

    const schema = Joi.object({
        id: Joi.number()
        .required(),

        name: Joi.string()
        .regex(/^[a-zA-Z ]*$/, 'Letters only')
        .required(),

        email: Joi.string().email().required(),

        joindate: Joi.date().required(),

        role: Joi.string().required(),




    });
    return schema.validate(employee);

}

function validateTeam(team){
    const schema = Joi.object({
        id: Joi.number().required(),

        name: Joi.string().required(),
    });

    return schema.validate(team);
}

function validateTask(task){

    const schema = Joi.object({

        id: Joi.number().required(),

        project_id: Joi.number().required(),

        name: Joi.string().required(),

        hoursCompleted: Joi.number().required(),

        totalHours: Joi.number().required(),

        status: Joi.string().alphanum().required(),

        start: Joi.date().required(),

        end: Joi.date().required(),
    });

    return schema.validate(task);
}


function validateHours(input){
    const schema = Joi.object({
        hours : Joi.number().required(),
    });

    return schema.validate(input);
}

function validateDate(input){
    const schema = Joi.object({
        date: Joi.date().required(),
    });

    return schema.validate(input);
}

function validateTeamTask(input){
    const schema = Joi.object({
        taskId: Joi.number().required(),
        teamId: Joi.number().required(),
    });

    return schema.validate(input);
}

function validateTeamEmp(input){
    const schema = Joi.object({
        empId: Joi.number().required(),
        teamId: Joi.number().required(),
    });

    return schema.validate(input);
}

function validateEmpTask(input){
    const schema = Joi.object({
        empId: Joi.number().required(),
        taskId: Joi.number().required(),
    });

    return schema.validate(input);
}

function validateProject(input){
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().alphanum().required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
        status: Joi.string.alphanum().required(),
    });

    return schema.validate(input);
}






module.exports =router;