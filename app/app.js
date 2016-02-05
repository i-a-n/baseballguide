// angular goodness
(function() {
    var app = angular.module("cheatSheet", ["firebase","ngRoute","ngMaterial"]);

    app.controller("EraSelector", function($scope, $firebaseArray, $routeParams) {
        $scope.eras = $firebaseArray(eraRef);

    });

    app.controller("SeasonSelector", function($scope, $firebaseObject, $firebaseArray, $routeParams) {
        var eraSlug = $routeParams.eraSlug;

        var eraRef = new Firebase( firebaseURL+"/data/eras/"+eraSlug );
        var seasonRef = new Firebase( firebaseURL+"/data/seasons" );

        $scope.eraObject = $firebaseObject(eraRef);
        $scope.seasonData = $firebaseArray(seasonRef);

        // filter to only display seasons that match selected era
        $scope.filterByEra = function(season) {
            if ( (season.year >= $scope.eraObject.yearStart)
                 && (season.year <= $scope.eraObject.yearEnd) ) {
                return season;
            }
        };
    });

    app.controller("SeasonDetail", function($scope, $firebaseObject, $routeParams) {
        $scope.seasonYear = $routeParams.seasonYear;
        $scope.seasonRef = new Firebase( firebaseURL+"/data/seasons/"+$scope.seasonYear );

        // whittle down the full seasons object to just the one we want
        // mayyyybe firebase can do this? probz not. wtv.
        $scope.seasonObject = $firebaseObject($scope.seasonRef);
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

    var firebaseURL = "https://baseballcheatsheet.firebaseio.com";
    var eraRef = new Firebase( firebaseURL+"/data/eras" );

})();
