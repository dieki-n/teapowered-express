import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import groceryRouter from './grocery/grocery';
import blogRouter from './blog/blog';

import slashes from 'connect-slashes';

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/grocery/resources', express.static(path.join(__dirname, 'grocery/public')));
app.use('/blog/resources', express.static(path.join(__dirname, 'blog/public')));


app.use(function(req, res, next) {
  if (req.path.substr(-1) == '/' && req.path.length > 1) {
      var query = req.url.slice(req.path.length);
      res.redirect(301, req.path.slice(0, -1) + query);
  } else {
      next();
  }
});

app.use('/grocery', groceryRouter);
app.use('/blog', blogRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status + " Error: " + err.message);
});

//Redirect all urls that don't end with a trailing slash


module.exports = app;
