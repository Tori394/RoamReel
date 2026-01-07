<?php 

require_once 'AppController.php';
require_once __DIR__ . '/../repository/ReelsRepository.php';

class CreatorController extends AppController {

    private static $instance = null;

    public static function getInstance(): CreatorController {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function index() {
        
        return $this->render('creator');
    }

  public function generateReel() {
    header('Content-Type: application/json');
    $debug = [];

    try {
        // 1. Definiowanie ścieżek
        $uploaddir = __DIR__ . '/../../public/uploads/temp/';
        $videoDir = __DIR__ . '/../../public/videos/';
        $debug['paths'] = ['upload' => $uploaddir, 'video' => $videoDir];

        // 2. Tworzenie folderów i sprawdzanie uprawnień
        if (!is_dir($uploaddir)) mkdir($uploaddir, 0777, true);
        if (!is_dir($videoDir)) mkdir($videoDir, 0777, true);
        
        $debug['is_writable'] = [
            'upload' => is_writable($uploaddir),
            'video' => is_writable($videoDir)
        ];

        // 3. Sprawdzanie czy pliki w ogóle dotarły do PHP
        if (!isset($_FILES['photos'])) {
            throw new Exception("Brak klucza 'photos' w tablicy \$_FILES. Sprawdź FormData w JS.");
        }

        $fileCount = count($_FILES['photos']['name']);
        $debug['files_received'] = $fileCount;

        // 4. Przenoszenie plików i czyszczenie
        array_map('unlink', glob("$uploaddir/*.*"));
        $movedFiles = 0;
        foreach ($_FILES['photos']['tmp_name'] as $index => $tmpName) {
            $fileName = sprintf("img_%03d.jpg", $index);
            if (move_uploaded_file($tmpName, $uploaddir . $fileName)) {
                $movedFiles++;
            }
        }
        $debug['moved_successfully'] = $movedFiles;

        // 5. Wywołanie Pythona
        $videoName = 'reel_' . time() . '.mp4';
        $outputVideoPath = 'public/videos/' . $videoName;
        $fullPath = __DIR__ . '/../../' . $outputVideoPath;
        $pythonScript = __DIR__ . '/../services/video_maker.py';

        // Sprawdzamy czy skrypt Pythona istnieje
        $debug['python_script_exists'] = file_exists($pythonScript);

        $command = "python3 $pythonScript " . escapeshellarg($uploaddir) . " " . escapeshellarg($fullPath) . " 2>&1";
        $pythonOutput = shell_exec($command);
        $debug['python_raw_output'] = $pythonOutput;

        // 6. Zapis do bazy
        $reelsRepository = new ReelsRepository();
        $reelsRepository->addReel($outputVideoPath);

        echo json_encode(['status' => 'success', 'debug' => $debug]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage(), 'debug' => $debug]);
    }
}

}
?>