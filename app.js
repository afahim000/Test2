var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
var dataRouter = require('./controllers/dataRouter');
var viewsRouter = require('./routes/viewsRoutes');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/searchRouter');
var addRouter = require('./routes/addRouter');
var videoRouter = require('./routes/videoRouter');
var audioRouter = require('./routes/audioRouter');
var imageRouter = require('./routes/imageRouter');
var deleteRouter = require('./routes/deleteRouter');
const userSchema = require('./models/Users');
var uploadSuccessRouter = require('./routes/uploadSuccessRouter');
var uploadFailRouter = require('./routes/uploadFailRouter');
const compression = require("compression");
var app = express();
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
})

const mongoose = require('mongoose');
const dataController = require('./controllers/dataController');

app.use(compression());



app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 'public' dir has the css, js, and images dirs
// These give the html pages access to the resources stored in 
// the directories 'public' and 'dev-data'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dev-data')));

app.use('/', viewsRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/options', dataRouter);
app.use('/add', addRouter);
app.use('/image', imageRouter);
app.use('/audio', audioRouter);
app.use('/video', videoRouter);
app.use('/delete', deleteRouter);
app.use('/upload-success', uploadSuccessRouter);
app.use('/upload-fail', uploadFailRouter);


// Rendering page mediaDisplay.pug - CIP
app.use('/media-display/:display', (req, res) => {
  const { display } = req.params;
  res.render('mediaDisplay.pug', {
    title: "Media Display",
    display,
  });
})


// ***** DELETE THIS ? *****
// To display the pictures
// gotten from: https://stackoverflow.com/questions/49945339/inserting-image-in-pug-template-engine
// don't know if works
//app.use('pictures', express.static(process.cwd() + 'pictures'));
//app.use(express.static('pictures'))
// app.use(express.static(path.join(__dirname, 'assets')))
// app.use('assets', express.static(process.cwd() + 'assets'));

app.use('/images', express.static(__dirname + '/assets/images'));


// app.use('/images', express.static(__dirname + '/assets/images'));



// To link button.pug page from _header.pug
// app.get(__dirname + '/views/button', (req, res) => {
//   res.render('buttons');
// });

app.post('/register', async (req, res)=>
{
	res.status(200).render('overview', { title: 'overview' });
	var hashedPasswords;
	var hashedPassword = await bcrypt.hash(req.body.password, 10);
	bcrypt.hash(req.body.password, 10, function(err, hash){hashedPassword = hash});
	

	//	{bcrypt.hash(req.body.password, salt, function(err, hash)=>{})
	//};
	const user = new userSchema(
	{
		firstName: req.body.fname,
		lastName: req.body.lname,
		email: req.body.email,
		password: hashedPassword,
		TLA: req.body.TLA,
		role: 'visitor'
	})
	console.log(hashedPassword);
	user.save();
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.set('strictQuery', false);
const dev_db_url = "mongodb+srv://abrar_fahim20:Sakib43st@cluster0.n9faamf.mongodb.net/?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
//connect to the database with mongoose
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const port = process.env.PORT || 3000;
// start the server to listen using express
app.listen(port, () => {
  //if (process.env.NODE_ENV === 'development') {
  console.log(`The Server is UP and Running in port http://localhost:${port}\n`);
  //}
});
module.exports = app;
