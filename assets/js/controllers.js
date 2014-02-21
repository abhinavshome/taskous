angular
        .module("taskous.controllers", [])
        .controller({
            TopMenuController: function($scope, $rootScope, Project, Auth) {
                
                $scope.projects = Project.query(function() {
                    $rootScope.currentProject = $scope.projects[0];
                });
                
                $scope.selectProject = function(project) {
                    $rootScope.currentProject = project;
                    console.log('selected', project);
                };
                
                $scope.logOut = function() {
                    Auth.logOut();
                }
            },
            AlertController: function($scope, $rootScope) {
                $rootScope.alert = {type: 'error', message: 'Go to hell!'};
            },
            TeamController: function($scope, $rootScope, Team) {

                $scope.addUser = function() {
                    Team.save({
                        username: $scope.newUser.username,
                        projectId: $rootScope.currentProject.id
                    }, refreshTeam);
                };

                var refreshTeam = function() {
                    $scope.team = Team.query({
                        projectId: $rootScope.currentProject.id
                    })
                }

                refreshTeam();
            },
            HomeController: function($scope, $rootScope, User, Task, Parser) {
                $scope.createTask = function() {
                    var taskObject = Parser.parse($scope.taskString);
                    Task.save({
                        projectId: $rootScope.currentProject.id,
                        desc: taskObject.title,
                        username: taskObject.assignee
                    }, function() {
                        $scope.tasks = Task.query({
                            projectId: $rootScope.currentProject.id
                        });
                    });
                };
                $scope.deleteTask = function(task) {
                    Task.delete({}, {
                        id: task.id,
                        projectId: $rootScope.currentProject.id
                    }, refreshTasks);
                }
                var refreshTasks = function() {
                    $scope.tasks = Task.query({
                        projectId: $rootScope.currentProject.id
                    });
                };

                $rootScope.$watch('currentProject', refreshTasks);
            },
            ProjectController: function($scope, Project) {
                $scope.createProject = function() {
                    Project.save($scope.project);
                };
            },
            LoginController: function($scope, $location, $rootScope, Auth) {
                $scope.user = {};
                $scope.logIn = function() {
                    Auth.logIn($scope.user);
                };

            }
        }

        );