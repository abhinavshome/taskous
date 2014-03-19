angular.module("taskous", ['taskous.services', 'taskous.controllers', 'ngRoute'])
    .run(function ($rootScope) {
        $rootScope.message = '';
        $rootScope.user = '';
    })
//    .run(function ($rootScope, $location, Auth) {
//        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//            console.log('route changed :: logged in? ', Auth.isLoggedIn());
//            if (!Auth.isLoggedIn())
//                $location.path('/login');
//        });
//    })
    .config(['$routeProvider', function ($routeProvider) {
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
    }])
    .config(function ($provide, $httpProvider, $compileProvider) {
        var elementsList = $();


        $httpProvider.responseInterceptors.push(function ($timeout, $q, $rootScope) {
                return function (promise) {
                    return promise.then(function (successResponse) {
                            return successResponse;

                        }, function (errorResponse) {
                            var showMessage = function (content) {
                                $rootScope.showAlert = true;
                                $rootScope.alert = {
                                    type: 'error',
                                    message: content
                                };
                            };
                            switch (errorResponse.status) {
                                case 401:
                                    showMessage('Wrong usename or password');
                                    break;
                                case 403:
                                    showMessage('You don\'t have the right to do this');
                                    break;
                                case 500:
                                    showMessage('Server internal error: ' + errorResponse.data);
                                    break;
                                default:
                                    showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data);
                            }
                            return $q.reject(errorResponse);
                        }
                    )
                        ;
                };
            }
        )
        ;

        $compileProvider.directive('appMessages', function () {
            var directiveDefinitionObject = {
                link: function (scope, element, attrs) {
                    elementsList.push($(element));
                }
            };
            return directiveDefinitionObject;
        });
    })
;


