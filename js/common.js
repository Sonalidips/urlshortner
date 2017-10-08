'use strict'


var UrlShorteningApp = angular.module("UrlShorteningApp", []);


UrlShorteningApp.factory("UrlShorteningfactory", ["$q", "$http", function ($q, $http) {
        var deferred = $q.defer();

        return{
            shortenUrl: function (longUrl) {
                return  $http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCq5fBz2eo3gBgCpVM_-CUu4OClLEe48ow',
                        {longUrl: longUrl}).success(function (data) {
                    deferred.resolve(data);
                }).
                        error(function (error) {
                            alert("Unable to shorten the URL")
                        });
                return deferred.promise;
            }
        }

    }])


UrlShorteningApp.controller("UrlShortening", ["$scope", "$http", "UrlShorteningfactory", function ($scope, $http, UrlShorteningfactory) {
        $scope.urlShow = false;
        $scope.checkUrl = function (longUrl) {
            console.log($scope.userForm.longUrl.$invalid,$scope.longUrl);
            if ((longUrl === null) || ($scope.userForm.longUrl.$invalid))
            {
                $scope.urlShow = false;
            }
                
        }

        $scope.UrlShortening = function (longUrl) {
            UrlShorteningfactory.shortenUrl(longUrl).success(function (data) {
                $scope.shortUrl = data.id;
                if(data)
                $scope.urlShow = true;
            }).
                    error(function (error) {
                        $scope.error = error.error.message;
                    })
        }
    }])