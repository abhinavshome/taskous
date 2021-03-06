/**
 * UserController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
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

    login: function (req, res) {
        var bcrypt = require('bcrypt-nodejs');

        User.findOneByEmail(req.body.email).done(function (err, user) {
            if (err)
                res.json({
                    error: 'DB error'
                }, 500);

            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err)
                        res.json({
                            error: 'Server error'
                        }, 500);

                    if (match) {
                        // password match
                        req.session.user = user.id;
                        res.send('Logged in successfully');
                        //res.redirect('/app');
                    } else {
                        // invalid password
                        if (req.session.user)
                            req.session.user = null;
                        res.json({
                            error: 'Invalid password'
                        }, 400);
                    }
                });
            } else {
                res.json({
                    error: 'User not found'
                }, 404);
            }
        });
    },
    logout: function (req, res) {
        req.session.user = null;
        res.send("Successfully logged out");
    },
    create: function (req, res) {
        console.log('signup called');
        User
            .create(req.body)
            .done(function (err, user) {
                if (err) {
                    return res.json(err, 500);
                }
                console.log('user created', user);
                req.session.user = user.id;
                res.send('Signed up successfully!');
            });
    },
    find: function(req, res, next){
        if(req.query.getCurrent)
            res.json(req.currentUser);
        else
            return next();
    },
    currentUser: function(req, res) {
        res.json(req.currentUser);
    }
};
