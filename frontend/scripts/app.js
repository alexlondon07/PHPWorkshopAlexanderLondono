var app = angular.module('app', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function ($routerProvider) {
        $routerProvider
            .when('/', {
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
            .otherwise({ redirectTo: '/' });
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
            action: "Save"
        };

        //Setiamos nuestras variables.
        $scope.article = {
            id: "",
            title: "",
            description: ""
        };

        //Funcion para guardar nuestra articulo
        $scope.submit = function () {
            try {
                Articles.save({ article: $scope.article }).$promise.then(function (data) {
                    if (data.response) {
                        angular.copy({}, $scope.article);
                        $scope.settings.success = "The article has been correctly created.!";
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }])

    .controller('EditCtrl', ['$scope', 'Articles', '$routeParams', function ($scope, Articles, $routeParams) {
        $scope.settings = {
            pageTitle: "Update article",
            action: "Save/Update"
        };

        var id = $routeParams.id;

        //Obtenemos informacion de articulo especifico.
        Articles.get({ id: id }, function (data) {
            $scope.article = data.response;
        });

        $scope.submit = function () {
            try {
                Articles.update({ article: $scope.article }, function (data) {
                    $scope.settings.success = "The article has been correctly edited.!";
                });
            } catch (error) {
                console.log(error);
            }
        }
    }])

    //Funcion que nos develve la informacion que necesitemos de nuestra API
    .factory('Articles', ['$resource', function ($resource) {
        return $resource('http://localhost:8888/GitHub/PHPWorkshopAlexanderLondono/Backend/servidor/ArticlesAPI/articles/:id', { id: "@_id" }, {
            update: { method: "PUT", params: { id: "@_id" } }
        })
    }])