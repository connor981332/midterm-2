angular.module('shopping',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.items = [];
    $scope.cart = [];
    $scope.getAll = function() {
			return $http.get('/shopping').success(function(data){
				angular.copy(data, $scope.items);
			});
    };
    $scope.getAll();
    $scope.create = function(item) {
			return $http.post('/shopping', item).success(function(data){
				$scope.items.push(data);
			});
    };
    $scope.submitCart = function() {
      console.log("In Submit Cart");
      angular.forEach($scope.items, function(value,key) {
        if(value.selected) {
          $scope.purchase(value);
          $scope.cart.push(value);
        }
      });
    }

    $scope.purchase = function(item) {
      return $http.put('/shopping/' + item._id + '/purchase')
        .success(function(data){
          console.log("Purchase worked");
          item.purchases += 1;
        });
    };

    $scope.addItem = function() {
      var newObj = {Name:$scope.itemName,purchases:0,price:$scope.itemPrice,urlvalue:$scope.itemURL};
      $scope.create(newObj);
      $scope.itemName = '';
      $scope.itemURL = '';
      $scope.itemPrice = '';
    }
    
    // $scope.addItem = function() {
    //   var newObj = {Name:'yellow',purchases:0};
    //   $scope.create(newObj);
    //   $scope.formContent = '';
    // }
    
    $scope.purchase = function(item) {
      return $http.put('/shopping/' + item._id + '/purchase')
        .success(function(data){
          console.log("Purchase worked");
          item.purchases += 1;
        });
    };


    $scope.incrementPurchases = function(item) {
      $scope.purchase(item);
    };
 
    $scope.delete = function(item) {
      console.log("Deleting Item "+item.Name+" ID "+item._id);
      $http.delete('/shopping/'+item._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);
