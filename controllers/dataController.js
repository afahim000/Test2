const model = require('../models/modified model');
const path = require('path');
const multer = require('multer');
const { body, validationResult } = require("express-validator");

const images = multer.diskStorage({
	destination: './dev-data/img',
	filename: function (req, file, callback) {
		callback(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname));
	}
});


const imgUpload = multer({
	storage: images
}).single('myImage');

//const vidUpload;
//const audioUpload;
exports.getOptions = (req, res) => {
	res.status(200).render('buttons', { title: 'buttons' });
};

exports.queryOptionsGet = (req, res) => {
	res.send("Not Implemented yet");
};

exports.deleteGet = (req, res) => {
	res.send("Not Implemented yet");
};


exports.addDataGet = (req, res) => 
{
	
	res.status(200).render('tester', { title: 'tester' });
};

exports.queryOptionsPost = (req, res) => {
	res.send("Not Implemented yet");
};

exports.addDataPost = (req, res) => {

body("fname", "First name required")
	.trim().isLength({ min: 1 }).escape()

	imgUpload(req, res, (err) => {
		if (err) {
			res.render('tester');
			res.send('MEOWWWW!!!!');
		}
		else {
			console.log(req.file);
			res.send('test');

		}
	})
};
exports.deletePost = (req, res) => {
	res.send("Not Implemented yet");
};

