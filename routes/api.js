var db = require('../models');

function Api (app) {

    // Create a user
    app.post('/api/users', function (req, res) {
        db.Users.create(req.body).then(x => {
            res.status(200);
            res.json(x);
        });
    });

    // Grab all games given a user id
    app.get('/api/games/:id', function (req, res) {
        const games = [];
        const id = Number(req.params.id) || 0;
        var total = 0;
        db.GameUsers.findAll({
            where: {UserId: id}
        }).then(results => {
            total = results.length;
            results.forEach(x => {
                db.Games.findAll({
                    where: {id: x.GameId}
                }).then(x => {
                    x.forEach(y => games.push(y));
                    total -= 1;
                    if (total <= 0) res.json(games);
                });
            }); 
        });
    });

    // Grab all users given a game id
    app.get('/api/users/:id', function (req, res) {
        const users = [];
        const id = Number(req.params.id) || 0;
        var total = 0;
        db.GameUsers.findAll({
            where: {GameId: id}
        }).then(results => {
            total = results.length;
            results.forEach(x => {
                db.Users.findAll({
                    where: {id: x.UserId}
                }).then(x => {
                    x.forEach(y => users.push(y));
                    total -= 1;
                    if (total <= 0) res.json(users);
                });
            }); 
        });
    });

    // Create a game
    app.post('/api/games', function (req, res) {
        const id = Number(req.body.user.id) || 0;
        db.Games.create(req.body.game).then(result => {
            db.GameUsers.create({GameId: result.id, UserId: id}).then(result => {
                res.status(200);
                res.json(result);
            });
        });
    });

    // Add a user to a game
    app.post('/api/games/join', function (req, res) {
        const gameId = req.body.game.id;
        const userId = req.body.user.id;
        db.GameUsers.create({GameId: gameId, UserId: userId}).then(x => {
            res.status(200);
            res.json(x);
        });
    });

}

module.exports = Api;