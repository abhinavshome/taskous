/**
 * Project
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes : {
        deadline : 'date',
        status : 'string',
        desc : 'string',
        getTasks : function() {
            return Task.findByProjectId(this.id);
        },
        checkUserAuthorization : function(userId) {
            Team.find({userId: userId, projectId: this.id}).done(function(err, team){
                
            });
        }
    }

};
