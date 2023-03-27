const model = require('../models/modified model');

const multer = require('multer');

exports.getOptions = (req, res) =>
{	
	res.status(200).render('tester', { title: 'tester' });
};

exports.queryOptionsGet = (req, res) => 
{
	res.send("Not Implemented yet");
};

exports.addDataGet = (req, res) => 
{
	res.send("Not Implemented yet");
};

exports.deleteGet = (req, res) => 
{
	res.send("Not Implemented yet");
};

exports.queryOptionsPost = (req, res) => 
{
	res.send("Not Implemented yet");
};

exports.addDataPost = (req, res) => 
{
	res.send("Not Implemented yet");
};

exports.deletePost = (req, res) => 
{
	res.send("Not Implemented yet");
};


