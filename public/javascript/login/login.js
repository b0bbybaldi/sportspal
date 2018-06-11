var hash = require('./helper.js');

function Login () {

	this.root = $("<div>").addClass("col-sm-8 offset-sm-2");

	this.init = function () {
		$("#container").append(this.root);
		this.root.css('display', 'none');
	}

	this.toggle = function () {
		if (this.root.css('display') === 'none') this.root.css('display', 'block');
		else this.root.css('display', 'none');
	}
}