const { text } = require('express');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const textChat = require('../services/textChat');



// GET

// Get Group messages for user with user id - :id eg - `localhost:3000/textChat/groupMessages/1` will return all messages associated with user 1
router.get('/groupMessages/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getGroupMessages(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting messages `, err.message);
    next(err);
  }
});


// Returns all the groups that user :id is in 

router.get('/membership/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getMembership(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting membership `, err.message);
    next(err);
  }
});

// returns all the private messages that a user (:id) has

router.get('/privateMessages/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getPrivateMessages(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting messages `, err.message);
    next(err);
  }
});

// returns all group info `localhost:3000/textChat/groups`

router.get('/groups', async function(req, res, next) {
  try {
    res.json(await textChat.getAllGroups());
  } catch (err) {
    console.error(`Error while getting groups `, err.message);
    next(err);
  }
});


// returns all users in group :id

router.get('/groups/users/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getGroupMembership(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting groups `, err.message);
    next(err);
  }
});

// returns all info associated with group :id user is in

router.get('/groups/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getGroups(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting groups `, err.message);
    next(err);
  }
});

// Returns all private groups info

router.get('/private', async function(req, res, next) {
  try {
    res.json(await textChat.getAllPrivate());
  } catch (err) {
    console.error(`Error while getting pms`, err.message);
    next(err);
  }
});


// Returns info to do with private group associated with user :id

router.get('/private/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getPrivate(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting private messages `, err.message);
    next(err);
  }
});

// Returns all private messages

router.get('/privateMessages', async function(req, res, next) {
  try {
    res.json(await textChat.getAllPrivateMessages());
  } catch (err) {
    console.error(`Error while getting private messages`, err.message);
    next(err);
  }
});

// returns info on all users

router.get('/users', async function(req, res, next) {
  try {
    res.json(await textChat.getAllUsers());
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

// Returns info to do with user with :id 

router.get('/users/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getUser(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});


// POST


// Adds new user --> so in body add something like {name: "frank", password: "test"}
router.post('/users', async function(req, res, next) {
  
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    res.json(await textChat.createUser(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

// Adds new message --> body = {Contents: "hello", Group_idGroup: 1, Sender: 2}

router.post('/messages', async function(req, res, next) {

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
});


// Adds membership --> body = {userId: 1, groupId: 2}
router.post('/membership', async function(req, res, next) {

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
});

// adds new group  --> body = {Name: "Group1"}        !! Note I was having some issues with this so let me know if it is working for you (same for /private)

router.post('/groups', async function(req, res, next) {

  const { error } = validateGroup(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    res.json(await textChat.createGroup(req.body));
  } catch (err) {
    console.error(`Error while creating group`, err.message);
    next(err);
  }
});

// same as above
router.post('/private', async function(req, res, next) {

  const { error } = validateGroup(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    res.json(await textChat.createPrivate(req.body));
  } catch (err) {
    console.error(`Error while creating private group`, err.message);
    next(err);
  }
});


// DELETE


// delete message with :id
router.delete('/messages/:id', async function(req, res, next) {
  try {
    res.json(await textChat.removeMessage(req.params.id));
  } catch (err) {
    console.error(`Error while deleting message`, err.message);
    next(err);
  }
});


// delete membership --> body = {userId: 1, groupId: 2}
router.delete('/membership', async function(req, res, next) {
  try {
    res.json(await textChat.removeMembership(req.body));
  } catch (err) {
    console.error(`Error while deleting membership`, err.message);
    next(err);
  }
});


// delete user :id
router.delete('/users/:id', async function(req, res, next) {
  try {
    res.json(await textChat.removeUser(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

// delete group :id

router.delete('/groups/:id', async function(req, res, next) {
  try {
    res.json(await textChat.removeGroup(req.params.id));
  } catch (err) {
    console.error(`Error while deleting group`, err.message);
    next(err);
  }
});



// PUT

// add bodys for PUT will have the same format as their POST counterpart

// modify user with :id + body
router.put('/users/:id', async function(req, res, next) {
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
});

// modify group with :id + body

router.put('/groups/:id', async function(req, res, next) {
  
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
});

// modify message with :id + body

router.put('/messages/:id', async function(req, res, next) {
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
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
    .regex(/^[a-zA-Z]*$/, 'Characters only')
    .min(3)
    .max(30)
    .required(),

    password: Joi.string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'8 Characters long, atleast - 1 capital letter, 1 lowercase, 1 special char, 1 number')
    .required()
  };

  return Joi.validate(user,schema)
}

function validateMessage(message) {
  const schema = {
    Contents: Joi.string()
    .min(1)
    .max(140)
    .required(),

    Group_idGroup: Joi.number()
    .required(),

    Sender: Joi.number()
    .required(),
  };

  return Joi.validate(message,schema);
}

function validateMembership(membership) {
  const schema = {
    userId: Joi.number()
    .required(),

    groupId: Joi.number()
    .required(),

  };
  return Joi.validate(membership.body,schema);
}

function validateGroup(group) {
  const schema = {
    Name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  };
  return Joi.validate(group,schema);
}

module.exports = router;