const express = require("express");
const router = express.Router();

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json'); // adjust the path accordingly

const sequelize = new Sequelize(config.development);

const { generateToken, verifyToken } = require('../middleware/security');



const bcrypt = require("bcrypt");

// router.post("/test", verifyToken , (req,res)=>{})

// signup
router.post("/signup", async (req, res) => {
    try {
        const { username, password, type, dept, location } = req.body;

        // Check if the email is already taken
        const existingUser = await sequelize.query(
            'SELECT * FROM public.users WHERE username = :username',
            {
                replacements: { username }, // Replace with the actual username you are searching for
            })

        console.log()
        if (existingUser[1].rowCount) {
            return res.status(400).json({ message: 'Email already in use. Please choose another email.' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        sequelize.query('INSERT INTO public.users (username, pwd, "user-type", department, location) VALUES (:username, :password, :type, :dept,:location)', {
            replacements: { username, password: hashedPassword, type, dept, location },
            type: sequelize.QueryTypes.INSERT,
        })

        res.status(201).json({ message: 'User created successfully', token: generateToken({ username }) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


// login
router.post("/login", verifyToken, (req, res) => { })











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