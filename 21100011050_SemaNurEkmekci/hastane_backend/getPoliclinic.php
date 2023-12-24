<?php
require_once "DBconnect.php";

$sqlQuery = $dbConnection->prepare("SELECT b_ad FROM brans_bilgileri");
$sqlQuery->execute();

$branslar = $sqlQuery->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode($branslar);

?>
