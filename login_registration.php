<?php

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "food_bank";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Creating tables if they do not exist
$conn->query("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)");

$conn->query("CREATE TABLE IF NOT EXISTS requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    request_data TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)");

// Registration handler
if (isset($_POST['register'])) {
    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Insert user data
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo "Registration successful.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Login handler
if (isset($_POST['login'])) {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    // Fetch user data
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo "Login successful.";
            session_start();
            $_SESSION['user_id'] = $user['id'];
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with this email.";
    }
}

// Request handler
if (isset($_POST['request_data'])) {
    session_start();
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
        $request_data = $conn->real_escape_string($_POST['request_data']);

        // Insert request data
        $sql = "INSERT INTO requests (user_id, request_data) VALUES ('$user_id', '$request_data')";
        if ($conn->query($sql) === TRUE) {
            echo "Request submitted successfully.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "You need to log in to submit a request.";
    }
}

$conn->close();
?>
