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
    if(req.param('projectId'))
        return next();
    else
        res.send('projectId expected', 403);
};