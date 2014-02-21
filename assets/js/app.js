angular.module("taskous", ['taskous.services', 'taskous.controllers', 'ngRoute'])
        .run(function($rootScope) {
            $rootScope.message = '';
            $rootScope.user = '';
        })
        .run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {

                $rootScope.$on("$routeChangeStart", function(event, next, current) {
                    if (!Auth.isLoggedIn())
                        $location.path('/login');
                });
            }])
        .config(['$routeProvider', function($routeProvider) {
                $routeProvider
                        .when('/', {
                            controller: 'HomeController',
                            templateUrl: '/partials/home.html'
                        })
                        .when('/login', {
                            controller: 'LoginController',
                            templateUrl: '/partials/login.html'
                        })
                        .when('/project/create', {
                            controller: 'ProjectController',
                            templateUrl: '/partials/create_project.html'
                        })
                        .otherwise({
                            redirectTo: '/'
                        });
            }]);


