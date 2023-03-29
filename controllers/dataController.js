const model = require('../models/modified model');
const path = require('path');
const multer = require('multer');

const images = multer.diskStorage({
	destination: './dev-data/img',
	filename: function (req, file, callback) {
		callback(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname));
	}
});

/*
const audio = multer.diskStorage({
	destination: '../dev-data/audio'.
	filename: function( req, file, cb)
	{
		cb(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname))
	}
})

const video = multer.diskStorage({
	destination: '../dev-data/video'.
	filename: function( req, file, cb)
	{
		cb(null, file.fieldname = '-' + Date.now() + path.extname(file.originalname))
	}
})
*/
const imgUpload = multer({
	storage: images
}).single('file');

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

exports.queryOptionsPost = (req, res) => {
	res.send("Not Implemented yet");
};

exports.addDataPost = (req, res) => {
	res.send("Not Implemented yet");
};

exports.queryOptionsGet = (req, res) => {
	res.send("Not Implemented yet");
};

exports.addDataGet = (req, res) => {
	res.status(200).render('data-upload', { title: 'form' });
};

exports.deleteGet = (req, res) => {
	res.send("Not Implemented yet");
};

exports.queryOptionsPost = (req, res) => {
	res.send("Not Implemented yet");
};

exports.addDataPost = (req, res) => {
	imgUpload(req, res, (err) => {
		if (err) {
			res.render('data-upload');
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

