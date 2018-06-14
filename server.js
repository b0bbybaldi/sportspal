// Core Libraries
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Add local routes to our express app
new require("./routes/api.js")(app);
new require('./routes/html.js')(app);

const db = require('./models/index.js');
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {

    console.log("Server listening on: http://localhost:" + PORT);
  });
});