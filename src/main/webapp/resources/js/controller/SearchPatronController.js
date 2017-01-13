app.controller('searchPatronController',["$scope", "$http","$window","$state","$stateParams","$rootScope", function($scope, $http,$window,$state,$stateParams,$rootScope) {
	  
	$scope.username = $stateParams.username;
	
	$scope.hideMessageDiv = function() {
		document.getElementById('messagediv').style.display = 'none';
	}

	$scope.createMessageDiv = function(message) {
		// document.getElementById("createButton").disabled = false;
		document.getElementById("messagediv").innerHTML = message;
		document.getElementById("messagediv").style.display = 'block';
	}
	
	$scope.search = function(keyword)
	    {
		
		if (keyword == undefined || keyword.length == 0) 
		{
	    
		$scope.createMessageDiv("Please provide search criteria");
		}
		else {
			$scope.hideMessageDiv();
		var data = {username : $scope.username, keyword :data}
	    	$scope.keyword = keyword;
	    	    $http({
	    	        url: 'searchPatron',
	    	        method: "POST",
	    	        headers: {
	    	            'Content-Type': 'application/json'
	    	        },
	    	        data: { 'keyword' : keyword}
	    	        
	    	    })
	    	    .then(function(response) {
	    	    	var aa = JSON.stringify(response.data);
	    	    	$state.go("cart", { res: aa});
	    	    	 
	    	    }, 
	    	    function(response) { // optional
	    	    	alert("no"+response);
	    	    });
	  
		}
	    }
	
	$scope.searchText = "";
	$scope.searchResults = [];
	$scope.cartItems = [];
	$scope.confirmedItems = [];
	
	
	 $scope.navigate = function(){
		 
		 $http({
		        url: 'getBooksForUser',
		        method: "GET",
		        headers: {
		            'Content-Type': 'application/json'
		        }
		        
		    })
		    .then(function(response) {
	    	    	$scope.searchResults =  JSON.stringify(response.data);
	    	    	$state.go("userprofile", { books: $scope.searchResults});
		    }, 
		    function(response) { // optional
		    //	$scope.reset();
		    });
	    }
	    
	 $scope.navigate();
}]);