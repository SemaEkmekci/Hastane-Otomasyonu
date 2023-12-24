<?php
require_once "DBconnect.php";

$poliklinik_ad = $_GET['ad'];
$sqlpoliid = $dbConnection->prepare("SELECT b_id FROM brans_bilgileri WHERE b_ad = :poliklinik_ad");
$sqlpoliid->bindParam(':poliklinik_ad', $poliklinik_ad);
$sqlpoliid->execute();
$brans_id_row = $sqlpoliid->fetch(PDO::FETCH_ASSOC);

if ($brans_id_row) {
    $brans_id = $brans_id_row['b_id'];
    $sqlQuery = $dbConnection->prepare("SELECT saat FROM randevu_bilgileri WHERE aktiflik_durumu = 1 AND brans_id = :brans_id");
    $sqlQuery->bindParam(':brans_id', $brans_id);
    $sqlQuery->execute();

    $branslar = $sqlQuery->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($branslar);
} else {
    echo json_encode(["error"]);
}
?>
