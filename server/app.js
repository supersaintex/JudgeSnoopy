var express = require("express");
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public'))); 

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing
var index = require('./routes/index'); 
app.use('/index', index);

var sampleui = require('./routes/sampleui');
app.use('/sampleui', sampleui);

//listen on port 8080
app.listen(8080, () => {
  console.log("server is running on port 8080");
});

//POST request
// app.post("/", (req, res) => {
  // console.log(req.body);
// console.log("get post request");
// res.end();
// });

module.exports = app; // for testing