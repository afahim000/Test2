const express = require('express');
const animalSchema = require('../models/modified model');
const path = require('path');
const multer = require('multer');
const { check, validationResult } = require("express-validator");
const textOnly = multer();

const images = multer.diskStorage({
	destination: function (req, file, callback) {
		if (req.body.filetypes === 'Images') {
			callback(null, './dev-data/img');
		}
		else if (req.body.filetypes === 'Video') {
			callback(null, './dev-data/video');
		}
		else {
			callback(null, './dev-data/audio');
		}
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
			console.log(fileLocation = req.file.destination);
			console.log(animalSchema.countDocuments({}));
			const count = animalSchema.countDocuments({});
			const data = new animalSchema({
				id: count + 1,
				animalName: req.body.animallist,
				recorder:
				{
					last: req.body.lname,
					first: req.body.fname
				},
				location:
				{
					latitude: req.body.latitude,
					longitude: req.body.longitude,
				},
				mediaType: req.body.filetypes,
				fileDirectory: `../${fileLocation}./${req.file.filename}`
			});
			data.save();
			//res.send('test');

		}
	});


};

exports.deletePost = (req, res) => {
	res.send("Not Implemented yet");
};

