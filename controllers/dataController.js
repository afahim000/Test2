const express = require('express');
const animalSchema = require('../models/modified model');
const path = require('path');
const multer = require('multer');

const images = multer.diskStorage({

	destination: function (req, file, callback) {
		if (req.body.filetypes === 'image') {
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

	res.redirect = false;
	res.status(200).render('buttons', { title: 'buttons' });
};

exports.queryOptionsGet = (req, res) => {
	res.status(200).render('search', { title: 'Search' });
};

exports.deleteGet = (req, res) => {
	res.status(200).render('delete', {title: 'delete'});
};


exports.addDataGet = (req, res) => {

	res.status(200).render('tester', { title: 'tester' });
};

// Send data to Image page - doesn't work DELETE
exports.sendImage = (req, res) => {
	let name;
	let query = animalSchema.find({});
	if (req.body.animallist) {
		name = req.body.animallist;
		query = animalSchema.find({ animalName: name });
	}
	query = query.then((response) => {
		res.render('image', { data: response })
	});
};

// Sends data to Search page
exports.queryOptionsPost = (req, res) => {
	//variables referring to different attributes
	let name;
	let startDate;
	let endDate;
	let lat;
	let longitude;
	let endLat;
	let endLong;
	//initial query variable contains all animalSchema objects
	let query = animalSchema.find({});
	//The following if else statements initialize the varibales above and updates the query variable based
	//on the input.
	if (!req.body.animallist) {
	}
	else {
		name = req.body.animallist
		query = animalSchema.find({ animalName: name });

	}
	if(!req.body.fileType)
	{
        
	}
	else
	{
		query = query.find({mediaType: req.body.fileType});
	}
	if (!req.body.startDate) {
		startDate = '1000-12-31';
	}
	else {
		startDate = req.body.startDate;
	}
	if (!req.body.endDate) {
		endDate = '3000-12-31';
	}
	else {
		endDate = req.body.endDate;
	}
	query = query.find({
		date: {
			"$gte": `${startDate}T00:00:00.000Z`, "$lte":
				`${endDate}T00:00:00.000Z`
		}
	});
	
	if (!req.body.latitude) 
	{
       lat = -90;
	}
	else 
	{
		lat = req.body.latitude;
		//query = query.find({ 'location.latitude': lat });
	}
	if(!req.body.endlatitude)
	{
		endLat = 90;
	}	
	else
	{
		endLat = req.body.endlatitude;
	}
	query = query.find({'location.latitude': {"$gte": `${lat}`, "$lte": `${endLat}`}});
	
	if (!req.body.longitude)
	{
		longitude = -180;
	}
	else {
		longitude = req.body.longitude;
	}
	if(!req.body.endlongitude)
	{
		endLat = 180;
	}
	else
	{
		endLat = req.body.endlongitude;
	}

	query = query.find({ 'location.longitude': {"$gte": `${longitude}`, "$lte": `${endLong}`} });

	query.then((response) => {
		console.log('\n\n\nSending data to Search page\n.\n.\n.');
		res.render('search', { data: response })
	});


};

exports.addDataPost = async (req, res) => {

	imgUpload(req, res, async (err) => {
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
					address: `${req.body.street} ${req.body.city} ${req.body.state} ${req.body.zipcode} ${req.body.country}`, 
					latitude: req.body.latitude,
					longitude: req.body.longitude
				},
				date: new Date(`${YMD}T${time}:00`),
				mediaType: req.body.filetypes,
				fileDirectory: `${fileLocation}/${req.file.filename}`
			});
			try {
				await data.save();
				console.log(data);
				res.redirect('/upload-success');
			}
			catch (saveErr) {
				res.redirect('/upload-fail');
			}
			// res.send('/add');
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
	if(!req.body.fileType)
	{

	}
	else
	{
		query = query.find({mediaType: req.body.fileType});
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
	query = query.find({ date:{"$gte": `${startDate}T00:00:00.000Z`, "$lte":
	`${endDate}T00:00:00.000Z`}});
	if(!req.body.latitude)
	{		
	}
	else
	{
		lat = req.body.latitude;
		//query = query.find({ 'location.latitude' : lat});
	}
	if(!req.body.endlatitude)
	{

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
