
angular.module("taskous.controllers", [])
        .controller('topMenuController', function($scope, Project, $rootScope) {
            $scope.projects = Project.query();
        })
        .controller('HomeController', function($scope, User, Task) {
            $scope.users = [];
            $scope.users = User.query();
            $scope.createTask = function() {
//                Task.create({
//                    
//                });
            };
        })
        .controller('ProjectController', function($scope, Project) {
            $scope.createProject = function() {
                Project.save($scope.project);
            };
        })
        .controller('LoginController', function($scope, $http, $location, $rootScope, User) {
            $scope.user = {};
            $scope.logIn = function() {
                $http.post('/login', $scope.user)
                        .success(function(user) {
                            $rootScope.message = 'User #' + user.username + 'logged in successfully!';
                            $rootScope.user = user.username;
                            $location.path('/');
                        })
                        .error(function(err) {
                            $rootScope.message = err.error;
                            console.log(err);
                        });
            };

        });




