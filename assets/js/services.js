angular
        .module('taskous.services', ["ngResource"])
        .factory(
                {
                    User: function($resource) {
                        return $resource(
                                "/user:userId", {
                                    userId: "@id"
                                }, {
                            "update": {
                                method: "PUT"
                            }
                        }
                        );
                    },
                    Task: function($resource) {
                        return $resource(
                                "/project/:projectId/task/:taskId", {
                                    projectId: '@projectId',
                                    taskId: '@id'
                                }, {}
                        );
                    },
                    Team: function($resource) {
                        return $resource(
                                "/project/:projectId/team/:teamId", {
                                    projectId: '@projectId',
                                    teamId: '@id'
                                }, {}
                        );
                    },
                    Project: function($resource) {
                        return $resource(
                                "/project/:projectId", {
                                    projectId: '@id'
                                }, {}
                        );
                    },
                    AppData: function() {
                        var data = {};
                        return {
                            get: function(key) {
                                return data[key];
                            },
                            set: function(key, value) {
                                data[key] = value;
                            }
                        };
                    },
                    Auth: function($http, $rootScope, $location) {
                        var currentUser = null;
                        return {
                            logIn: function(user) {
                                return $http.post('/login', user)
                                        .success(function(user) {
                                            $rootScope.message = 'User #' + user.username + 'logged in successfully!';
                                            currentUser = user;
                                            console.log('redirecting to /');
                                            $location.path('/');
                                        })
                                        .error(function(err) {
                                            $rootScope.message = err.error;
                                            console.log(err);
                                        });
                                ;
                            },
                            logOut: function() {
                                return $http.get('/logout').success(function() {
                                    location.href = '/login.html';
                                });
                            },
                            isLoggedIn: function() {
                                return currentUser !== null;
                            },
                            setCurrentUser: function(user) {
                                currentUser = user;
                            },
                            getCurrentUser: function() {
                                return currentUser;
                            },
                            redirectBackIfNotLoggedIn: function() {
                                $http.get('/user')
                                        .error(function(err) {
                                            location.href = '/login.html';
                                        })
                            }
                        }

                    },
                    Parser: function() {
                        return {
                            parse: function(taskString) {
                                var components = taskString.split('@');
                                return {
                                    title: components[0].trim(),
                                    assignee: components[1].trim()
                                }
                            }
                        };
                    },
                    Alert: function ($rootScope) {
                        return {
                            message: function (message) {
                                $rootScope.showAlert = true;
                                $rootScope.alert = {
                                  type: 'message',
                                  message: message
                                };
                            },
                            success: function (message) {
                                $rootScope.showAlert = true;
                                $rootScope.alert = {
                                  type: 'success',
                                  message: message
                                };
                            }
                        }
                    }
                        

                });

