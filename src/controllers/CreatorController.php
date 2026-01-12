<?php 

require_once 'AppController.php';
require_once __DIR__ . '/../repository/ReelsRepository.php';
require_once __DIR__ . '/../repository/CountryRepository.php';

class CreatorController extends AppController {

    private static $instance = null;

    public static function getInstance(): CreatorController {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function index() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['user_id'])) {

            $url = "http://$_SERVER[HTTP_HOST]";
            header("Location: {$url}/login");
            exit();
        }
        $countryRepository = CountryRepository::getInstance();
        
        $countries = $countryRepository->getCountries();

        return $this->render('creator', ['countries' => $countries]);
    }

  public function generateReel() {
    header('Content-Type: application/json');
    $debug = [];

    if (session_status() === PHP_SESSION_NONE) {
            session_start();
    }

    $username = $_SESSION['username'];

    try {
        $country = $_POST['country'];
        $date = $_POST['date-select'];
        if (empty($date)) {
            $date = date('Y-m-d');
        }

        $uploaddir = __DIR__ . '/../../media/'. $username . '/' . 'temp/';
        $videoDir = __DIR__ . '/../../media/'. $username . '/';

        if (!is_dir($uploaddir)) mkdir($uploaddir, 0777, true);
        if (!is_dir($videoDir)) mkdir($videoDir, 0777, true);
        
        // Sprawdzanie czy pliki dotarły do PHP
        if (!isset($_FILES['photos'])) {
            throw new Exception("Brak klucza 'photos' w tablicy \$_FILES. Sprawdź FormData w JS.");
        }

        $fileCount = count($_FILES['photos']['name']);
        $debug['files_received'] = $fileCount;

        // Przenoszenie plików i czyszczenie
        array_map('unlink', glob("$uploaddir/*.*"));
        $movedFiles = 0;
        foreach ($_FILES['photos']['tmp_name'] as $index => $tmpName) {
            $fileName = sprintf("img_%03d.jpg", $index);
            if (move_uploaded_file($tmpName, $uploaddir . $fileName)) {
                $movedFiles++;
            }
        }

        // Python
        $videoName = 'reel_' . time();
        $thumbnailPath ='media/'. $username . '/' . 'thumb_' . $videoName . '.jpg';
        $videoName = $videoName . '.mp4';
        $outputVideoPath = 'media/'. $username . '/' . $videoName;
        $fullPath = __DIR__ . '/../../' . $outputVideoPath;
        $pythonScript = __DIR__ . '/../services/video_maker.py';

        $command = "python3 $pythonScript " . escapeshellarg($uploaddir) . " " . escapeshellarg($fullPath) . " 2>&1";
        $pythonOutput = shell_exec($command);

        $firstImage = $uploaddir . 'img_000.jpg';
            
            if (file_exists($firstImage)) {
                if(copy($firstImage, $thumbnailPath)) {
                } else {
                    $thumbnailPath = null; 
                }
            }

        array_map('unlink', glob("$uploaddir/*.*"));

        // Zapis do bazy
        $reelsRepository = ReelsRepository::getInstance();
        $reelsRepository->addReel($outputVideoPath, $thumbnailPath, $country, $date);

        echo json_encode(['status' => 'success', 'videoPath' => $outputVideoPath]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

}
?>