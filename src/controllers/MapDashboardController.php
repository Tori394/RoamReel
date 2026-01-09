<?php 

require_once 'AppController.php';

class MapDashboardController extends AppController {

    private static $instance = null;

    public static function getInstance(): MapDashboardController {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function index(?int $id) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION['user_id'])) {

            $url = "http://$_SERVER[HTTP_HOST]";
            header("Location: {$url}/login");
            exit();
        }

        return $this->render('map');
    }

}
?>