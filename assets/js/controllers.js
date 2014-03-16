angular
    .module("taskous.controllers", [])
    .controller({
        MainController: function ($scope, $rootScope, Project, Auth, Alert, Team, $location) {

            init();

            function init() {

                $scope.projects = Project.query(function () {
                    if ($scope.projects.length)
                        $rootScope.currentProject = $scope.projects[0];
                });
            }

            $scope.selectProject = function (project) {
                $rootScope.currentProject = project;
                console.log('selected', project);
            };

            $scope.logOut = function () {
                Auth.logOut();
            }

            $scope.init = function () {

            }
        },
        AlertController: function ($scope, $rootScope) {
            //$rootScope.alert = {type: 'error', message: 'Go to hell!'};
            $scope.hideAlert = function () {
                $rootScope.showAlert = false;
            }
        },
        TeamController: function ($scope, $rootScope, Team) {

            $scope.addUser = function () {
                Team.save({
                    username: $scope.newUser.username,
                    projectId: $rootScope.currentProject.id
                }, refreshTeam);
            };

            var refreshTeam = function () {
                if ($rootScope.currentProject) {
                    $scope.team = Team.query({
                        projectId: $rootScope.currentProject.id
                    })
                }
            }

            $scope.$watch('currentProject', refreshTeam);

        },
        HomeController: function ($scope, $rootScope, User, Task, Parser, Alert, $location, $filter) {

            init();

            function init() {
                if ($scope.projects.length == 0) {
                    Alert.message('You have no project. Want to create one?');
                    $location.path('/project/create');
                }
            }

            $scope.createTask = function () {
                var taskObject = Parser.parse($scope.taskString);
                if (!taskObject.assignee)
                    Alert.message('Assignee Invalid. Assigning to self.');
                Task.save({
                    projectId: $rootScope.currentProject.id,
                    desc: taskObject.title,
                    username: taskObject.assignee
                }, function () {
                    $scope.tasks = Task.query({
                        projectId: $rootScope.currentProject.id
                    });
                    Alert.success('Task created successfully!');
                });
            };
            $scope.deleteTask = function (task) {
                Task.delete({}, {
                    id: task.id,
                    projectId: $rootScope.currentProject.id
                }, refreshTasks);
            }

            $scope.markCompleted = function(task) {
                Task.update({}, task);
            }

            $scope.clearCompleted = function(){
                var completedTasks = $filter('filter')($scope.tasks, {status: 'completed'});
                var idsToDelete = [];
                for(var i=0; i<completedTasks.length; i++){
                    idsToDelete.push(completedTasks[i].id);
                }
                Task.clearDone(idsToDelete).success(function(){
                    refreshTasks();
                })
            }

            var refreshTasks = function () {
                if ($rootScope.currentProject) {
                    $scope.tasks = Task.query({
                        projectId: $rootScope.currentProject.id
                    });
                }
            };

            $scope.$watch('currentProject', refreshTasks);
        },
        ProjectController: function ($scope, Project, Alert, $location) {
            $scope.createProject = function () {
                Project.save($scope.project);
                Alert.success('Project created successfully!');
                $location.path('/')
            };
        },
        LoginController: function ($scope, $location, $rootScope, Auth) {
            $scope.user = {};
            $scope.logIn = function () {
                Auth.logIn($scope.user);
            };

        }
    }

);
