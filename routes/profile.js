const express = require("express");
const router = express.Router();

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json'); // adjust the path accordingly

const sequelize = new Sequelize(config.development);


// dashboard

//profile



module.exports = router;