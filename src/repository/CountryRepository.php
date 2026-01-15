<?php

require_once 'Repository.php';

class CountryRepository extends Repository
{
    private static $instance;

    public static function getInstance(): CountryRepository
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getCountries()
    {
        $query = $this->database->connect()->prepare('
            SELECT name FROM countries ORDER BY name ASC
            ');
        $query->execute();
        $c = $query->fetchAll(PDO::FETCH_ASSOC);
        return $c;
    }

}

?>