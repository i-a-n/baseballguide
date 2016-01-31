// angular goodness
(function() {
    var app = angular.module("cheatSheet", ["firebase","ngRoute"]);

    app.controller("SeasonSelector", function($scope, $firebaseObject) {
        $scope.eras = eraData;
    });
    app.controller("SeasonDetail", function($scope, $firebaseObject) {
        $scope.recapString = recapString;
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
      }]);

    var eraData = [
        { name: 'Dead Ball Era', years: '1912—1922', eraID: 1 },
        { name: 'Babe Ruth Years', years: '1923—1938', eraID: 2 }
    ];

    var recapString = "Stuff happened!";
})();
