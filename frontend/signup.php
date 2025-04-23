<?php
$host = "localhost";
$db = "koolilogin";
$user = "kooliuser";
$pass = "yourpassword123";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $password);

if ($stmt->execute()) {
  echo "Account created successfully. <a href='index.html'>Login</a>";
} else {
  echo "Error: This email may already exist.";
}

$conn->close();
?>
