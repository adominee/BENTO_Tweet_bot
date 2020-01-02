const twitter=require('twitter');
const moment=require('moment-timezone');
moment.tz.setDefault("Asia/Tokyo");
moment.locale('ja');

const TargetDate=1648738799*1000;


// 認証情報を設定（Twitter Appで発行したものを設定）
const Tclient = new twitter({
  consumer_key: "J9kZpKbdnf3qfZpMdLPEoiHUs",
  consumer_secret: process.env.Consumr_Secret,
  access_token_key: process.env.Access_Key,
  access_token_secret: process.env.Access_Secret
});

function TweetJOJOEN(){
  var nowDates=moment();
  var Dates=moment(TargetDate).diff(nowDates,'days');
  Tclient.post('statuses/update',{'status':'今日は'+moment().format('YYYY-MM-DD')+'日です。\n高三の三月が終わるまで'+Dates+'日となりました。'},function (error, tweet, response) {
    if (error) throw error;
    if (!error) {
      console.log("success");
    }
  });
  console.log(Dates+'日');
  return;
}

function INFONOW(){
  return moment().format('YYYY年MM月DD日 hh:mm:ss');
}


exports.Tweet = TweetJOJOEN;
exports.INFO_TIME = INFONOW;