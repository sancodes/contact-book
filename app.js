let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let methodOverride = require('method-override');
//connect to db file path
require('./config/database');

//connect to routes file path
let indexRouter = require('./routes/index');
let contactsRouter = require('./routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//using the method-override method
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    console.log(req.body);
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method; //not particularly necessary to delete the req.body._method --> just to avoid dynamic glitch
    console.log(method);
    return method;
  }
}))

//server middlewares
app.use('/', indexRouter);
app.use('/contacts', contactsRouter);

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
