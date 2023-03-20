const express = require('express');


const app = express();

app.use(express.json());        // MIDDLEWARE

// For testing purposes 
const privateMessages = [
    {id: 1, to : 'Jake', from: 'Aiden', message: 'test number 1'},
    {id: 2, to : 'Aiden', from: 'Mike', message: 'test number 2'},
    {id: 3, to : 'Max', from: 'Jake', message: 'test number 3'},
]

// One for /textChat and one for /dataAnalytics ?
app.get('/textChat', (req, res) => {
    res.send("Welcome to text chat !");
});

// Get all private messages
app.get('/textChat/private', (req, res) => {
    res.send(privateMessages);
});


// Get all private messages to {Name}
app.get('/textChat/private/:to', (req, res) => {
    const privateMessage = privateMessages.find(c => c.to === req.params.to);
    if (!privateMessage) res.status(404).send(`Could not find any messages to '${req.params.to}'`); // 404 NOT FOUND
    res.send(privateMessage);
});

// Get all private messages to {Name} from {Name}
app.get('/textChat/private/:to/:from', (req, res) => {
    const privateMessage = privateMessages.find(c => c.from === req.params.from && c.to === req.params.to);
    if (!privateMessage) res.status(404).send(`Could not find any messages to '${req.params.to}' from '${req.params.from}'`); // 404 NOT FOUND
    res.send(privateMessage);
});

// Make new message
// Use chrome extension 'Postman' to test 
app.post('/textChat/private', (req, res) => {
    if (!req.body.to || !req.body.from || !req.body.message) {
        //404 
        res.status(400).send('Ensure that "to", "from" and "message" are added');
    }


    const privateMessage = {
        id: privateMessages.length + 1,
        to: req.body.to,
        from: req.body.from,
        message: req.body.message
    };
    privateMessages.push(privateMessage);
    res.send(privateMessage);
});


// To-do Will add PUT (to edit message) and DELETE (to del message) 


// Dynamic port (3000 by default) --> use `export PORT = {portNo}` to change 
const PORT = process.env.PORT || 3000;      
app.listen(PORT, () => console.log(`server is now listening on port ${PORT}`));