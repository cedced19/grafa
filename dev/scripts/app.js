angular.module('Grafa', ['ngCookies'])
.controller('GrafaCtrl', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {
    $http.get('options.json').success(function (data) {
        $scope.options = JSON.stringify(data, null, 7);
    
        $scope.display = function () {
           $cookieStore.put('options', $scope.options);
           var options = JSON.parse($scope.options);
           options.target = '.result';
           options.height = '600';
           functionPlot(options); 
        };
        
        $scope.print = function () {
           window.print();   
        };
        
        if ($cookieStore.get('options') != undefined) {
            $scope.options = $cookieStore.get('options');
        }
        $scope.display();
    });
}]);