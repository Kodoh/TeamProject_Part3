const express = require('express');

//const mysql = require('mysql2');

const app = express();
const dataAnalyticsRouter = require("./routes/dataAnalytics");




app.use(express.json());
app.use("",dataAnalyticsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server and database now listening on port ${PORT}`));



