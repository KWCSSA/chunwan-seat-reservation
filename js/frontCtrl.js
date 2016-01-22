var app = angular.module('chunwan', []);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.controller('MainCtrl', function ($scope, $http, $window) {

    var reserved = [];
    $scope.vip=[];
    $scope.thir=[];
    $scope.oneLimit=[];
    $scope.balLimit=[];
    $scope.space = " ";

    $http.get('php/getLayout.php').success(function(data) {
        $scope.rows = data[0];
        $scope.cols = data[1];
        $scope.oneLimit = data[2];
        $scope.vip = data[3];
        $scope.rowsTwo = data[4];
        $scope.balLimit = data[5];
        reserved = data[6];
        console.log(data);
        
    });

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
            console.log(data);
            if(data==0){
                alert("预订成功！请前往SLC取票。"); 
                $window.location.reload();

            }

            else if(data==1)
                alert("失败：此验证码已经被使用过了。请联系工作人员。");
            else if(data==2)
                alert("失败：验证码不对劲啊，查查看？或者联系工作人员。");
            else if (data==3) 
                alert("失败：抱歉,在你犹豫的时候这个位子已经被订掉了TAT,请重新选择座位!");
            else if (data ==4) {
                alert("失败：此验证码只能选择VIP座位。");
            }
            else if (data==5) {
                alert("失败：此验证码只能选择普通座位。");
            }

              else if (data==6) {
                alert("失败：此验证码只能选择THIR座位。");
            }
            
        });

    };

  

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
            return 'url(images/seat_reserved_2.png)';
        } else if ($scope.selected == seatPos) {
            return 'url(images/seat_selected_2.png)';
        }
          else if ($scope.vip.indexOf(seatPos) > -1) {
             return 'url(images/vip_available_2.png)';
          }
          else if($scope.thir.indexOf(seatPos) > -1) {
            return 'url(images/thir_available.png)';
          }
          else return 'url(images/seat_available_3.png)';
    };

    $scope.isVIP = function(seatPos) {
        return $scope.vip.indexOf(seatPos)> -1;
    }


    $scope.isThir = function(seatPos) {
        return $scope.thir.indexOf(seatPos)> -1;
    }

    $scope.exceed = function(row,col,pos) {
        var rowNum;


        switch (row) {
            case 'A': rowNum = 0; break;
            case 'B': rowNum = 1; break;
            case 'C': rowNum = 2; break;
            case 'D': rowNum = 3; break;
            case 'E': rowNum = 4; break;
            case 'F': rowNum = 5; break;
            case 'G': rowNum = 6; break;
            case 'H': rowNum = 7; break;
            case 'J': rowNum = 8; break;

        }

        if(pos == 1) {
            if (col > $scope.oneLimit[rowNum]) return true;
        else return false;
        }
        else if (pos == 2) {
            if(col > $scope.balLimit[rowNum]) return true;
            else return false;
        }

    }


    $scope.getShift = function (row,pos) {
        var rowNum;
    switch (row) {
            case 'A': rowNum = 0; break;
            case 'B': rowNum = 1; break;
            case 'C': rowNum = 2; break;
            case 'D': rowNum = 3; break;
            case 'E': rowNum = 4; break;
            case 'F': rowNum = 5; break;
            case 'G': rowNum = 6; break;
            case 'H': rowNum = 7; break;
            case 'J': rowNum = 8; break;

        }
       if (pos==1) var shift = (50 - $scope.oneLimit[rowNum])/2 * 15 + 200;
       if (pos==2) var shift = (75 - $scope.balLimit[rowNum])/2 * 15 + 20;
        return shift+"px";
   

    }



   


});


