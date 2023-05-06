const express = require('express');
//import the controller for rendering the pages
const dataController = require('../controllers/dataController');
// Import the filesystem module
const fs = require('fs');

const router = express.Router();

// Collects the all files names stored in the directory ./dev-data/img
let images = [];
// Intent to read /img directory content - CIP
fs.readdirSync('./dev-data/img').forEach(file => {
	images.push(file);
});



// Root address. Authentication and Render Overview
//Routes HTTP GET requests to the specified path with the specified callback functions.
// Sends the array of images name to image.pug file
router.get('/', (req, res) => {
	// Create 4 lists dividing each image.
	let listOfColumns = [[], [], [], []];
	for (let i = 0; i < images.length; i++) {
		listOfColumns[i % 4].push(images[i]);
	}
	res.status(200).render('image', { data: images });
});

//Export the entire module
module.exports = router;
