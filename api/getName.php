<?php

$userID = $_GET["id"];

error_reporting(E_ALL);

require_once(__DIR__ . "/Connector.php");

$db = new Connector();

if (!$db) {

    echo $db->lastErrorMsg();
}

$query1 = "SELECT name FROM names WHERE id = '" . $userID . "'";
$result1 = $db->query($query1);
$rowCount = 0;
$resultsArray = [];
$errorArray = [];

while ($row1 = $result1->fetchArray(SQLITE3_ASSOC)) {
    $resultsArray[$rowCount]['name'] = $row1['name'];
    $rowCount++;
}

if (empty($resultsArray)) {
    header("Content-Type: application/json");
    http_response_code(400);
    $errorArray = ['Error' => 'No Records Found'];
    echo json_encode($errorArray);
    return;
} else {
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode($resultsArray);
}

$db->close();
