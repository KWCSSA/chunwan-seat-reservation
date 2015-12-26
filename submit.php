<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$selected = $request->select;
$code = $request->code;
$name = $request->user_name;
$email = $request->user_email;

$db = new mysqli('localhost','root','wdtda2907','chunwan');

if($result = $db->query("SELECT isUsed FROM codes WHERE code = '$code'")) {
	if($result->num_rows >0) {

		$row = $result->fetch_assoc();
		$isUsed = $row['isUsed'];

		if($isUsed == 0) {

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





