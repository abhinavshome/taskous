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
    if(!req.session.user)
       return res.send('Please login first', 403);


  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
    User.findOne(req.session.user).done(function(err, user){
       if(err){
           req.session.user = null;
           res.send('DB Error', 500);
           return;
       }
       
       if(!user) {
           req.session.user = null;
           res.send('Wrong user', 403);
           return;
       } 
       
       req.currentUser = user;
       next();
    });
};
