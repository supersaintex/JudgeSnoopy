const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.listen(8080, () => {
  console.log('Server running...');
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log("Post request received");
  res.end();
});

app.get("/", (req, res) => {
  res.json({ "pet":  "snoopy"});
  console.log('Get request received');
  res.end();
});
