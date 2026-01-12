<?php
require_once 'Repository.php';

class ReelsRepository extends Repository {

    private static $instance;
    
    public static function getInstance(): ReelsRepository
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function addReel(
        string $path,
        string $thumbnailPath
        ) :void {
        $reel = $this->database->connect()->prepare('
            INSERT INTO reels (video_name, country_code, thumbnail_name) VALUES (?, ?, ?)
            ');
        $reel->execute([
            $path,
            'PL',
            $thumbnailPath
        ]);
    }
}