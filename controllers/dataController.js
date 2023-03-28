const model = require('../models/modified model');
const path = require('path');
const multer = require('multer');


const images = multer.diskStorage({
	destination: './models',
	filename: function (req, file, cb) {
		// This renames the uploaded file
		cb(null, file.fieldname = '-' + Date.now());
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
	res.status(200).render('tester', { title: 'tester' });
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
	// >>>>>>> d2b69c215fba76670044d63038363d2328c4877f
	res.send("Not Implemented yet");
};

