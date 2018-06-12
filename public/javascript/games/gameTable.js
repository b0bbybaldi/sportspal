function GameTable () {

	this.root = $("<div>");


	this.init = function () {
		$("#container").append(this.root);
		this.root.css('display', 'none');
	}

	this.toggle = function () {
		if (this.root.css('display') === 'none') this.root.css('display', 'block');
		else this.root.css('display', 'none');
	}
}
