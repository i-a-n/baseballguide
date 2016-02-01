// angular goodness
(function() {
    var app = angular.module("cheatSheet", ["firebase","ngRoute"]);

    app.controller("SeasonSelector", function($scope, $firebaseObject, $routeParams) {
        $scope.eras = eraData;          // replace with firebase
        $scope.eraSelected = 0;
        $scope.seasonData = seasonData; // replace with firebase

        // helper function to set which era to dive into
        $scope.selectEra = function(era) {
            $scope.eraSelected = era;
        };

        // filter to only display seasons that match selected era
        $scope.filterByEra = function(season) {
            return season.eraID === $scope.eraSelected;
        };
    });
    app.controller("SeasonDetail", function($scope, $firebaseObject, $routeParams) {
        $scope.seasonID = $routeParams.seasonID;
        $scope.seasonData = seasonData;             // replace with firebase

        // whittle down the full seasons object to just the one we want
        // mayyyybe firebase can do this? probz not. wtv.
        $scope.seasonObject = $scope.seasonData.filter(function (season) {
            return season.seasonID == $scope.seasonID;
        });
    });

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/seasons', {
                    templateUrl: 'app/_partials/seasonSelector.html',
                    controller: 'SeasonSelector'
                }).
                when('/seasons/:seasonID', {
                    templateUrl: 'app/_partials/seasonDetail.html',
                    controller: 'SeasonDetail'
                  }).
                otherwise({
                    redirectTo: '/seasons'
            });
        }
    ]);

    var eraData = [
        { name: 'Dead Ball Era', years: '1912—1922', eraID: 1 },
        { name: 'Babe Ruth Years', years: '1923—1938', eraID: 2 }
    ];

    var seasonData = [
        { seasonID: 1, eraID: 1, year: "1912", champion: "Yankees" },
        { seasonID: 2, eraID: 1, year: "1913", champion: "Red Sox" },
        { seasonID: 3, eraID: 1, year: "1914", champion: "Tigers" },
        { seasonID: 4, eraID: 2, year: "1923", champion: "Yankees" }
    ];

})();
