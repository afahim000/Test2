const express = require('express');
const router = express.Router();
const model = require('../models/modified model');
const dataController = require('../controllers/dataController');
const { body, validationResult} = require("express-validator");

//the get function here should call a function in the data controller file that renders options to add, retrieve and delete 
//options

// This calls the function that renders this page '/data'
router.get('/', dataController.getOptions);

//relevent get and post functions that will handle queries, adding and deleting from the database

router.get('/search', dataController.queryOptionsGet);

router.get('/add', dataController.addDataGet);

router.get('/delete', dataController.deleteGet);

router.post('/search',dataController.queryOptionsPost);

router.post('/add', dataController.addDataPost);

router.post('/delete', dataController.deletePost);


module.exports = router;