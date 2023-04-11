const express = require('express');
const animalSchema = require('../models/modified model');
const path = require('path');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const { check, validationResult } = require("express-validator");
const textOnly = multer();

const images = multer.diskStorage({

	destination: function (req, file, callback) {
		if (req.body.filetypes === 'images') {
			callback(null, './dev-data/img');
		}
		else if (req.body.filetypes === 'video') {
			callback(null, './dev-data/videos');
		}
		else {
			callback(null, './dev-data/audio');
		}
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname));
	}

});

const videos = multer.diskStorage({
	destination: './dev-data/videos',
	filename: function (req, file, callback) {
		callback(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname));
	}
});

const audio = multer.diskStorage({
	destination: './dev-data/audio',
	filename: function (req, file, callback) {
		callback(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname));
	}
});

const imgUpload = multer({
	storage: images
}).single('file');

const videoUpload = multer({
	storage: videos
}).single('file');

const audioUpload = multer({
	storage: audio
}).single('file');

//const vidUpload;
//const audioUpload;
exports.getOptions = (req, res) => {
	res.status(200).render('buttons', { title: 'buttons' });
};

exports.queryOptionsGet = (req, res) => {
	res.status(200).render('search', { title: 'Search' });
};

exports.deleteGet = (req, res) => {
	res.send("Not Implemented yet");
};


exports.addDataGet = (req, res) => {

	res.status(200).render('tester', { title: 'tester' });
};

exports.queryOptionsPost = (req, res) => {
	res.send("Not Implemented yet");
};

exports.addDataPost = (req, res) => {

	imgUpload(req, res, (err) => {
		if (err) {
			res.render('tester');
			res.send('MEOWWWW!!!!');
		}
		else {
			let fileLocation = req.file.destination;

			// Collecting address information and storing it in the arrAdd
			// const addressF = /^(\d* [a-zA-Z .]*), ([a-zA-Z ]*), ([A-Z]{2}) (\d{5})$/;
			// const arrAdd = req.body.address.match(addressF);

			// Creating date object
			// const startDate = new Date(`${req.body.sdate}T${req.body.stime}`);
			// const endDate = new Date(`${req.body.sdate}T${req.body.etime}`);

			// Creating a new data entry following the schema in the file 'models/modified model.js'
			const data = new animalSchema({

				animalName: req.body.animallist,
				recorder:
				{
					last: req.body.lname,
					first: req.body.fname
				},
				// date:
				// {
				// 	start: startDate,
				// 	end: endDate
				// },
				location:
				{
					//country: 'USA',
					//state: arrAdd[3],
					//city: arrAdd[2],
					//street: arrAdd[1],
					//zipcode: arrAdd[4],
					latitude: req.body.latitude,
					longitude: req.body.longitude

				},
				mediaType: req.body.filetypes,
				fileDirectory: `.${fileLocation}/${req.file.filename}`
			});
			data.save();
			//res.send('test');

		}
	});


};

exports.deletePost = (req, res) => {
	res.send("Not Implemented yet");
};

