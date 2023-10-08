const express = require("express");
const app = express();
var router = express.Router();

app.get("/", (req, res) => {
  res.render("sampleui");
});

module.exports = router;