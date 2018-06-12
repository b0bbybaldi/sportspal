// Core Libraries
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Add local routes to our express app
new require("./routes/game.js")(app);
new require('./routes/member.js')(app);
new require('./routes/user.js')(app);
new require('./routes/html.js')(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {

    console.log("Server listening on: http://localhost:" + PORT);
  });
});