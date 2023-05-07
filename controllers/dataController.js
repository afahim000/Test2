const express = require('express');
const animalSchema = require('../models/modified model');
const path = require('path');
const multer = require('multer');

const images = multer.diskStorage({

	destination: function (req, file, callback){
		if(req.body.filetypes === 'image')
		{
			callback(null, './dev-data/img');
		}
		else if(req.body.filetypes === 'video')
		{
			callback(null, './dev-data/videos');
		}
		else
		{
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
	res.status(200).render('buttons', { title: 'buttons'});
};

exports.queryOptionsGet = (req, res) => {
	res.status(200).render('search', { title: 'Search' });
};

exports.deleteGet = (req, res) => {
	res.status(200).render('delete', {title: 'delete'});
};


exports.addDataGet = (req, res) => 
{
	
	res.status(200).render('tester', { title: 'tester' });
};

exports.queryOptionsPost = (req, res) => {
	let name;
	let startDate;
	let endDate;
	let lat;
	let longitude;
	let query = animalSchema.find({});
	if(!req.body.animallist)
	{
	}
	else
	{
		name = req.body.animallist
		query = animalSchema.find({animalName: name});

	}
	if(!req.body.startDate)
	{
		startDate = '1000-12-31';
	}
	else
	{
		startDate = req.body.startDate;
	}
	if(!req.body.endDate)
	{
		endDate = '3000-12-31';
	}
	else
	{
		endDate = req.body.endDate;
	}
	query.find({ date:{"$gte": `${startDate}T00:00:00.000Z`, "$lte":
	`${endDate}T00:00:00.000Z`}});
	if(!req.body.latitude)
	{
	}
	else
	{
		lat = req.body.latitude;
		query.find({ 'location.latitude' : lat});
	}
	if(!req.body.longitude)
	{
	}
	else
	{
		longitude = req.body.longitude;
		query.find({ 'location.longitude' : longitude});
	}
	query = query.then((response) => {console.log(response);
		res.render('search', {data: response} )});


};

exports.addDataPost = (req, res) => {

		imgUpload(req, res, (err) => {
		if (err) {
			res.render('tester');
			res.send('MEOWWWW!!!!');
		}
		else {
			console.log(req.body.stime);
			const time = req.body.stime;
			const YMD = req.body.sdate;
			let fileLocation = req.file.destination;
			fileLocation = fileLocation.replace('./dev-data/', '');
			const data = new animalSchema({
			comments: req.body.comments,
			animalName: req.body.animallist,
			recorder: 
			{
				last: req.body.lname,
				first: req.body.fname,
				TLA: req.body.acronym
			},
			location: 
			{
				address: req.body.address,
				latitude:req.body.latitude,
				longitude: req.body.longitude
			},
			date: new Date(`${YMD}T${time}:00`),
			mediaType: req.body.filetypes,
			fileDirectory: `${fileLocation}/${req.file.filename}`
			});
			data.save();
			//res.send('test');

			}
									});

		
};

exports.deletePost = (req, res) => {
	let name;
	let startDate;
	let endDate;
	let lat;
	let longitude;
	let query = animalSchema.find({});
	if(!req.body.animallist)
	{
	}
	else
	{
		name = req.body.animallist
		query = animalSchema.find({animalName: name});

	}
	if(!req.body.startDate)
	{
		startDate = '1000-12-31';
	}
	else
	{
		startDate = req.body.startDate;
	}
	if(!req.body.endDate)
	{
		endDate = '3000-12-31';
	}
	else
	{
		endDate = req.body.endDate;
	}
	query.find({ date:{"$gte": `${startDate}T00:00:00.000Z`, "$lte":
	`${endDate}T00:00:00.000Z`}});
	if(!req.body.latitude)
	{
	}
	else
	{
		lat = req.body.latitude;
		query.find({ 'location.latitude' : lat});
	}
	if(!req.body.longitude)
	{
	}
	else
	{
		longitude = req.body.longitude;
		query.find({ 'location.longitude' : longitude});
	}
	query = query.then((response) => {console.log(response);
		res.render('delete', {data: response} )});
};

exports.removeFromDB = (req, res) => {
	res.status(200).render('delete', {title: 'delete'});
};
