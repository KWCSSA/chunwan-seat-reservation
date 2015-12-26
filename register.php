<?php

$db = new mysqli('localhost','root','wdtda2907','chunwan');

// Check connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}


$stmt = $db->prepare(
		"SELECT isUsed FROM codes WHERE code = ?"
	);

	$stmt->bind_param("s", $code);
	// set parameters and execute
	$code = $_POST['code'];
	$name = $_POST['name'];
	$email = $_POST['email'];

  $stmt->execute();

  $stmt->bind_result($isUsed);

  $stmt->fetch();


  $stmt->close();

	echo $isUsed;

  if($isUsed == 0) {

		$stmt = $db->prepare("INSERT INTO users (user_name, user_email, code)
		VALUES (?,?,?)");

		$stmt->bind_param("sss", $name,$email,$code);

		$stmt->execute();

		$stmt->close();



		mysqli_query($db,"UPDATE codes SET isUsed=1 WHERE code='$code'");

		
  }
  mysqli_close($db);

?>