/**
 * TeamController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    login: function(req, res) {
        var bcrypt = require('bcrypt-nodejs');

        Team.findOneByHandle(req.body.handle, function(err, team) {
            if (err)
                res.json({error: 'DB error'}, 500);

            if (team) {
                bcrypt.compare(req.body.password, team.password, function(err, match) {
                    if (err)
                        res.json({error: 'Server error'}, 500);

                    if (match) {
                        // password match
                        req.session.team = team.id;
                        res.json(team);
                    } else {
                        // invalid password
                        if (req.session.team)
                            req.session.team = null;
                        res.json({error: 'Invalid password'}, 400);
                    }
                });
            } else {
                res.json({error: 'Team not found'}, 404);
            }
        });
    },
    logout: function(req, res) {
        req.session.team = null;
        res.send("Successfully logged out");
    },
    users: function(req, res) {
        Team.findOne(req.session.team, function(err, team) {
            if (err)
                res.json({error: 'DB error'}, 500);
            if (team) {
                team.getUsers().done(function(err, users){
                    console.log('users', users);
                    if(err) 
                        res.json({error: 'Server error'});
                    if(users){
                        res.json(users);
                    } else {
                        res.json({error: 'No users in this team'});
                    }
                });
            } else {
                res.json({error: 'Users not found'}, 404);
            }
        });
    }
};
