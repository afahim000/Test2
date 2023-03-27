const model = require('../models/modified model');

exports.getOptions = (req, res) => {
	res.status(200).render('buttons.pug', { title: 'buttons' });
};

exports.queryOptionsGet = (req, res) => {
	res.send("Not Implemented yet");
};


exports.addDataGet = (req, res) => {
	res.send("Not Implemented yet");
};

exports.deleteGet = (req, res) => {
	res.send("Not Implemented yet");
};

exports.queryOptionsPost = (req, res) => {
	res.send("Not Implemented yet");
};

exports.addDataPost = (req, res) => {
	res.send("Not Implemented yet");
};

exports.deletePost = (req, res) => {
	res.send("Not Implemented yet");
};


