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
        $path,
        $thumbnailPath,
        $country,
        $createdAt
        ) :void {
        $reel = $this->database->connect()->prepare('
            INSERT INTO reels (user_id, country, video_name, thumbnail_name, created_at) VALUES (?, ?, ?, ?, ?)
            ');
        $userId = $_SESSION['user_id'];
        $reel->execute([
            $userId,
            $country,
            $path,
            $thumbnailPath,
            $createdAt
        ]);
    }

    public function getReelsByUserId(int $userId) {
        $reels = $this->database->connect()->prepare('
            SELECT * FROM reels WHERE user_id = ?
        ');
        $reels->execute([$userId]);
        return $reels->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
