<?php
//save background image
if ( 0 < $_FILES['background-image']['error'] ) {
	echo 'Error: ' . $_FILES['background-image']['error'] . '<br>';
}
else {
	move_uploaded_file($_FILES['background-image']['tmp_name'], 'json/backgrounds/' . $_FILES['background-image']['name']);
	echo $_SERVER['HTTP_REFERER'].'/server/json/backgrounds/' . $_FILES['background-image']['name'];
}
?>
