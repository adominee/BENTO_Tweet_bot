'use strict';

var createError = require('http-errors');
var express = require('express');

const PORT = process.env.PORT || 3000;
const IndexModule = require('./routes/index');
const CronJob=require('cron').CronJob;

var app = express();
const job=new CronJob({
  cronTime:"0 1 0 * * *",
  onTick:()=>{IndexModule.Tweet()},
  onComplete:function(){
    console.log('Tweet Complete');
  },
  timeZone:'Asia/Tokyo',
  start:true
});

job.start();

app.get('/', (req, res) => {
  res.send('Server running! '+new Date());
  console.log("今は"+IndexModule.INFO_TIME()+" です。");
}); //ブラウザ確認用

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
  res.send('error');
});

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT);
console.log(`Server running at ${PORT}`);
console.log(IndexModule.INFO_TIME());

//https://nameless-sands-60204.herokuapp.com/ | https://git.heroku.com/nameless-sands-60204.git
