const express = require('express');
const petAPI = require('./routes/petRoute');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use((req, res, next) => {
    let allowedOrigins = ["http://localhost:4200"];

    let origin = req.headers.origin;

    // console.log(chalk.red.bgBlue.bold(origin: ${ origin }));

    if (allowedOrigins.includes(origin)) {
        // console.log(chalk.bgRed.white(origin includes, origin));
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token, authorization, apiKeyToken, responseType, content-type"
    );

    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    next();
});

petAPI(app);

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.HOST}:${process.env.PORT}/api`);

})