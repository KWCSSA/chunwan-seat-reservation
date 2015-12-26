<?php
$db = new mysqli('localhost','root','wdtda2907','chunwan');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$id = $request -> id;
$code = $request -> code;



if($db->query("DELETE FROM reserved WHERE id = '$id'")===TRUE){
	if($db->query("UPDATE codes SET isUsed=0 WHERE code='$code'")===TRUE)
	echo "success";
	else echo "fail";
}
	else echo "fail";

?>