var express = require('express');
var router = express.Router();
var multer = require('multer');
var Canvas = require('canvas');
var fs = require('fs');
var path = require('path');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

// Middleware to upload file
var storage = multer.diskStorage({ 
  //ファイルの保存先を指定(ここでは保存先は./public/images) 
  destination: function(req, file, cb){
    cb(null, './public/images/')
  },
  //ファイル名を指定
  filename: function(req, file, cb){
    cb(null, 'image.jpg')
  }
})

var upload = multer({storage: storage})

// GET
// route '/' is defined in app.js
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST
router.post('/', upload.single('file'), function(req, res) {
  console.log(req.file);
  
  var img = new Canvas.Image();
  img.src = fs.readFileSync(req.file.path);

  var canvas = Canvas.createCanvas(img.width, img.height);
  ctx = canvas.getContext('2d');
  ctx.drawImage(img,0,0);

  // preprocess
  var tensor = tf.browser.fromPixels(canvas, 3).resizeBilinear([32, 32]).toFloat();
  var offset = tf.scalar(255);
  var tensor_image = tensor.div(offset).expandDims();
  console.log(tensor_image.shape);

  // run model
  let output;
  let result;
  
  async function prediction() {
    // modelはpublicの下に入れる
    const path_model = 'http://localhost:8080/model/model.json';
    const model = await tf.loadLayersModel(path_model);
    console.log("model loaded(1)");
    output = await model.predict(tensor_image).data();
    console.log(output);
    result = Array.from(output);
    console.log(result[0]);
    return result[0];
  }

  // console.log("before prediction(2)");
  // result = prediction();
  // prediction();
  // console.log("after prediction(3)");
  // console.log(result);

  // let data = {};
  // data.resultImg = canvas.toDataURL();
  // data.pred = await prediction();

  async function render() {
    let data = {};
    data.resultImg = canvas.toDataURL();
    data.pred = await prediction();

    res.render('image', data);
  }

  render();
  // res.render('image', data);
  // console.log("hello(4)");

});


  // Canvas.Image() メソッドでImg要素を作り、
  // srcに受け取ったファイルのパスをセットする

module.exports = router;

