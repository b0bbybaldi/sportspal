function Login () {

	this.root = $("<div>");


	this.init = function () {
		$("#container").append(this.root);
		this.root.css('display', 'none');
	}
}