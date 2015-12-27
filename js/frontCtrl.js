var app = angular.module('chunwan', []);


app.controller('MainCtrl', function ($scope, $http, $window) {

    var reserved = [];
    $http.get('php/getReserved.php').success(function (data) {

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

        $http.post('php/submit.php',{
            select:$scope.selected, 
            code:$scope.code,
            user_name:$scope.user_name,
            user_email:$scope.user_email
            })
        .success(function(data){
            if(data==0){
                alert("预订成功！请前往SLC取票。"); 
                $window.location.reload();

            }

            else if(data==1)
                alert("此验证码已经被使用过了。请联系工作人员。");
            else if(data==2)
                alert("验证码不对劲啊，查查看？或者联系工作人员。");
            else if (data==3) 
                alert("抱歉,在你犹豫的时候这个位子已经被订掉了TAT,请重新选择座位!");
            
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


   


});


