angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, $q, AuthenticationService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  //--------------------------------------------
   $scope.login = function(user) {

     if(typeof(user)=='undefined'){
        $scope.showAlert('Please fill username and password to proceed.');
        return false;
     }

     var postdata = {};
     postdata.username= user.username;
     postdata.password =user.password;

     AuthenticationService.Login(user, function (response) {
       if (response.success) {
        // AuthenticationService.SetCredentials(username, password);
         $location.path('/app/dashboard');
       } else {
         //FlashService.Error(response.message);
         //vm.dataLoading = false;
       }
     });

	};


  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Warning Message',
		 template: msg
	   });
	 };
  //--------------------------------------------
})

.controller('ProfilesCtrl', function($scope , Profiles) {
    $scope.profiles = Profiles.all();
})

.controller('ProfileCtrl', function($scope, $stateParams , Profiles) {
	$scope.profile = Profiles.get($stateParams.profileId);
})

.controller('DashCtrl', function($scope, $stateParams , Profiles) {
	$scope.profiles = Profiles.all();
})

.controller('PayeeCtrl', function($scope, $stateParams , Profiles){
	$scope.profiles = Profiles.all();
});

