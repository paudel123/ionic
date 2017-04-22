angular.module('starter')
  .controller('LoginController',
    ['$scope', '$rootScope', '$location', 'loginService', 'sessionStorageService', '$window',
      function ($scope, $rootScope, $location, loginService, sessionStorageService, $window) {
        // reset login status
        loginService.ClearCredentials();

        $scope.login = function () {
          $scope.dataLoading = true;
          loginService.Login($scope.username, $scope.password, function(response) {
            if(response.success) {
              loginService.SetCredentials($scope.username, $scope.password);
              $location.path('/authSuccess');
            } else {
              $scope.error = response.message;
              $scope.dataLoading = false;
            }
          });
        };
      }]);
