<?php
$db = new mysqli('localhost','root','wdtda2907','chunwan');

if($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
}


header('Content-type: application/json');

$list = $_POST["select"];

foreach ($list as $lis) echo $lis;

$db->close();


?>