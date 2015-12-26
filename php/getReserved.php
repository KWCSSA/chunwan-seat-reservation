<?php
$db = new mysqli('localhost','root','wdtda2907','chunwan');

$sql = 'SELECT * FROM reserved';

$result = $db -> query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $items = array();
    $count = 0;
    while($row = $result->fetch_assoc()){
    	   $item = array("id" => $row['id'],
    	   				 "user_name" => $row['user_name'],
    	   				 "user_email" => $row['user_email'],
    	   				 "seat_pos" => $row['seat_pos'],
    	   				 "code" => $row['code'],
    	   				 "time" => $row['time'],
    	   				 "getTkt" => $row['getTkt']);
    	   array_push($items,$item);
    }
 
	echo json_encode($items);
} else {
    echo "0 results";
}

$db->close();

?>