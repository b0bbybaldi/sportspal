var path = require('path');

function Html (app) {
	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, "index.html"));
	});
}

module.exports = Html;