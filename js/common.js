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

UrlShorteningApp.factory("UrlLongeringfactory", ["$q", "$http", function ($q, $http) {
        var deferred = $q.defer();

        return{
            longerUrl: function (shortUrl) {
                return  $http.get('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCq5fBz2eo3gBgCpVM_-CUu4OClLEe48ow&shortUrl=' + shortUrl).success(function (data) {
                    deferred.resolve(data);
                }).
                        error(function (error) {
                            alert("Unable to crete actual  URL")
                        });
                return deferred.promise;
            }
        }

    }])


UrlShorteningApp.controller("UrlShortening", ["$scope", "$http", "UrlShorteningfactory","UrlLongeringfactory", function ($scope, $http, UrlShorteningfactory,UrlLongeringfactory) {
        $scope.urlShow = false;
        $scope.checkUrl = function (longUrl) {
            console.log($scope.userForm.longUrl.$invalid,$scope.longUrl);
            if ((longUrl === null) || ($scope.userForm.longUrl.$invalid))
            {
                $scope.urlShow = false;
            }
                
        }
         $scope.checkUrlShort = function (sortUrl) {
            if ((sortUrl === null) || ($scope.userForm.shortUrlCreate.$invalid))
            {
                $scope.urlShowLong = false;
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
        
         $scope.UrlLongering = function (shortUrl) {
            UrlLongeringfactory.longerUrl(shortUrl).success(function (data) {
                $scope.longerUrl=data.longUrl;
                if(data.longUrl)
                $scope.urlShowLong = true;
            }).
                    error(function (error) {
                        $scope.error = error.error.message;
                    })
        }
    }])