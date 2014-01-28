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
    console.log('2 called', req, req.id);

    var taskId = req.params.id, projectId = req.params.projectId, userId = req.session.user;

    
    Team.find({userId: userId, projectId: projectId}).done(function(err, teams){
        console.log('errors', err, teams);
        if(err) return res.send('DB error', 500);
        
        if(teams.length == 0) return res.send('Not your project', 403);
        
        Task.find({
            id: taskId,
            projectId: projectId
        }).done(function (err, tasks) {
            if(err) return res.send('DB error', 500);
            console.log(tasks);
            if(tasks.length == 0) return res.send('You can\'t access this task', 403);
        })
        
        return next();
    });
};
