const { text } = require('express');
const express = require('express');
const router = express.Router();
const textChat = require('../services/textChat');



// GET
router.get('/groupMessages/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getGroupMessages(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting messages `, err.message);
    next(err);
  }
});


router.get('/membership/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getMembership(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting membership `, err.message);
    next(err);
  }
});

router.get('/privateMessages/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getPrivateMessages(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting messages `, err.message);
    next(err);
  }
});


router.get('/groups', async function(req, res, next) {
  try {
    res.json(await textChat.getAllGroups());
  } catch (err) {
    console.error(`Error while getting groups `, err.message);
    next(err);
  }
});

router.get('/groups/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getGroups(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting groups `, err.message);
    next(err);
  }
});

router.get('/private', async function(req, res, next) {
  try {
    res.json(await textChat.getAllPrivate());
  } catch (err) {
    console.error(`Error while getting pms`, err.message);
    next(err);
  }
});


router.get('/private/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getAllPrivate());
  } catch (err) {
    console.error(`Error while getting private messages `, err.message);
    next(err);
  }
});



router.get('/privateMessages', async function(req, res, next) {
  try {
    res.json(await textChat.getAllPrivateMessages());
  } catch (err) {
    console.error(`Error while getting private messages`, err.message);
    next(err);
  }
});

router.get('/users', async function(req, res, next) {
  try {
    res.json(await textChat.getAllUsers());
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

router.get('/users/:id', async function(req, res, next) {
  try {
    res.json(await textChat.getUser(1,req.params.id));
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});


// POST

router.post('/users', async function(req, res, next) {
  try {
    res.json(await textChat.createUser(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

router.post('/messages', async function(req, res, next) {
  try {
    res.json(await textChat.createMessage(req.body));
  } catch (err) {
    console.error(`Error while creating messages`, err.message);
    next(err);
  }
});

router.post('/membership', async function(req, res, next) {
  try {
    res.json(await textChat.createMembership(req.body));
  } catch (err) {
    console.error(`Error while creating membership`, err.message);
    next(err);
  }
});

router.post('/groupMessages', async function(req, res, next) {
  try {
    res.json(await textChat.createGroup(req.body));
  } catch (err) {
    console.error(`Error while creating group message`, err.message);
    next(err);
  }
});


// DELETE

router.delete('/messages/:id', async function(req, res, next) {
  try {
    res.json(await textChat.removeMessage(req.params.id));
  } catch (err) {
    console.error(`Error while deleting message`, err.message);
    next(err);
  }
});

router.delete('/membership', async function(req, res, next) {
  try {
    res.json(await textChat.removeMembership(req.body));
  } catch (err) {
    console.error(`Error while deleting membership`, err.message);
    next(err);
  }
});

router.delete('/users/:id', async function(req, res, next) {
  try {
    res.json(await textChat.removeUser(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

router.delete('/groups/:id', async function(req, res, next) {
  try {
    res.json(await textChat.removeGroup(req.params.id));
  } catch (err) {
    console.error(`Error while deleting group`, err.message);
    next(err);
  }
});



// PUT

router.put('/users/:id', async function(req, res, next) {
  try {
    res.json(await textChat.updateUser(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

router.put('/groups/:id', async function(req, res, next) {
  try {
    res.json(await textChat.updateGroup(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating group`, err.message);
    next(err);
  }
});

router.put('/messages/:id', async function(req, res, next) {
  try {
    res.json(await textChat.updateMessage(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating message`, err.message);
    next(err);
  }
});



module.exports = router;