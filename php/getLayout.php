<?php 
	$rows = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J','K','L');
	$cols = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
	$vip = array('A8','A9','B8','B9','C8','C9');
	$thir = array('A3','A4','A5','B3','B4','B5');


	$collec = array($rows,$cols,$vip,$thir);

	echo json_encode($collec);

?>