<?php 
require_once "DBconnect.php";

$hasta_id = $_GET['id'];

$sqlQuery = $dbConnection->prepare("SELECT * FROM hasta_bilgileri where hasta_id = :hasta_id");
$sqlQuery->execute();

$sqlQuery->bindParam(':hasta_id', $hasta_id, PDO::PARAM_STR);
$sqlQuery->execute();
$hasta_info = $sqlQuery->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode($hasta_info);

?>