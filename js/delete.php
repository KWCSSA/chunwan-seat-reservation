<?php
$db = new mysqli('localhost','root','wdtda2907','chunwan');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = $request -> id;

echo "success";

if($db->query("DELETE FROM reserved WHERE id = '$id'")===TRUE)
	echo "success";
else echo "fail";

?>