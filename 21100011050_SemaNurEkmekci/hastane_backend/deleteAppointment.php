<?php 
require_once "DBconnect.php";

$randevu_id = $_GET['id'];

$sqlQuery = $dbConnection->prepare("DELETE FROM `randevu_bilgileri` WHERE r_id = :randevu_id");
$sqlQuery->bindParam(':randevu_id', $randevu_id, PDO::PARAM_STR);

try {
    $sqlQuery->execute();
    echo json_encode(array("message" => "Randevu başarıyla iptal edildi"));
} catch (PDOException $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
?>
