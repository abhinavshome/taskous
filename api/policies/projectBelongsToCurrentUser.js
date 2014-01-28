/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
 module.exports = function(req, res, next) {
    console.log('2 called', req.params.id);

    if(req.params.id)
        var userId = req.session.user, projectId = req.params.id;
    else
        return next();
    Team.find({userId: userId, projectId: projectId}).done(function(err, teams){
        console.log('error2', err, teams);
        if(err){
            console.log(err);
            return res.send('DB error', 500);
        }
        
        if(teams.length == 0){
            return res.send('Not your project', 403);
        }
        
        req.projectId = req.id;
        return next();
    });
};
