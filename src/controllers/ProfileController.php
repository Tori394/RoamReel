<?php 

require_once 'AppController.php';

class ProfileController extends AppController {

    private static $instance = null;

    public static function getInstance(): ProfileController {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function index() {
        
        if (!isset($_SESSION['user_id'])) {

            $url = "http://$_SERVER[HTTP_HOST]";
            header("Location: {$url}/login");
            exit();
        }

        return $this->render('profile');
    }

}
?>