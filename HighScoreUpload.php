<?php
include ("DBLogin.php");
if (!$con) {
die("Connection failed: " . mysql_connect_error());
}
$sql = $con->prepare("INSERT INTO highscores (Name, Score) VALUES (:name, :score)");
$sql->bindParam(':name', $_POST['name']);
$sql->bindParam(':score', $_POST['score']);
$sql->execute() or die($sql->errorInfo());
?>
