/**
 * 
 */
(function() {
	var app = angular.module("projectViewer"); 
	app.controller('signupForm', ['$scope','$http','$window','$location',function($scope,$http,$window,$location) {
		
		$scope.$watch('email', function(newvalue,oldvalue) {
			if ($scope.signupform.email.$invalid && !$scope.signupform.email.$error.non_exist){
				$scope.signupform.email.$invalid = true;
				$scope.signupform.email.$setValidity('nonexist', true);
			}
	    });
		$scope.create = function(){
			urlparam = $location.absUrl();
			var vars = urlparam.split("?ID=");
			restartType = vars[1];
        	var param = {
        			username: $scope.email,
					password: $scope.password,
					fullname: $scope.fullname,
					phone: $scope.phone,
					address: $scope.department,
					email: $scope.email,
					mobile: $scope.phone2,
					restar_type: restartType,
					cmnd: restartType,
					CMND: restartType,
					enabled: 0,
					packageid: '2'
			};
        	console.log(param);
			return $http.post(contextPath + '/system/user/register', param).then(
					function(response) {
						if(response.data.success){
							//$window.location.href="mainAdmin.do"; 
							$window.location.href="mainStatistic.do"; 
						}
						else{
							$scope.signupform.email.$invalid = true;
							$scope.signupform.email.$setValidity('nonexist', false);
						}
						return '1';
					}, function(errResponse) {
						console.error('Can\'t save project!');
					});
        }
	}]);		
}());