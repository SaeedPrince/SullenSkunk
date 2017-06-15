<!-- Class: PG10 -->
<!-- author: Richard Scott de A. Zampieri -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angry Pigs - Level Editor</title>
  <!--Page layout style sheet-->
  <link rel="stylesheet" href="css/style.css">
  <!--Jquery CDN-->
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script>
		function loadLevelData(filename){
				$.ajax({
					type:'POST',
					url:'server/savejson.php',
					data:'displayLevel=1&name='+filename,
					beforeSend: function () {
						$('.submitBtn').attr("disabled","disabled");
						$('.modal-body').css('opacity', '.5');
					},
					success:function(msg){
						$('#layerData').html('');
						$('#layerData').html(msg);
					}
				});
		}
	</script>
    <script>
		$(document).ready(function(){
			$( ".draggable" ).draggable();
		 });
   </script>
</head>
<body>
  <nav class="card">
      <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="levels.html" data-toggle="modal" data-target="#layerForm">Load Levels</a></li>
          <li><a href="#" class="save-data" data-toggle="modal" data-target="#modalForm">Save</a></li>
          <li><a href="#">Play</a></li>
          <li class="logo"><a href="#">Angry Pigs Level Editor<img src="img/logo.png" alt="Angry Pigs Editor"></a></li>
      </ul>
  </nav>
  <!-- Level Editor panels -->
  <div class="container">
    <!-- Left Panel - Components -->
    <div class="components card">
      <p>Levels</p>
       <?php
	    // Display all levels from folder where we saved all json files
	    $dir    = 'server/json';
		  $files = array_diff(scandir($dir), array('.', '..'));
		  foreach($files as $k=>$va) {
			if (!is_dir("server/json/$va")){
					$name= "'".$va."'";
					echo '<a class="loadInfo" href="javascript:;" onclick="loadLevelData('.$name.')">';
					echo $va;
					echo "</a>";
          echo "<br>";
          echo "<hr>";
			  }
		  }
	     ?>
    </div>
    <!-- Main Panel - Scene -->
    <div class="scene card">
    <input type="file" id="getval" name="background-image" onchange="appEditor.readURL(event)" /><br/><br/>
	  <!-- layer data -->
	  <div id='layerData'></div>
    </div>
    <!-- Right Panel - Inspector -->
    <div class="inspector card">
      <p>Inspector</p>
      <form>
        Height: <br>
        <input type="text" name="Height" value=""><br>
        Width: <br>
        <input type="text" name="Width" value=""><br>
        Position.X: <br>
        <input type="text" name="xPos" value=""><br>
        Position.Y: <br>
        <input type="text" name="yPos" value="">
      </form>
    </div>
  </div>
</body>
<script src="js/editor.js" charset="utf-8"></script>
<script src="js/app.js" charset="utf-8"></script>
</html>
