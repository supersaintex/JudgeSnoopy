var express = require("express");
var path = require('path');
var router = express.Router();
var fs = require("fs");
var Canvas = require('canvas'),
    Image = Canvas.Image;
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

// モデルをロード
async function loadModel() {
	// modelはpublicの下に入れる
	const path = 'http://localhost:8080/model/model.json';
  const model = await tf.loadLayersModel(path);
};

// GET
router.get('/', function(req, res, next) {
  res.render('runmodel');
});

loadModel();

const dw = 32;
const dh = 32;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// ローカルディレクトリから画像読み込み
const data = fs.readFileSync(path.resolve(__dirname,'../public/images/image.jpg'));
// データをcanvasのcontextに設定
var img = new Image;
img.src = data;
img.onload = function(){
	ctx.drawImage(img, 0, 0, img.width, img.height);
}

// preprocess
var tensor = tf.browser.fromPixels(img).resizeNearestNeighbor([32, 32]).toFloat();
var offset = tf.scalar(255);
var tensor_image = tensor.div(offset).expandDims();
console.log(tensor_image)

// prediction
// var score = tf.tidy(()=>{
	
	// return model.predict(tensor_image);
// });
// console.log(score);
// return score;

module.exports = router;