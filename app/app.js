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

        $scope.getImgURL = function(season) {
            if( season.hasCardImg === 1 ) {
                return "/img/seasons/" +season.year+ "/card-1.jpg";
            }
            else {
                return "/img/seasons/card-default.jpg";
            }
        }

        // filter to only display seasons that match selected era
        $scope.filterByEra = function(season) {
            if ( (season.year >= $scope.eraObject.yearStart)
                 && (season.year <= $scope.eraObject.yearEnd) ) {
                return season;
            }
        };
    });

    app.controller("SeasonDetail", function($scope, $firebaseObject, $firebaseArray, $routeParams, $mdMedia) {
        $scope.seasonYear = $routeParams.seasonYear;
        $scope.seasonRef = new Firebase( firebaseURL+"/data/seasons/"+$scope.seasonYear );

        // just to get breakpoints. kidna dumb this isn't better integrated
        $scope.$mdMedia = $mdMedia;

        $scope.awardsNL = new Firebase( firebaseURL+"/data/seasons/"+$scope.seasonYear+"/awards/national" );
        $scope.awardsAL = new Firebase( firebaseURL+"/data/seasons/"+$scope.seasonYear+"/awards/american" );

        $scope.seasonObject = $firebaseObject($scope.seasonRef);
        $scope.awardsObjectNL = $firebaseArray( $scope.awardsNL );
        $scope.awardsObjectAL = $firebaseArray( $scope.awardsAL );

        var heroImgURL = "/img/seasons/" +$scope.seasonYear+ "/hero-1.jpg";

        // set card image. if no card image, set to default.
        var request = new XMLHttpRequest();
        request.open('HEAD', heroImgURL, false);
        request.send();
        if(request.status != 200) {
            heroImgURL = "/img/seasons/hero-default.jpg";
        }

        document.styleSheets[0].addRule(
            '.masthead:before',
            'background-image:url('+heroImgURL+')'
        );
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
