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
        return 'select user.username, count(task.id) as openTaskCount ' +
            'from user join team on user.id = team.userId ' +
            'left join task on user.id = task.assigneeId ' +
            'where team.projectId = ' + projectId + ' ' +
            'and (task.status = \'open\' or task.status is null)' +
            'group by user.id'
    }

};
