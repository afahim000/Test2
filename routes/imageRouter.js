const express = require('express');
//import the controller for rendering the pages
const dataController = require('../controllers/dataController');

const router = express.Router();

// Root address. Authentication and Render Overview
//Routes HTTP GET requests to the specified path with the specified callback functions.
router.get('/', (req, res) => {
	res.status(200).render('image');
});

//Export the entire module
module.exports = router;