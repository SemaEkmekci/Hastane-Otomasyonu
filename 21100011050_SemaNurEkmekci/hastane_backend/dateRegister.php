<?php 


include 'DBconnect.php';
$h_id = $_POST['id'];
$poli = $_POST['poli'];
$doctor = $_POST['doctor'];
$date = $_POST['date'];
$time = $_POST['time'];
$names = explode(" ", $doctor);
$doctorName = $names[0];
$doctorSurname = $names[1];


$sqlPoliQuery = $dbConnection->prepare("SELECT b_id FROM brans_bilgileri WHERE b_ad = ?");
$sqlPoliQuery->execute([$poli]);
$poliID = $sqlPoliQuery->fetchColumn();

// Doktor id'sini almak için
$sqlDoctorQuery = $dbConnection->prepare("SELECT d_id FROM doktor_bilgileri WHERE d_ad = ? AND d_soyad = ? AND d_uzmanlik_no = ? ");
$sqlDoctorQuery->execute([$doctorName, $doctorSurname, $poliID]);
$doctorID = $sqlDoctorQuery->fetchColumn();

$sqlQuery = $dbConnection->prepare("INSERT INTO randevu_bilgileri(hasta_id, doktor_id, brans_id, randevu_tarihi, saat, aktiflik_durumu) VALUES (?, ?, ?, ?, ?, ?)");
$res = $sqlQuery->execute([$h_id, $doctorID, $poliID, $date, $time, 1]);

if ($res) {
    echo "Success";
} else {
    echo "Error";
}
$dbConnection->close();

?>

