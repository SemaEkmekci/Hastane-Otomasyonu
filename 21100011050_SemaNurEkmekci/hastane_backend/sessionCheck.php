<?php 

require_once "request_config.php";
session_start();

$sessionStatus = session_status();

// if (isset($_SESSION['id'])){
//   echo $_SESSION['id'];
//   echo $_SESSION['tc'];
// } else{
//    echo "False";
//    header('Location: /'); 
// }

if ($sessionStatus == PHP_SESSION_DISABLED) {
  
  echo "False";
} elseif ($sessionStatus == PHP_SESSION_NONE) {

  echo "False";

} elseif ($sessionStatus == PHP_SESSION_ACTIVE) {

  echo "Active";
  // echo $_SESSION['id'];
} else {
  echo "Error";
}


?>