<?php
require_once "DBconnect.php";

$poliklinik_ad = $_GET['ad'];

$sqlQuery = $dbConnection->prepare("
    SELECT doktor_bilgileri.d_ad, doktor_bilgileri.d_soyad
    FROM doktor_bilgileri
    INNER JOIN brans_bilgileri ON doktor_bilgileri.d_uzmanlik_no = brans_bilgileri.b_id
    WHERE brans_bilgileri.b_ad = :poliklinik_ad
");

$sqlQuery->bindParam(':poliklinik_ad', $poliklinik_ad, PDO::PARAM_STR);
$sqlQuery->execute();

$doctors = $sqlQuery->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($doctors);


?>
