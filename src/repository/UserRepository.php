<?php

require_once 'Repository.php';

class UserRepository extends Repository
{
    private static $instance;

    public static function getInstance(): UserRepository
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getUsers()
    {
        $query = $this->database->connect()->prepare('
            SELECT * FROM users
            ');
        $query->execute();
        $users = $query->fetchAll(PDO::FETCH_ASSOC);
        return $users;
    }

    public function getUserByEmail(string $email): ?array
    {
        $query = $this->database->connect()->prepare('
            SELECT * FROM users WHERE email = :email
            ');
        $query->bindParam(':email', $email, PDO::PARAM_STR);
        $query->execute();
        $user = $query->fetch(PDO::FETCH_ASSOC);
        if ($user === false) {
            return null;
        }
        return $user;
    }

    public function createUser(
        string $username, 
        string $email, 
        string $password
    ):void {
        $query = $this->database->connect()->prepare('
            INSERT INTO users (username, email, password) 
            VALUES (?, ?, ?)
            ');        
        $query->execute([
            $username,
            $email,
            $password
        ]);
    }

    public function updateUserProfilePicture(int $userId, ?string $profilePicturePath): void
    {
        $query = $this->database->connect()->prepare('
            UPDATE users 
            SET profile_picture = :profile_picture 
            WHERE id = :id
            ');
        $query->bindParam(':profile_picture', $profilePicturePath, PDO::PARAM_STR);
        $query->bindParam(':id', $userId, PDO::PARAM_INT);
        $query->execute();
    }

    public function getUserProfilePicture(int $userId): ?string
    {
        $query = $this->database->connect()->prepare('
            SELECT profile_picture FROM users WHERE id = :id
            ');
        $query->bindParam(':id', $userId, PDO::PARAM_INT);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);
        return $result['profile_picture'] ?? null;
    }
}