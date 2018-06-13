var db = require('../models');


function hash () {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function Api (app) {

    /*
        Register a new user
            {
                "name": "James Reinke",
                "email": "jamesreinke4@gmail.com",
                "password": "password"
            }
    */
    app.post('/api/register', function (req, res) {
        req.body.password = hash(req.body.password);
        db.Users.create(req.body).then(x => {
            res.status(200);
            res.json(x);
        });
    });

    app.post('/api/login', function (req, res) {
        db.Users.findAll({
            where: {email: req.body.email, password: hash(req.body.password)}
        }).then(x => res.json(x));
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
                    "latitude": "50"
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

}

module.exports = Api;