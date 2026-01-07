<?php
require_once 'Repository.php';

class ReelsRepository extends Repository {
    public function addReel(
        string $path
        ) :void {
        $reel = $this->database->connect()->prepare('
            INSERT INTO reels (video_path) VALUES (?)
            ');
        $reel->execute([
            $path
        ]);
    }
}