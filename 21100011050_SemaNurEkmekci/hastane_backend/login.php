<?php
// include 'DBconnect.php';
require_once "DBconnect.php";
require_once "request_config.php";


$tc = $_POST['tc'];
$password = $_POST['password'];
$sql =  $dbConnection->prepare("SELECT * FROM hasta_bilgileri WHERE tc = ?");

$sql->execute([$tc]);
$user = $sql->fetch(PDO::FETCH_ASSOC);


if ($user) {
    $hashedPassword = $user['sifre'];
    // if ($password === $hashedPassword ) {
    if (password_verify($password, $hashedPassword)) {
        session_start();
        $_SESSION['id'] = $user['hasta_id'];
		// $_SESSION['tc'] = $user['tc'];
        //echo "True";
        echo json_encode($_SESSION['id']);
        // exit();
    } 
    else {
        echo "Invalid password";
    }
} else {
    $_SESSION['id'] = null; 
    // $_SESSION['tc'] = null;
    header("location:user.php");

    echo "False";
}
$dbConnection->close();
?>