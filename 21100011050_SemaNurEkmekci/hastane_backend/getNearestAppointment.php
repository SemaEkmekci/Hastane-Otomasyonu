<?php 
require_once "DBconnect.php";

$hasta_id = $_GET['id'];

$sqlQuery = $dbConnection->prepare("
  SELECT 
    randevu_bilgileri.randevu_tarihi, 
    randevu_bilgileri.r_id,
    randevu_bilgileri.saat, 
    randevu_bilgileri.aktiflik_durumu,
    doktor_bilgileri.d_ad, 
    doktor_bilgileri.d_soyad, 
    brans_bilgileri.b_ad
  FROM randevu_bilgileri
  INNER JOIN doktor_bilgileri ON randevu_bilgileri.doktor_id = doktor_bilgileri.d_id
  INNER JOIN brans_bilgileri ON randevu_bilgileri.brans_id = brans_bilgileri.b_id
  WHERE 
    randevu_bilgileri.hasta_id = :hasta_id 
    AND randevu_bilgileri.aktiflik_durumu = '1' 
    AND randevu_bilgileri.randevu_tarihi >= CURDATE()
  ORDER BY randevu_bilgileri.randevu_tarihi ASC
  LIMIT 1
");

$sqlQuery->bindParam(':hasta_id', $hasta_id, PDO::PARAM_STR);
$sqlQuery->execute();
$hasta_info = $sqlQuery->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode($hasta_info);
?>
