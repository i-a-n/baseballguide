// angular goodness
(function() {
    var app = angular.module("cheatSheet", ["firebase","ngRoute"]);

    app.controller("SeasonRecaps", function($scope, $firebaseObject) {
        this.eras = eraData;
    });

    var eraData = [
        { name: 'Dead Ball Era', years: '1912—1922' },
        { name: 'Babe Ruth Years', years: '1923—1938' }
    ];
})();
