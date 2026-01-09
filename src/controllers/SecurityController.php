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
        $this->userRepository = UserRepository().getInstance();
    }

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

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION['user_id'] = $userRow['id'];
        $_SESSION['username'] = $userRow['username'];

        setcookie("user_email", $userRow['email'], time() + 3600, "/", "", false, true); //ciasteczko na godzinę
                                                                                //^^^^ zabezpieczenie HttpOnly

        $url = "http://$_SERVER[HTTP_HOST]";
        header("Location: {$url}/dashboard");
        exit();
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

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->render('login', ['messages' => 'Invalid email format']);
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $this->userRepository->createUser(
            $username,
            $email,
            $hashedPassword
        );

        return $this->render('login', ['message' => 'Registration successful! You can log in now.']);
    }

    public function logout() {
        session_start();
        
        $_SESSION = [];
        
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        session_destroy();

        setcookie("user_email", "", time() - 3600, "/");

        $url = "http://$_SERVER[HTTP_HOST]";
        header("Location: {$url}/login");
    }

    
}
?>