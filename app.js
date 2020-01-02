'use strict';

var createError = require('http-errors');
var express = require('express');

const PORT = process.env.PORT || 3000;
const Tweet = require('./routes/index');
const CronJob=require('cron').CronJob;

var app = express();
//15=0
const job=new CronJob({
  cronTime:"0 0 0 * * *",
  onTick:()=>{Tweet()},
  onComplete:function(){
    console.log('Tweet Complete');
  },
  timeZone:'Asia/Tokyo',
  start:true
});
const job2=new CronJob('* * * * *',()=>{
  console.info('TEST');
})

job.start();
job2.start();

app.get('/', (req, res) => {
  res.send('Server running! '+new Date());
  console.log("Hearing now! It's "+new Date()+" at now.");
  console.log('is job running?',job.running);
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

//https://fathomless-falls-48145.herokuapp.com/ | https://git.heroku.com/fathomless-falls-48145.git