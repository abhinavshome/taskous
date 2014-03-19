angular
    .module("taskous.controllers", [])
    .controller({
        MainController: function ($scope, $rootScope, Project, Auth, User) {

            init();

            function init() {
                $scope.user = User.current();
            }

            $scope.logOut = function () {
                Auth.logOut();
            };

        },
        AlertController: function ($scope, $rootScope) {
            $scope.hideAlert = function () {
                $rootScope.showAlert = false;
            }
        },
        TeamController: function ($scope, $rootScope, Team, $filter) {

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

            var refreshOpenTaskCount = function() {
                for(var i= 0, len= $scope.team.length; i<len; i++){
                    console.log($filter('filter')($scope.tasks, {assignee: $scope.team[i].username}));
                    $scope.team[i].openTaskCount = ($filter('filter')($scope.tasks, {assignee: $scope.team[i].username, status: 'open'})).length;
                }
            };

            $scope.$watch('currentProject', refreshTeam);
            $scope.$watch('tasks', refreshOpenTaskCount, true);

        },
        HomeController: function ($scope, $rootScope, User, Task, Parser, Alert, $location, $filter, Project) {

            init();

            function init() {
                $scope.projects = Project.query(function (projects) {
                    if (!$scope.projects.length) {
                        Alert.message('You have no project. Want to create one?');
                        $location.path('/project/create');
                    }
                });

                $scope.taskString = '';

            }

            $scope.selectProject = function (project) {
                $rootScope.currentProject = project;
                console.log('selected', project);
            };

            $scope.createTask = function () {
                var taskObject = Parser.parse($scope.taskString);
                if (!taskObject.assignee)
                    Alert.message('Assignee Invalid. Assigning to self.');
                Task.save({
                    projectId: $rootScope.currentProject.id,
                    desc: taskObject.title,
                    username: taskObject.assignee,
                    status: 'open'
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

            $scope.markCompleted = function (task) {
                Task.update({}, task);
            }

            $scope.clearCompleted = function () {
                var completedTasks = $filter('filter')($scope.tasks, {status: 'completed'});
                var idsToDelete = [];
                for (var i = 0; i < completedTasks.length; i++) {
                    idsToDelete.push(completedTasks[i].id);
                }
                Task.clearDone(idsToDelete).success(function () {
                    refreshTasks();
                })
            }

            $scope.setCurrentProjectAsDefault = function() {
                $scope.user.defaultProjectId = $scope.currentProject.id;
                //console.log($scope.user);
                //User.update({}, $scope.user);
                $scope.user.$update();
            }

            var setDefaultProjectAsCurrent = function() {
                console.log('setDefaultProjectAsCurrent called');
                $rootScope.currentProject = Project.get({}, {id:$scope.user.defaultProjectId});
            }

            var refreshTasks = function () {
                if ($rootScope.currentProject) {
                    $scope.tasks = Task.query({
                        projectId: $rootScope.currentProject.id
                    });
                }
            };

            $scope.$watch('currentProject', refreshTasks);

            $scope.$watch('user', setDefaultProjectAsCurrent);

            $scope.$watch('taskString', function(){
                var thisChar = $scope.taskString.charAt($scope.taskString.length - 1);
                console.log(thisChar);
            })
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
