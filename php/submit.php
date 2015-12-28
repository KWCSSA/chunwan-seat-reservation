<?php

$vip = array('A8','A9','B8','B9','C8','C9');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$selected = $request->select;
$code = $request->code;
$name = $request->user_name;
$email = $request->user_email;


$db = new mysqli('localhost','root','wdtda2907','chunwan');

$result=$db->query("SELECT * FROM reserved WHERE seat_pos = '$selected'");


if($result->num_rows > 0)    echo 3;



else if($result = $db->query("SELECT isUsed FROM codes WHERE code = '$code'")) {
	if($result->num_rows >0) {

		$row = $result->fetch_assoc();
		$isUsed = $row['isUsed'];

		if($isUsed == 0) {

			if(strlen($code)==6) {
				if(!in_array($selected,$vip)) {
					echo 4;
					die();
					exit();
			}

			else if(strlen($code)==8 ) {
				if(in_array($selected, $vip)) {
					echo 5;
					die();
					exit();
				}
			}
		}

			$stmt = $db->prepare("INSERT INTO reserved (user_name, user_email, seat_pos,code)
				VALUES (?,?,?,?)");
			$stmt->bind_param("ssss", $user_name, $user_email, $seat_pos, $code);

			$user_name=$name;
			$user_email=$email;
			$seat_pos=$selected;
			$stmt->execute();
		    $stmt->close();

			if($db->query ("UPDATE codes SET isUsed=1 WHERE code='$code'") === TRUE) {
				echo 0;
			}
			
		}

		else if($isUsed == 1) {
			echo 1;
		}
	}
	else echo 2;
}

		




?>





