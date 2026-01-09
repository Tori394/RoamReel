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
        //TODO close connection
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
        //TODO close connection
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
}