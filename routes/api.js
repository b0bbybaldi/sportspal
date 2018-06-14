var passwordHash = require('password-hash');

var db = require('../models');


function Api (app) {
    /*
        Register a new user, returning the user row (ID and hash included).
            {
                "name": "James Reinke",
                "email": "jamesreinke4@gmail.com",
                "password": "password"
            }
    */
    /*
        Login, returning the user row (ID and hash included).
            {
                "email": "example@example.com",
                "password": "password"
            }
    */
    app.post('/api/login', function (req, res) {
        req.body.password = passwordHash.generate(req.body.password);
        db.Users.findAll({
            where: req.body
        }).then(x => {
            if (x.length > 0) res.json(x[0]);
            else {
                db.Users.create(req.body).then(x => {
                    res.json(x.dataValues)
                });
            }
        });
    });
    /*
        Grab all games given a user ID.
            GET /api/games/2
    */
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
    /*
        Grab all users given a game ID.
            GET /api/users/12
    */
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
    /*
        Create a game:
            {
                user: {
                    "id": "1"
                },
                game: {
                    "name": "Soccer",
                    "event_date": "12-12-20 09:08:33",
                    "logitude": "50",
                    "latitude": "50",
                    hash: "123854jfqoq3894j0q9wjgo9-290jsfig"
                }
            }
    */
    app.post('/api/games', function (req, res) {
        const id = Number(req.body.user.id) || 0;
        db.Games.create(req.body.game).then(result => {
            db.GameUsers.create({GameId: result.id, UserId: id}).then(result => {
                res.status(200);
                res.json(result);
            });
        });
    });
    /*
        Retrieve all games
    */
    app.get('/api/games', function (req, res) {
        db.Games.findAll({}).then(x => res.json(x));
    });
    /*
        Add a user to an existing game.
            {
                user: {
                    "id": "1"
                },
                game: {
                    "id": "2"
                }
            }
    */
    app.post('/api/games/join', function (req, res) {
        const gameId = req.body.game.id;
        const userId = req.body.user.id;
        db.GameUsers.create({GameId: gameId, UserId: userId}).then(x => {
            res.status(200);
            res.json(x);
        });
    });
     /*
        Remove a user from an existing game.
            {
                user: {
                    "id": "1"
                },
                game: {
                    "id": "2"
                }
            }
    */
    app.post('/api/games/leave', function (req, res) {
        const gameId = req.body.game.id;
        const userId = req.body.user.id;
        db.GameUsers.destroy({where: {GameId: gameId, UserId: userId}}).then(x => res.json(x));
    });
    /*
        Delete an existing an existing game.
            {
                hash: "13948701asgqehr2qa9hafd369879adfh143",
                gameId: "12"
            }
    */
    app.post('/api/games/delete', function (req, res) {
        const gameId = req.body.game.id;
        const hash = req.body.game.hash;
        db.Games.destroy({where: {id: gameId, hash: hash}}).then(x => {
            if (x) db.GameUsers.destroy({where: {GameId: gameId}});
        });
    });
}

module.exports = Api;