<?php
class Server
{
  private $debug_mode = TRUE;
  public function __construct()
  {
    if (isset($_POST["Action"]) && !empty($_POST["Action"]))
    {
      $action = $_POST["Action"];
      switch ($action)
      {
        case "Save":
          $response = $this->do_save();
          break;
        default:
          $response = $this->is_error( "Error: 101 - Invalid action." );
          break;
      }
    }
    else
    {
      $response = "No action received.";
    }
    echo $response;
  }
  private function do_save()
  {
    $SaveFile = fopen("SaveFile.txt", "w") or die("Unable to open file!");
    $SaveTxt ="Object0\n{\n";
    fwrite($SaveFile, $SaveTxt);
    $SaveTxt = $_POST["Shape"]."\n";
    fwrite($SaveFile, $SaveTxt);
    $SaveTxt = $_POST["Width"]."\n";
    fwrite($SaveFile, $SaveTxt);
    $SaveTxt = $_POST["Height"]."\n";
    fwrite($SaveFile, $SaveTxt);
    $SaveTxt = $_POST["Mass"]."\n";
    fwrite($SaveFile, $SaveTxt);
    $SaveTxt = $_POST["Texture"]."\n";
    fwrite($SaveFile, $SaveTxt);
    $SaveTxt = $_POST["Bounciness"]."\n";
    fwrite($SaveFile, $SaveTxt);
    fclose($myfile);
    $response = "Saved successfully.";
    return $response;
  }
}
$server = new Server();
?>
