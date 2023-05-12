const express = require('express');
const app = express();
app.use(express.json());
const server = require('http').createServer(app);
const textChat = require('./textChat/textChat');
const Joi = require('joi');
const cors = require('cors')




function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string()
            .regex(/^[a-zA-Z]*$/, 'Characters only')
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, '8 Characters long, atleast - 1 capital letter, 1 lowercase, 1 special char, 1 number')
            .required()
    });

    return schema.validate(user)
}

function validateMessage(message) {
    const schema = Joi.object({
        Contents: Joi.string()
            .min(1)
            .max(140)
            .required(),

        Group_idGroup: Joi.number()
            .required(),

        Sender: Joi.number()
            .required(),
    });

    return schema.validate(message);
}

function validateMembership(membership) {
    const schema = Joi.object({
        userId: Joi.number()
            .required(),

        groupId: Joi.number()
            .required(),

    });
    return schema.validate(membership.body);
}

function validateGroup(group) {
    const schema = Joi.object({
        Name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    });
    return schema.validate(group);
}

// GET

// Get Group messages for user with user id - :id eg - `localhost:3000/textChat/groupMessages/1` will return all messages associated with user 1
app.get('/groupMessages/:id', async function (req, res, next) {
    try {
        res.json(await textChat.getGroupMessages(1, req.params.id));
        res.end();
    } catch (err) {
        console.error(`Error while getting messages `, err.message);
        next(err);
    }
});


// Returns all the groups that user :id is in 

app.get('/membership/:id', async function (req, res, next) {
    try {
        res.status(200);
        res.json(await textChat.getMembership(1, req.params.id));
        res.end();
    } catch (err) {
        console.error(`Error while getting membership `, err.message);
        next(err);
    }
});

// returns all the private messages that a user (:id) has

app.get('/privateMessages/:id', async function (req, res, next) {
    try {
        res.json(await textChat.getPrivateMessages(1, req.params.id));
        res.end();
    } catch (err) {
        console.error(`Error while getting messages `, err.message);
        next(err);
    }
});

// returns all group info `localhost:3000/textChat/groups`

app.get('/groups', async function (req, res, next) {
    try {
        res.json(await textChat.getAllGroups());
        res.status(200)
        res.end();
    } catch (err) {
        console.error(`Error while getting groups `, err.message);
        next(err);
    }
});

// Returns groups the user with :id is associated with

app.get('/users/:id/groups', async function (req, res, next) {
    try {
        res.status(200).json(await textChat.getGroups(1, req.params.id)).end();
    } catch (err) {
        console.error(`Error while getting groups `, err.message);
        next(err);
    }
});

// Returns info on group with :id

app.get('/groups/:id', async function (req, res, next) {
    try {
        res.status(200).json(await textChat.getGroupInfo(1, req.params.id)).end();
    } catch (err) {
        console.error(`Error while getting groups `, err.message);
        next(err);
    }
});

// returns all messages and sender info for group :id

app.get('/groups/:id/messages', async function (req, res, next) {
    try {
        res.status(200).json(await textChat.getMessagesForGroup(1, req.params.id))
        res.end();
    } catch (err) {
        console.error(`Error while getting groups `, err.message);
        next(err);
    }
});

// returns all users for group :id

app.get('/groups/:id/users', async function (req, res, next) {
    try {
        res.status(200).json(await textChat.getUsersForGroup(1, req.params.id))
        res.end();
    } catch (err) {
        console.error(`Error while getting groups `, err.message);
        next(err);
    }
});

// Returns all private groups info

app.get('/private', async function (req, res, next) {
    try {
        res.json(await textChat.getAllPrivate());
        res.status(200)
        res.end();
    } catch (err) {
        console.error(`Error while getting pms`, err.message);
        next(err);
    }
});


// Returns all private chats user with :id is associated with

app.get('/users/:id/private', async function (req, res, next) {
    try {
        res.json(await textChat.getPrivate(1, req.params.id));
        res.status(200)
        res.end();
    } catch (err) {
        console.error(`Error while getting private messages `, err.message);
        next(err);
    }
});

// Returns all private messages

app.get('/privateMessages', async function (req, res, next) {
    try {
        res.json(await textChat.getAllPrivateMessages());
        res.end();
    } catch (err) {
        console.error(`Error while getting private messages`, err.message);
        next(err);
    }
});

// returns info on all users

app.get('/users', async function (req, res, next) {
    try {
        res.json(await textChat.getAllUsers());
        res.end();
    } catch (err) {
        console.error(`Error while getting users`, err.message);
        next(err);
    }
});

// Returns info to do with user with :id 

app.get('/users/:id', async function (req, res, next) {
    try {
        res.json(await textChat.getUser(1, req.params.id));
        res.end();
    } catch (err) {
        console.error(`Error while getting users`, err.message);
        next(err);
    }
});


// POST

// Adds new user --> so in body add something like {name: "frank", password: "test"}
app.post('/users', async function (req, res, next) {

    const { error } = validateUser(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        res.json(await textChat.createUser(req.body));
        res.end();
    } catch (err) {
        console.error(`Error while creating user`, err.message);
        next(err);
    }
});

app.post('/users/login', async function (req, res, next) {
    try {
        res.json(await textChat.getUserByEmail(1, req.body));
        res.end();
    } catch (err) {
        console.error(`Error while creating message`, err.message);
        next(err);
    }
});

// Adds new message --> body = {Contents: "hello", Group_idGroup: 1, Sender: 2}

app.post('/messages', async function (req, res, next) {

    const { error } = validateMessage(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        res.json(await textChat.createMessage(req.body));
    } catch (err) {
        console.error(`Error while creating messages`, err.message);
        next(err);
    }
    res.end();
});


// Adds membership --> body = {userId: 1, groupId: 2}
app.post('/membership', async function (req, res, next) {
    const { error } = validateMembership(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        res.json(await textChat.createMembership(req.body));
    } catch (err) {
        console.error(`Error while creating membership`, err.message);
        next(err);
    }
    res.end();
});

// adds new group  --> body = {Name: "Group1"}        !! Note I was having some issues with this so let me know if it is working for you (same for /private)

app.post('/groups', async function (req, res, next) {

    const { error } = validateGroup(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        res.status(200).json(await textChat.createGroup(req.body));
    } catch (err) {
        console.error(`Error while creating group`, err.message);
        next(err);
    }
    res.end();
});

// same as above
app.post('/private', async function (req, res, next) {
    const { error } = validateGroup(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        res.status(200)
        res.json(await textChat.createPrivate(req.body));
    } catch (err) {
        console.error(`Error while creating private group`, err.message);
        next(err);
    }
    res.end();
});


// DELETE

// delete message with :id
app.delete('/messages/:id', async function (req, res, next) {
    try {
        res.json(await textChat.removeMessage(req.params.id));

    } catch (err) {
        console.error(`Error while deleting message`, err.message);
        next(err);
    }
    res.end();
});


// delete membership --> body = {userId: 1, groupId: 2}
app.delete('/membership', async function (req, res, next) {
    try {
        res.json(await textChat.removeMembership(req.body));
    } catch (err) {
        console.error(`Error while deleting membership`, err.message);
        next(err);
    }
    res.end();
});


// delete user :id
app.delete('/users/:id', async function (req, res, next) {
    try {
        res.json(await textChat.removeUser(req.params.id));
    } catch (err) {
        console.error(`Error while deleting user`, err.message);
        next(err);
    }
    res.end();
});

// delete group :id

app.delete('/groups/:id', async function (req, res, next) {
    try {
        res.json(await textChat.removeGroup(req.params.id));
        res.status(200)
    } catch (err) {
        console.error(`Error while deleting group`, err.message);
        next(err);
    }
    res.end();
});

// PUT

// add bodys for PUT will have the same format as their POST counterpart

// modify user with :id + body
app.put('/users/:id', async function (req, res, next) {
    const { error } = validateUser(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        res.json(await textChat.updateUser(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating user`, err.message);
        next(err);
    }
    res.end();
});

// modify group with :id + body

app.put('/groups/:id', async function (req, res, next) {

    const { error } = validateGroup(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        res.json(await textChat.updateGroup(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating group`, err.message);
        next(err);
    }
    res.end();
});

// modify message with :id + body

app.put('/messages/:id', async function (req, res, next) {
    const { error } = validateMessage(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    try {
        res.json(await textChat.updateMessage(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating message`, err.message);
        next(err);
    }
    res.end();
});

server.listen(5000, () => { console.log("Server started on port 5000") });