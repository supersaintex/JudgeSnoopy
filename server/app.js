var express = require("express");
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

//body-parserモジュールを読み込み初期化する
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
//HTTPリクエストのボディをjsonで扱えるようになる
app.use(bodyParser.json());

var index = require('./routes/index');
app.use('/index', index);

var sampleui = require('./routes/sampleui');
app.use('/sampleui', sampleui);

// var runmodel = require('./routes/runmodel');
// app.use('/runmodel', runmodel);

// 8080番ポートで待ち受け
app.listen(8080, () => {
  console.log("サーバー起動中");
});

//POSTリクエストの作成
// app.post("/", (req, res) => {
  //HTTPリクエストのボディを出力
  // console.log(req.body);
// console.log("POSTリクエストを受け取りました");
// res.end();
// });

module.exports = app;

