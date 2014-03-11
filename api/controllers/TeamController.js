/**
 * TeamController
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
    find: function (req, res) {
        if (req.params.id) {

        } else {
            Team
                .query(Team.getTeamSQLQuery(req.params.projectId), function (err, users) {
                    if (err) {
                        console.log(err);
                        res.send('DB error', 500);
                        return;
                    }

                    res.json(users.rows);
                });
        }
    },
    create: function (req, res) {
        User
            .findOne({
                username: req.body.username
            })
            .done(function (err, user) {
                if (err) {
                    res.send('DB error', 500);
                    return;
                }
                if (typeof user === 'undefined') {
                    res.send('User not found', 404);
                    return;
                }
                console.log('user', user);
                Team
                    .create({
                        userId: user.id,
                        projectId: req.params.projectId
                    })
                    .done(function (err, team) {
                        if (err) res.send('DB error', 500);
                        res.json(team);
                    });
            })
    }
};
