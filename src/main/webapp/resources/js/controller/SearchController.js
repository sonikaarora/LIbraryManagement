app.controller('searchController', [ "$scope", "$http", "$window", "$state",
		"$stateParams", "$rootScope",
		function($scope, $http, $window, $state, $stateParams, $rootScope) {

			$scope.username = $stateParams.username;

			$scope.hideMessageDiv = function() {
				document.getElementById('messagediv').style.display = 'none';
			}

			$scope.createMessageDiv = function(message) {
				// document.getElementById("createButton").disabled = false;
				document.getElementById('messagediv').innerHTML = message;
				document.getElementById('messagediv').style.display = 'block';
			}

			$scope.validate = function(book) {
				$scope.book = book
				if (book == undefined) {
					return false;
				}

				if (book.author == undefined || book.author.length == 0) {
					return false;
				}
				if (book.title == undefined || book.title.length == 0) {
					return false;
				}
				if (book.callNo == undefined || book.callNo.length == 0) {
					return false;
				}
				if (book.publisher == undefined || book.publisher.length == 0) {
					return false;
				}
				if (book.yop == undefined || book.yop.length == 0) {
					return false;
				}
				if (book.location == undefined || book.location.length == 0) {
					return false;
				}
				if (book.noc == undefined || book.noc.length == 0) {
					return false;
				}
				if (book.keywords == undefined || book.keywords.length == 0) {
					return false;
				}
				return true;

			}

			$scope.add = function(book) {
				var res = $scope.validate(book);
				if (res == false) {
					$scope.createMessageDiv("Please provide all fields");
				} else {
					$scope.hideMessageDiv();

					var data = {
						username : $scope.username,
						data : book
					}
					$http({
						url : 'addbook',
						method : "POST",
						headers : {
							'Content-Type' : 'application/json'
						},
						data : {
							'book' : data
						}

					}).then(function(response) {
						$scope.createMessageDiv("Book added successfuly!");
					}, function(response) { // optional
						$scope.hideMessageDiv();
						alert("no" + response);
					});
				}
			}

			if ($stateParams.books != undefined) {
				$scope.books = JSON.parse($stateParams.books);
			}

			$scope.books = {
				booksdata : $scope.books,
				selected : {}
			};

			$scope.search = function(keyword) {
				if (keyword == undefined || keyword.length == 0) {
					$scope.createMessageDiv("Please provide search criteria");
				} else {
					$scope.hideMessageDiv();
					$scope.keyword = keyword
					$http({
						url : 'search',
						method : "POST",
						headers : {
							'Content-Type' : 'application/json'
						},
						data : {
							'keyword' : keyword
						}

					}).then(function(response) {
						var aa = JSON.stringify(response.data);
						$state.go("update", {
							books : aa
						});
						// alert("yes");
					}, function(response) { // optional
						alert("no" + response);
					});
				}

			}

			$scope.selection = function(choice) {
				$state.go("addbook");
			}

			// gets the template to ng-include for a table row / item
			$scope.getTemplate = function(data) {
				if (data.bookId === $scope.books.selected.bookId)
					return 'edit';
				else
					return 'display';
			};

			$scope.editBook = function(data) {
				$scope.books.selected = angular.copy(data);
			};

			$scope.deleteBook = function(data) {
				var key = $scope.keyword;
				$scope.dataList = [];
				angular.forEach(data, function(v) {
					if (v.selection != undefined) {
						if (v.selection == true) {
							$scope.dataList.push(v.bookId);
						}
					}
				});

				$http({
					url : 'delete',
					method : "POST",
					headers : {
						'Content-Type' : 'application/json'
					},
					data : {
						'bookIds' : $scope.dataList
					}

				}).then(function(response) {
					// alert("yes");
					$scope.search($scope.keyword);
				}, function(response) { // optional
					alert("no" + response);
				});
			};

			$scope.saveBook = function(idx) {
				console.log("Saving contact");
				// $scope.books.booksdata[idx] =
				// angular.copy($scope.books.selected);
				$http({
					url : 'update',
					method : "POST",
					headers : {
						'Content-Type' : 'application/json'
					},
					data : {
						'book' : $scope.books.booksdata[idx]
					}

				}).then(function(response) {
					alert("yes");
				}, function(response) { // optional
					$scope.reset();
				});

				$scope.reset();
			};

			$scope.reset = function() {
				$scope.books.selected = {};
			};

			$scope.addisbn = function(isbn) {
				$http({
					url : 'isbnbook',
					method : "POST",
					headers : {
						'Content-Type' : 'application/json'
					},
					data : {
						'isbn' : isbn
					}

				}).then(function(response) {

					var aa = JSON.stringify(response.data);
					$scope.data = JSON.parse(aa);
					$scope.book.title = $scope.data.title;
					$scope.book.publisher = $scope.data.publisher;
					$scope.book.yop = $scope.data.yop;
					$scope.book.author = $scope.data.author;

				}, function(response) { // optional
					alert("no" + response);
				});
			}

			$scope.navigate = function() {
				$state.go("addbook");
			}

		} ]);