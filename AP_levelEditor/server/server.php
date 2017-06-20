<?php
/** ===============================================================================================
 * AJAX Action handler class
 * @author: Scott Henshawe
 * @copyright: 2015 Kibble Games Inc, in cooperation with VFS
 * @Modified by: Richard Zampieri
 */

// include('ajax_server.php');   // If you want to modify the ajax server and subclass from it

class Server /* extends ajax_server */ {

    private $debug_mode = TRUE;


    public function __construct() {

        if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists

            $action = $_POST["action"];   // Get the action requested, make these up as needed

            switch( $action ) {     //Switch case for value of action
                case "saveImage":
                    $response = $this->saveImage( $_FILES );
                    break;
				case "saveLevel":
					$response = $this->saveLevelData( $_POST );
                    break;
				case "loadLevel":
					$response = $this->loadLevel();
                    break;
				case "displayLevel":
					$response = $this->loadLevelData($_POST);
                    break;
                default:
                    $response = $this->is_error( "Error: 101 - Invalid action." );
                    break;
            }

            echo $response;
        }
    }

    /*
     * When we encounter an error the handler should call is error with a message and hand that back
     * as a response to the client
     */
    private function is_error( $error_msg ) {

        // Create a response array (attrib => value) with the origingal post params to start
        $response = $_POST;

        // Add our error message
        $response["error"] = $error_msg;

        // convert the whole response to a JSON string, then add that string
        // as another element to the return message
        //
        // This lets us see the data coming back as a string in the debugger
        if ($this->debug_mode) {

            $response["json"] = json_encode( $response );
        }

        // Respond to the client with a JSON string containing attrib => value pairs encoded
        return $response;
    }


	/*
	* Save background image
	*/
	private function saveImage($files){
		if ( 0 < $files['background-image']['error'] ) {
			return 'Error: ' . $files['background-image']['error'] . '<br>';
		}
		else {
			move_uploaded_file($files['background-image']['tmp_name'], 'json/backgrounds/' . $files['background-image']['name']);
			return $_SERVER['HTTP_REFERER'].'/server/json/backgrounds/' . $files['background-image']['name'];
		}
	}

	/**
	*	This function used for save level scene in json file
	*/
	private function saveLevelData($post){
		$json=$post;
		$filename=$post['name'];
		$fp = fopen('json/'.$filename.'.json', 'w');
		fwrite($fp, json_encode($json));
		fclose($fp);
		return 'success';
	}

	/*
	* Load all levels
	*/
	private function loadLevel(){
		$dir    = 'json';
		$files = array_diff(scandir($dir), array('.', '..'));
		$html='';
		foreach($files as $k=>$va) {
			if (!is_dir("json/$va")){
				$name= "'".$va."'";
				$html .= '<a class="loadInfo" href="javascript:;" onclick="appEditor.loadIndividualLevelData('.$name.')">';
				$html .=  $va;
				$html .=  "</a>";
				$html .=  "<br>";
				$html .=  "<hr>";
			}
		}
		return $html;
	}

	/*
	* Load particular level
	*/
	private function loadLevelData($post){
		$json=$post;
		$filename=$post['name'];
		$json_url = "json/".$filename;
		$json = file_get_contents($json_url);
		$data = json_decode($json, TRUE);
		return trim($data['data']);
	}
}
// ========================================================================
//
// MAIN Handler to process POST requests
//
$ajax_post_handler = new Server;
?>
