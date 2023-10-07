var express = require('express');
var router = express.Router();

//*** 追加1 ここから***//
var multer = require('multer');
var storage = multer.diskStorage({
  //ファイルの保存先を指定(ここでは保存先は./public/images) 
  //Express4の仕様かなんかで画像staticなファイルを保存するときはpublic/以下のフォルダに置かないとダメらしい
  //詳しくは express.static public でググろう！
  destination: function(req, file, cb){
    cb(null, './public/images/')
  },
  //ファイル名を指定
  //ここでは image.jpg という名前で保存
  filename: function(req, file, cb){
    cb(null, 'image.jpg')
  }
})

var upload = multer({storage: storage})
//*** 追加1 ここまで ***//

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//*** 追加2 ここから ***//
//ルート (/) に対する POST リクエスト
//name タグにfileを指定したもののみ受け付ける
router.post('/', upload.single('file'), function(req, res){
  res.json({ 'result': 'success!' });
});
//*** 追加2　ここまで ***//

module.exports = router;

