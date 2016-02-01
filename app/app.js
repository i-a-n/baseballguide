// angular goodness
(function() {
    var app = angular.module("cheatSheet", ["firebase","ngRoute"]);

    app.controller("EraSelector", function($scope, $firebaseObject, $routeParams) {
        $scope.eras = eraData;          // replace with firebase
    });

    app.controller("SeasonSelector", function($scope, $firebaseObject, $routeParams) {
        $scope.seasonData = seasonData; // replace with firebase
        $scope.eras = eraData;          // replace with firebase

        $scope.eraSlug = $routeParams.eraSlug;

        $scope.eraObject = $scope.eras.filter(function (era) {
            return era.slug == $scope.eraSlug;
        });

        // filter to only display seasons that match selected era
        $scope.filterByEra = function(season) {
            return season.eraID == $scope.eraObject[0].eraID;
        };
    });

    app.controller("SeasonDetail", function($scope, $firebaseObject, $routeParams) {
        $scope.seasonYear = $routeParams.seasonYear;
        $scope.seasonData = seasonData;             // replace with firebase

        // whittle down the full seasons object to just the one we want
        // mayyyybe firebase can do this? probz not. wtv.
        $scope.seasonObject = $scope.seasonData.filter(function (season) {
            return season.year == $scope.seasonYear;
        });
    });

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'app/_partials/eraSelector.html',
                    controller: 'EraSelector'
                }).
                when('/era/:eraSlug', {
                    templateUrl: 'app/_partials/seasonSelector.html',
                    controller: 'SeasonSelector'
                }).
                when('/seasons/:seasonYear', {
                    templateUrl: 'app/_partials/seasonDetail.html',
                    controller: 'SeasonDetail'
                  }).
                otherwise({
                    redirectTo: '/'
            });
        }
    ]);

    var eraData = [
        { name: 'Dead Ball Era', years: '1912—1922', eraID: 1, slug: 'dead-ball-era' },
        { name: 'Babe Ruth Years', years: '1923—1938', eraID: 2, slug: 'babe-ruth-era' }
    ];

    var seasonData = [
        { seasonID: 1, eraID: 1, year: "1912", champion: "Yankees" },
        { seasonID: 2, eraID: 1, year: "1913", champion: "Red Sox" },
        { seasonID: 3, eraID: 1, year: "1914", champion: "Tigers" },
        { seasonID: 4, eraID: 2, year: "1923", champion: "Yankees" }
    ];

})();
