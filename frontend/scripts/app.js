var app = angular.module('app', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function ($routerProvider) {
        $routerProvider
            .when('/home', {
                templateUrl: 'templates/list.html',
                controller: 'HomeCtrl'
            })
            .when('/edit/:id', {
                templateUrl: 'templates/edit.html',
                controller: 'EditCtrl'
            })
            .when('/create/', {
                templateUrl: 'templates/create.html',
                controller: 'CreateCtrl'
            })
            .otherwise({ redirectTo: '/home' });
    }])


    //Contraoladores de nuestra API
    .controller('HomeCtrl', ['$scope', 'Articles', '$route', function ($scope, Articles, $route) {
        Articles.get(function (data) {
            $scope.articles = data.response;
        })

        //Funcion para eliminar un articulo
        $scope.remove = function (id) {
            var acepted = confirm('You are deleting information irreversibly.\n¿You want to continue?');
            if (acepted) {
                Articles.delete({ id: id }).$promise.then(function (data) {
                    if (data.response) {
                        $route.reload();
                    }
                })
            }
        }
    }])

    //Controlador para agregar un nuevo articulo
    .controller('CreateCtrl', ['$scope', 'Articles', function ($scope, Articles) {
        $scope.settings = {
            pageTitle: "Add article",
            action: "Add"
        };

        //Setiamos nuestras variables.
        $scope.article = {
            id: "",
            title: "",
            description: ""
        };

        //Funcion para guardar nuestra articulo
        $scope.submit = function () {
            Articles.save({ article: $scope.article }).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.article);
                    $scope.settings.success = "The article has been correctly created.!";
                }
            })
        }
    }])

    .controller('EditCtrl', ['$scope', 'Articles', '$routeParams', function ($scope, Articles, $routeParams) {
        $scope.settings = {
            pageTitle: "Edit article",
            action: "Edit"
        };

        var id = $routeParams.id;

        Articles.get({ id: id }, function (data) {
            $scope.article = data.response;
        });

        $scope.submit = function () {
            Articles.update({ article: $scope.article }, function (data) {
                $scope.settings.success = "The article has been correctly edited.!";
            });
        }
    }])

    .controller('AddForecastCtrl', ['$scope', 'Forecast', 'Articles', '$route', function ($scope, Forecast, Articles, $route) {
        Articles.get(function (data) {
            $scope.Articles = data.response;
        })

        $scope.settings = {
            pageTitle: "Add pronóstico a una ciudad",
            action: "Add"
        };

        $scope.forecast = {
            forecast: "",
            date: "",
            id_article: ""
        };

        $scope.submit = function () {
            Forecast.save({ forecast: $scope.forecast }).$promise.then(function (data) {
                if (data.response) {
                    angular.copy({}, $scope.forecast);
                    $scope.settings.success = "El pronóstico ha sido agregado correctamente!";
                }
            })
        }
    }])

    .controller('ViewCtrl', ['$scope', 'Forecast', 'Articles', '$routeParams', '$route', function ($scope, Forecast, Articles, $routeParams, $route) {
        var id = $routeParams.id;

        Articles.get({ id: id }, function (data) {
            $scope.article = data.response;
        });

        Forecast.get({ id: id }, function (data) {
            console.log(data.response);
            $scope.forecast = data.response;
        })

        $scope.remove = function (id) {
            Forecast.delete({ id: id }).$promise.then(function (data) {
                if (data.response) {
                    $route.reload();
                }
            })
        }
    }])

    //Funcion que nos develve la informacion que necesitemos de nuestra API
    .factory('Articles', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/GitHub/PHPWorkshopAlexanderLondono/Backend/servidor/ArticlesAPI/articles/:id', { id: "@_id" }, {
            update: { method: "PUT", params: { id: "@_id" } }
        })
    }])