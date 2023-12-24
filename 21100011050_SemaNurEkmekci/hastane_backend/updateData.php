<?php
include 'DBconnect.php';

$tel = $_POST['tel'];
$email = $_POST['mail'];

$sqlQuery = $dbConnection->prepare("UPDATE hasta_bilgileri SET telefon = ? WHERE email = ?");
$res = $sqlQuery->execute([$tel, $email]);

if ($res) {
    echo "Success";
} else {
    echo "Error";
}

$dbConnection->close();
?>
