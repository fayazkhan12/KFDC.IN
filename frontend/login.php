<!-- public_html/login.php -->
<?php
session_start();

$host = "localhost";
$db = "koolilogin";
$user = "kooliuser";
$pass = "your_password_here";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows > 0) {
    $user = $res->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['email'];
        header("Location: dashboard.php");
        exit();
    } else {
        header("Location: index.html?error=Wrong password");
        exit();
    }
} else {
    header("Location: index.html?error=User not found");
    exit();
}
?>
