const express = require('express');


const app = express();

app.use(express.json());        // MIDDLEWARE

// For testing purposes 

const users = [
    {id : 1, name : 'Jake'},
    {id : 2, name : 'Aidan'},
    {id : 3, name : 'Max'},
]

const membership = [
    {user : 1, group : 1},
    {user : 2, group : 1},
    {user : 3, group : 1},
    {user : 1, group : 2},
    {user : 2, group : 2},
    {user : 3, group : 3},
]

const groups = [
    {id : 1, name : 'Group1'},
    {id : 2, name : 'Group2'},
    {id : 3, name : 'Group3'},
]

const groupMessages = [
    {id : 1, group : 1, sender : 1, contents : 'Test 1'},
    {id : 2, group : 2, sender : 2, contents : 'Test 2'},
    {id : 3, group : 3, sender : 3, contents : 'Test 3'},
    {id : 4, group : 1, sender : 1, contents : 'Test 4'},
    {id : 5, group : 2, sender : 1, contents : 'Test 5'},

]

const privateMessages = [
    {id : 1, sender : 1, reciever : 2, contents : 'Test private 1'},
    {id : 2, sender : 1, reciever : 3, contents : 'Test private 2'},
    {id : 3, sender : 2, reciever : 1, contents : 'Test private 3'},
    {id : 4, sender : 2, reciever : 3, contents : 'Test private 4'},
    {id : 5, sender : 3, reciever : 1, contents : 'Test private 5'},
]

// One for /textChat and one for /dataAnalytics ?
app.get('/textChat', (req, res) => {
    res.send("Welcome to text chat !");
});


// Get all private messages
app.get('/textChat/private', (req, res) => {
    res.send(privateMessages);
});

// Get all groups 
app.get('/textChat/groups', (req, res) => {
    res.send(groups);
});

// Get messages from groups
app.get('/textChat/groupMessages', (req, res) => {
    res.send(groupMessages);
});

// Get all private messages to {Name}
app.get('/textChat/private/:reciever', (req, res) => {
    const privateMessage = privateMessages.filter(c => c.reciever === parseInt(req.params.reciever));
    if (!privateMessage) res.status(404).send(`Could not find any messages to '${req.params.reciever}'`); // 404 NOT FOUND
    res.send(privateMessage);
});

// Get all private messages to {Name} from {Name}
app.get('/textChat/private/:sender/:reciever', (req, res) => {
    const privateMessage = privateMessages.filter(c => c.sender === parseInt(req.params.sender) && c.reciever === parseInt(req.params.reciever));
    if (!privateMessage) res.status(404).send(`Could not find any messages to '${req.params.sender}' from '${req.params.reciever}'`); // 404 NOT FOUND
    res.send(privateMessage);
});


// Get group chat messages
app.get('/textChat/groupMessages/:group', (req, res) => {
    const groupMessage = groupMessages.filter(c => c.group === parseInt(req.params.group));
    if (!groupMessage) res.status(404).send(`Could not find group chat '${req.params.group}'`); // 404 NOT FOUND
    res.send(groupMessage);
});

// Get group chat names 
app.get('/textChat/groups/:id', (req, res) => {
    const group = groups.find(c => c.id === parseInt(req.params.id));
    if (!group) res.status(404).send(`Could not find group chat '${req.params.id}'`); // 404 NOT FOUND
    res.send(group.name);
});

// Make new message
// Use chrome extension 'Postman' to test 
app.post('/textChat/private', (req, res) => {
    if (!req.body.reciever || !req.body.sender || !req.body.contents) {
        //404 
        res.status(400).send('Ensure that "reciever", "sender" and "contents" are added');
    }

    const privateMessage = {
        id: privateMessages.length + 1,
        sender: req.body.sender,
        reciever: req.body.reciever,
        contents: req.body.contents
    };

    privateMessages.push(privateMessage);
    res.send(privateMessage);
});

// Make new group message
app.post('/textChat/groupMessages', (req, res) => {
    if (!req.body.group || !req.body.sender || !req.body.contents) {
        //404 
        res.status(400).send('Ensure that "group", "sender" and "contents" are added');
    }

    const groupMessage = {
        id: groupMessages.length + 1,
        group : req.body.group,
        sender : req.body.sender,
        contents : req.body.contents
    };

    groupMessages.push(groupMessage);
    res.send(groupMessage);
});



// Deleting private messages based of ID

app.delete('/textChat/private/:id', (req,res) => {
    const privateMessage = privateMessages.find(c => c.id === parseInt(req.params.id));
    if (!privateMessage) res.status(404).send(`Could not find any messages with ID - '${req.params.id}'`); // 404 NOT FOUND

    const index = privateMessages.indexOf(privateMessage);
    privateMessages.splice(index,1);
    res.send(privateMessage);
});

// Delete Group chat message 
app.delete('/textChat/groupMessages/:id', (req,res) => {
    const groupMessage = groupMessages.find(c => c.id === parseInt(req.params.id));
    if (!groupMessage) res.status(404).send(`Could not find any messages with ID - '${req.params.id}'`); // 404 NOT FOUND

    const index = groupMessages.indexOf(groupMessage);
    groupMessages.splice(index,1);
    res.send(groupMessage);
});







// Dynamic port (3000 by default) --> use `export PORT = {portNo}` to change 
const PORT = process.env.PORT || 3000;      
app.listen(PORT, () => console.log(`server is now listening on port ${PORT}`));