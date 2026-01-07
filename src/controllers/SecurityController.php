<?php 

require_once 'AppController.php';
require_once __DIR__ . '/../repository/UserRepository.php';

class SecurityController extends AppController {

    private static $instance = null;

    public static function getInstance(): SecurityController {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }


    //TODO(?) dekorator, ktore opcje sa dostepne dla tego widoku

    public function login() {
        if (!$this->isPost()) { //early return
            return $this->render('login'); 
        }

        $email = $_POST["email"] ?? '';
        $password = $_POST["password"] ?? '';

        if (empty($email) || empty($password)) {
            return $this->render('login', ['message' => 'Fill all fields']);
        }

        $userRow = $this->userRepository->getUserByEmail($email);

        if (!$userRow) {
            return $this->render('login', ['message' => 'Wrong email or password']);
        }

        if (!password_verify($password, $userRow['password'])) {
            return $this->render('login', ['message' => 'Wrong email or password']);
        }
        
        // TODO możemy przechowywać sesje użytkowika lub token
        // setcookie("username", $userRow['email'], time() + 3600, '/');

        $url = "http://$_SERVER[HTTP_HOST]";
        header("Location: {$url}/dashboard");
    }

    public function register() {
        if (!$this->isPost()) { //early return
            return $this->render('register'); 
        }

        $email = $_POST["email"] ?? '';
        $username = $_POST["username"] ?? '';
        $password = $_POST["password"] ?? '';
        $confPassword = $_POST["confPassword"] ?? '';

        if (empty($email) || empty($username) || empty($password) || empty($confPassword)) {
            return $this->render('register', ['message' => 'Fill all fields']);
        }

        if ($password !== $confPassword) {
            return $this->render('register', ['message' => 'Passwords do not match']);
        }

        $userRow = $this->userRepository->getUserByEmail($email);
        if ($userRow !== null) {
            return $this->render('register', ['message' => 'Something went wrong']);
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $this->userRepository->createUser(
            $username,
            $email,
            $hashedPassword
        );

        return $this->render('login', ['message' => 'Registration successful! You can log in now.']);
    }

    
}
?>