<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['time_start']) && isset($_POST['time_close'])) {
        $time_start = $_POST['time_start'];
        $time_close = $_POST['time_close'];
        $del = $db->thucthi("DELETE FROM time_setting");
        $kq = $db->thucthi("INSERT INTO time_setting(time_start, time_close) VALUES( '$time_start', '$time_close' )  ");
        
        if($kq) {
            $responseData = 'success' ;
        }else  $responseData = 'error' ;

        header('Content-Type: application/json');
        echo json_encode($responseData);
    } else {
        echo json_encode('lỗi');
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $kq = $db->thucthi("SELECT * FROM `time_setting` ");
    $datas = [];

    while ($row = mysqli_fetch_array($kq)) {
        $datas[] = $row;
    }

    $responseData = [
        'time' => $datas,
    ];
    header('Content-Type: application/json');
    echo json_encode($responseData);
}
