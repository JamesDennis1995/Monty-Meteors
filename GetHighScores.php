<?php
include ("DBLogin.php");
if (!$con) {
die("Connection failed: " . mysql_connect_error());
}
$sql = $con->prepare("SELECT * FROM highscores ORDER BY Score DESC");
$sql->execute() or die ($sql->errorInfo());
$info = $sql->fetchAll();
echo json_encode($info);
?>
