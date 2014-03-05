/**
 * Team
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        userId: 'integer',
        projectId: 'integer'
    },

    getTeamSQLQuery: function (projectId) {
        return 'SELECT user.username, user.id FROM user JOIN team ON user.id = team.\"userId\" where team.\"projectId=\"' + projectId;
    }

};
