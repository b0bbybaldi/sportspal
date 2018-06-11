function Profile (gameTable, myGames, searchGame) {

	this.root = $("<div>");

	this.gameTable = gameTable;
	this.myGames = myGames;
	this.searchGame = searchGame;


	this.init = function () {
		this.root.append(this.gameTable, this.myGames, this.searchGame);
		$("#container").append(this.root);
		this.root.css('display', 'none');
	}
}