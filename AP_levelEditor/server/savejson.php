<?php

// This code is for saving created object into json file
if(isset($_POST['saveLevel']) && $_POST['saveLevel']=='1')
{	
	$json=$_POST;
	$filename=$_POST['name'];
	$fp = fopen('json/'.$filename.'.json', 'w');
	fwrite($fp, json_encode($json));
	fclose($fp);  
}

// This code is for load  content for particular json file  to display on levels page
if(isset($_POST['displayLevel']) && $_POST['displayLevel']=='1')
{	
	$json=$_POST;
	$filename=$_POST['name'];
	$json_url = "json/".$filename;
	$json = file_get_contents($json_url);
	$data = json_decode($json, TRUE);
	echo trim($data['data']);
	die;
}
?>