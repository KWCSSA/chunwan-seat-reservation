var app = angular.module('chunwan', []);


app.controller('MainCtrl', function ($scope, $http, $window) {

    var reserved = [];
    $http.get('getReserved.php').success(function (data) {

        console.log(data);

        for(var i=0;i<data.length;i++) {
            reserved.push(data[i].seat_pos);
        }
       

    });
    
    
    $scope.haveSelected = function() {
        if ($scope.selected =="") return false;
        else return true;

        }


    $scope.submit = function () {

        $http.post('submit.php',{
            select:$scope.selected, 
            code:$scope.code,
            user_name:$scope.user_name,
            user_email:$scope.user_email})
        .success(function(data){
            if(data==0){
                alert("预订成功！请前往SLC取票。"); 
                $window.location.reload();

            }

            else if(data==1)
                alert("此验证码已经被使用过了。请联系工作人员。");
            else if(data==2)
                alert("验证码不对劲啊，查查看？或者联系工作人员。");

        });

    };

    // Init layout
    $scope.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L'];
    $scope.cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Set reserved and selected
    $scope.selected = "";

    // seat onClick
    $scope.seatClicked = function (seatPos) {
        console.log("Selected Seat: " + seatPos);

        if($scope.selected == seatPos) $scope.selected = "";
        // new seat, push
        else if(reserved.indexOf(seatPos) < 0) $scope.selected = seatPos;
  
    };

    // get seat status
    $scope.getStatus = function (seatPos) {
        if (reserved.indexOf(seatPos) > -1) {
            return 'isReserved';
        } else if ($scope.selected == seatPos) {
            return 'isSelected';
        }
    };


    // // show selected
    // $scope.showSelected = function () {
    //     if ($scope.selected.length > 0) {
    //         alert("Selected Seats: \n" + $scope.selected);
    //     } else {
    //         alert("No seats selected!");
    //     }
    // };


});

// app.controller('validateCtrl',function($scope){});
