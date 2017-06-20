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
  <script src="https://files.codepedia.info/files/uploads/iScripts/html2canvas.js"></script>
  <script src="js/editor.js" charset="utf-8"></script>
  <script src="js/app.js" charset="utf-8"></script>
	<script>
  /* show modal of gameplay */
  $(document).ready(function(e) {
    $("a").click(function(e) {
        var modal = $(this).attr("href");
        $(modal).show();
    });
  });

  $(document).ready(function(){
    $( ".draggable" ).draggable();
     });
  </script>
</head>
<body>
  <!-- Modal to play the game -->
  <div id="modalPlayer">
    <div class="play-modal"></div>
  </div>

  <nav class="card">
      <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="levels.html" data-toggle="modal" data-target="#layerForm">Load Levels</a></li>
          <li><a href="#modalPlayer" onclick="appEditor.loadCanvasData()">Play</a></li>
          <li class="logo"><a href="#">Angry Pigs Level Editor<img src="img/logo.png" alt="Angry Pigs Editor"></a></li>
      </ul>
  </nav>
  <!-- Level Editor panels -->
  <div class="container">
    <!-- Left Panel - Components -->
    <div class="components card">
      <p>Levels</p>
	  <!-- All levels will be put here using editor js loadLevelData event -->
	  <div id='LoadLevelFileData'></div>
    </div>
    <!-- Main Panel - Scene -->
    <div class="scene card">
    <input type="file" id="getval" name="background-image" style='display:none'/><br/><br/>
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
</html>
