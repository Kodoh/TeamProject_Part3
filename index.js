const express = require('express');
const cors = require('cors');
const dataAnalyticsRouter = require("./routes/dataAnalytics");

const app = express();

app.use(cors()); 
app.use(express.json());
app.use("", dataAnalyticsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server and database now listening on port ${PORT}`));
