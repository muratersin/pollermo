// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  // set locals, only providing error in development
  res.locals.errorTitle = status === 404 ? 'Not Found!' : 'Something went wrong';
  res.locals.message = status === 404 ? err.message : 'You may also refresh the page or try again later';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(status);
  res.render('error');
}

module.exports = errorHandler;
