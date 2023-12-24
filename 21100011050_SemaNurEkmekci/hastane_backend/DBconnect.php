<?php
header("Access-Control-Allow-Origin: *");
try {
    $dbConnection = new PDO("mysql:host=localhost; dbname=hastane", "root", "123456789");

    // echo "Veri tabanına bağlanıldı";

} catch (Exception $e) {
    $dbConnection = null;
    // echo "Hata";
}
?>
