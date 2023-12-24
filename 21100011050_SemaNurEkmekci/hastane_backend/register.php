<?php 


include 'DBconnect.php';

$tc = $_POST['tc'];
$userName = $_POST['userName'];
$surname = $_POST['surname'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$dt = $_POST['dt'];
$gender = $_POST['gender'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); 
// $password = $_POST['password']; 

$sqlQuery = $dbConnection->prepare("INSERT INTO hasta_bilgileri(tc, ad, soyad, telefon, email, dogum_tarihi, cinsiyet, sifre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

$res = $sqlQuery->execute([$tc, $userName, $surname, $tel, $email, $dt, $gender, $password]);

if($res){
    echo "Success";
}
else{
    echo "Error";
}
$dbConnection->close();
?>

