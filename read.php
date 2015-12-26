<?php
$db = new mysqli('localhost','root','wdtda2907','chunwan');

$handle = fopen("code.txt", "r");
if ($handle) {
    while (!feof($handle)) {
        $buffer = fgets($handle);
        $db -> query("INSERT INTO codes(code) VALUE ('{$buffer}')");
        echo $buffer.'<br>';
    }
    fclose($handle);
}
?>