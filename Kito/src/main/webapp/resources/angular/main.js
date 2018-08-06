var app = angular.module("app", ["pageslide-directive"]);

    app.controller('pageslideCtrl', ['$scope','$http', function ($scope, $http) {

        $scope.checked = false; // This will be binded using the ps-open attribute

        $scope.toggle = function () {
            $scope.checked = !$scope.checked
        }
        $scope.create = function(){
        	var param = {
				username : $scope.username,
				phone : $scope.phone,
				email: $scope.email,
				password: $scope.password
			};
        	console.log(param);
			return $http.post(contextPath + '/system/user/register', param).then(
					function(response) {
						/*Glb_projectId = response.data.data;*/
						console.log(response.data);
						if(response.data.success){
	        	         	window.location = urlDefault;  
						}
						return '1';
					}, function(errResponse) {
						console.error('Can\'t save project!');
					});
        }

    }]);