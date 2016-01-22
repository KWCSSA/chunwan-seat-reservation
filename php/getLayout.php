<?php 
	$rowsOne = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','J');
	$rowsTwo = array('A', 'B', 'C', 'D', 'E', 'F');
	$colsOne = array();
	for($i=1;$i<=75;$i++) {
		array_push($colsOne,$i);		
	}
	$oneLimit = array(24,29,34,41,41,45,48,49,50);
	$balLimit = array(43,43,45,47,61,75);
	$reserved = array();

	$vip = array();
	addVIP(9,26,'C',$vip);
	addVIP(11,31,'D',$vip);
	addVIP(11,31,'E',$vip);
	addVIP(12,34,'F',$vip);
	addVIP(13,36,'G',$vip);
	addVIP(12,38,'H',$vip);
	addVIP(12,39,'J',$vip);

	addReserved(1,24,'A',$reserved);
	addReserved(1,29,'B',$reserved);
	addReserved(19,31,'H',$reserved);
	addReserved(19,32,'J',$reserved);
	array_push($reserved,"OD1");
	array_push($reserved,"OD41");
	for ($i=12;$i<=32;$i++) {
		array_push($reserved,'BA'.$i);
	}

	function addVIP($min,$max,$row,&$vip) {
	    for ($i=$min;$i<=$max;$i++) {
	    	array_push($vip,'O'.$row.$i);
	    }
	}
	function addReserved ($min,$max,$row,&$reserved) {
		for ($i=$min;$i<=$max;$i++) {
	    	array_push($reserved,'O'.$row.$i);
	    }
	}


	$collec = array($rowsOne,$colsOne,$oneLimit,$vip,$rowsTwo,$balLimit,$reserved);

	echo json_encode($collec);

?>