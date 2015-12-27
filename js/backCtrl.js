var app = angular.module('back',['smart-table']);

app.controller('basicsCtrl', ['$scope', '$http','$filter','$window',function (scope,http,filter,window) {

	scope.rowCollection = [];
	http.get('../php/getReserved.php').success(function (data) {
        console.log(data);
        scope.rowCollection = data;
    });

    scope.displayedCollection = [].concat(scope.rowCollection);

    scope.removeRow = function(row) {
 
    	http.post('../php/delete.php',row).success(function(data) {
    		console.log(data);
    		if(data==="success")  window.location.reload();
    	});

    }

    scope.getTicket = function(row) {
    	http.post('../php/confirm.php',row).success(function(data) {
    		console.log(data);
    		if(data==="success") window.location.reload();
    	});
    }

    scope.tktStatus = function(getTkt) {
    	return getTkt==0?"未取票":"已取票";
    }
    

}]);

app.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    }
}]);