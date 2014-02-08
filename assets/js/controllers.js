angular.module("taskous.controllers", [])
    .controller('TopMenuController', function($scope, $rootScope, Project) {
        $scope.projects = Project.query(function() {
            $rootScope.currentProject = $scope.projects[0];
        });
        $scope.selectProject = function(project) {
            $rootScope.currentProject = project;
            console.log('selected', project);
        }
    })
    .controller('HomeController', function($scope, $rootScope, User, Task) {
        $scope.createTask = function() {
            var components = $scope.taskString.split('@');
            console.log($rootScope.currentProject);
            Task.save({
                projectId: $rootScope.currentProject.id,
                desc: components[0].trim()
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