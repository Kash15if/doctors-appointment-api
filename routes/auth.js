const express = require("express");
const router = express.Router();

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json'); // adjust the path accordingly

const sequelize = new Sequelize(config.development);




// const bcrypt = require("bcrypt");

router.get("/test", async (req, res) => {

    try {
        // Use Sequelize's query method to execute a raw SQL query
        const [results, metadata] = await sequelize.query('SELECT uid, username, "user-type", department, location FROM public.users');

        // Log the retrieved data
        console.log(results);

        // Close the Sequelize connection
        await sequelize.close();

        res.send(results)
    } catch (error) {
        console.error('Error executing the query:', error);
    }

})

module.exports = router;