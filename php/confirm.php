<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->id;

$db = new mysqli('localhost','root','wdtda2907','chunwan');

if($db->query("UPDATE reserved SET getTkt=1 WHERE id = '$id'") ===TRUE) {
	echo "success";
}
else echo "fail";



?>
