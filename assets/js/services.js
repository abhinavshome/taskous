angular
    .module('taskous.services', ["ngResource"])
    .factory(
    {
        User: function ($resource) {
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
        },

        Task: function ($resource) {
            return $resource(
                "/project/:projectId/task/:taskId", {
                    projectId: '@projectId',
                    taskId: '@id'
                }, {}
            );
        },

        Team: function ($resource) {
            return $resource(
                "/project/:projectId/team/:teamId", {
                    projectId: '@projectId',
                    teamId: '@id'
                }, {}
            );
        },

        Project: function ($resource) {
            return $resource(
                "/project/:projectId", {
                    projectId: '@id'
                }, {}
            );
        },

        AppData: function () {
            var data = {};
            return {
                get: function (key) {
                    return data[key];
                },
                set: function (key, value) {
                    data[key] = value;
                }
            };
        }

    });

