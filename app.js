var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dataRouter = require('./controllers/dataRouter');
var viewsRouter = require('./routes/viewsRoutes');
var usersRouter = require('./routes/users');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 'public' dir has the css, js, and images dirs
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);

//jiohoij

// ***** DELETE THIS ? *****
// To display the pictures
// gotten from: https://stackoverflow.com/questions/49945339/inserting-image-in-pug-template-engine 
// don't know if works
//app.use('pictures', express.static(process.cwd() + 'pictures'));
//app.use(express.static('pictures'))
// app.use(express.static(path.join(__dirname, 'assets')))
// app.use('assets', express.static(process.cwd() + 'assets'));
app.use('/images', express.static(__dirname + '/assets/images'));



// To link button.pug page from _header.pug
// app.get(__dirname + '/views/button', (req, res) => {
//   res.render('buttons');
// });



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


module.exports = app;
