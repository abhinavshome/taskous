var taskousServices = angular.module('taskous.services', ["ngResource"]);

taskousServices.factory('User', function($resource) {
    return $resource(
        "/user:userId", {
            userId: "@id"
        }, {
            "update": {
                method: "PUT"
            },
            "logIn": {
                method: 'POST'
            }

        }
    );
});

taskousServices.factory('Task', function($resource) {
    return $resource(
        "/project/:projectId/task/:taskId", {
            projectId: '@projectId',
            taskId: '@id'
        }, {}
    );
});

taskousServices.factory('Project', function($resource) {
    return $resource(
        "/project/:projectId", {
            projectId: '@id'
        }, {}
    );
});

taskousServices.factory('AppData', function() {
    var data = {};
    return {
        get: function(key) {
            return data[key];
        },
        set: function(key, value) {
            data[key] = value;
        }
    };
});