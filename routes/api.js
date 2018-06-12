var db = require('../models');

function Game (app) {

    // Create a user
    app.post('/api/users', function (req, res) {
        db.User.create(req.body).then(x => {
            res.status(200);
            res.json(x);
        });
    });

    // Retrieve all users for a given game id
    app.get('/api/users/game/:id', function (req, res) {
        const id = Number(req.params.id) || 0;
        db.User.findAll({
            include: [{
                model: db.GameUser,
                include: [{
                    model: db.Game,
                    where: {id: id}
                }]
            }]
        }).then(users => {
            console.log(users);
            res.json(users);
        });
    });

    // Retrieve game via query
    app.get('/api/games', function (req, res) {
        let id = Number(req.params.id) || 0;
        db.Game.findAll({
            where: {
                req.query
            }
        }).then( function (results){
            res.json(results);
        });
    });

    // Retrieve all games for a given user id
    app.get('/api/games/user/:id', function (req, res) {
        const id = Number(req.params.id) || 0;
        db.Game.findAll({
            include: [{
                model: db.GameUser,
                include: [{
                    model: db.User,
                    where: {id: id}
                }]
            }]
        }).then( games => {
           console.log(games);
            res.json(games);
        });
    });

    // Create a game
    app.post('/api/games/', function (req, res) {
        const id = Number(req.body.user.id) || 0;
        db.Game.create(req.body.game).then(result => {
            db.GameUser.create({gameId: result[0].id, userId: id}).then(result => {
                res.status(200).end();
            });
        });
    });

    // Add a user to a game
    app.post('/api/games/join', function (req, res) {
        const gameId = req.body.game.id;
        const userId = req.body.user.id;
        db.GameUser.create({gameId: gameId, userId: userId}).then(x => {
            res.status(200).end();
        });
    });

}

module.exports = Game;