/**
 * Team
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    reporterId	: 'integer',
    projectId	: 'integer',
    desc: 'string',
    assigneeId: 'integer'
  },

  getAllTasksOfThisProjectQuery: function (projectId) {
  	return "SELECT 'task'.*,'user'.'username' as assignee FROM 'task' JOIN 'user' ON 'task'.'assigneeId' = 'user'.'id' where 'task'.'projectId' = " + projectId;
  }

};
