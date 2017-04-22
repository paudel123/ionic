'use strict';

angular.module('starter').factory('httpApiService', ['$http', '$q', '$resource', '$log', '$location',
  function ($http, $q, $resource, $log, $location) {

    var host = ''; //globals.apiIntHost; //or apiDevHost

    var postHttpApiSimple = function (path, payload, success, failure, headers) {
      postHttpApi("'https://nme-user-service.herokuapp.com" + '/' + path, payload, headers).
      then(function (data) {
        success(data);
      }, function (reason) {
        failure(reason);
      });
    };

    var deferredBasicSearch = {};

    var postHttpApi = function (api, data, headers) {
      $log.debug('Posting API JSON to ' + api);

      var start = new Date().getTime();

      var deferred = $q.defer(); //promise

      $http.defaults.headers.post['Accept'] = 'application/json';

      $http.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

      //all endpoints must now be secured, not just the ones in the securedEndpoints list
     // $http.defaults.headers.post['Authorization'] = 'Bearer ' + sessionStorageService.fetchValue('iam_code');

      $http.post(host + api, data, {timeout: 600000})
        .success(
          function (data, status, headers, config) {
            var end = new Date().getTime();
            $log.debug(config.url + ' response received: seconds passed - ', (end - start) / 1000);

            deferred.resolve(data);
          }).error(
        // when an authorisation error is received the user will be redirected to the login page
        function (data, status, headers, config) {
          var end = new Date().getTime();
          $log.debug('error response received: seconds passed - ', (end - start) / 1000);

          /*if (data && data.longDescription) {
            deferred.reject(data.longDescription);
          } else if (data && data.shortDescription) {
            deferred.reject(data.shortDescription);
          } else {
            deferred.reject(status);
          }*/
          if (status === 401) {

            $log.info("401 exception");

            deferred.reject(status);
            //unauthorised access, redirect to login

            //sessionStorageService.remove('iam_code');

           // var sourceForgeURL = authService.getLoginURL();

          //  $log.debug('Redirecting to the oauth login page ' + sourceForgeURL);
           // window.location.href = sourceForgeURL;

          }
        }
      );

      //for rejectDeferredBasicSearch()
      if (api === globals.apiHost + '/' + globals.apiSearch) {
        $log.debug(api + ': is kept in deferredBasicSearch');
        deferredBasicSearch = {api: api, deferred: deferred};
      }

      //});

      return deferred.promise;
    };





    return {
      //use $http for a post - most used for manageUI
      postHttpApiSimple: postHttpApiSimple,
      postHttpApi: postHttpApi
    };

  }]);
