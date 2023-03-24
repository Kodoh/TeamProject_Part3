const express = require('express');
const app = express();
const textChatRouter = require("./routes/textChat");

app.use(express.json());       


// IDEA - we call routes in order to get the URI then use services in order to call the DB then return with our URI
// Index.js is then used as a root file (easier to follow)

app.use("/textChat", textChatRouter);

// Dynamic port (3000 by default) --> use `export PORT = {portNo}` to change 
const PORT = process.env.PORT || 3000;      
app.listen(PORT, () => console.log(`server and database is now listening on port ${PORT}`));