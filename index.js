const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();


const { Sequelize } = require('sequelize');
const config = require('./config/config.json'); // adjust the path accordingly

const sequelize = new Sequelize(config.development);

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Sync the database (this creates the table if it doesn't exist)
(async () => {
    try {
        await sequelize.sync({ force: true }); // set force to false in production to avoid data loss
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
})();


app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//importing db-connection query
// const pool = require("./models/dbCon");
// pool
//     .connect()
//     .then((row) => {
//         console.log("db is connected :", row._connected);
//     })
//     .catch((err) => {
//         throw err;
//     });

//for cors error
const cors = require("cors");
const corsOptions = {
    origin: "*",

    credentials: true,

    methods: ["GET", "POST"],

    allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"],
};

app.use(cors({ origin: "*" }));

const auths = require("./routes/auth");
// const profiles = require("./routes/profile");
app.use("/auth", auths);
// app.use("/profile", profiles);
app.listen(8081);