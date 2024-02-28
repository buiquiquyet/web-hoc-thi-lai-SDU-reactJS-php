<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['id'])) {
        $data = $_POST['id'];
        $kq = $db->thucthi("SELECT * FROM `mega_acount` WHERE tendangnhap = '$data'");
        $datas = [];
        
        while ($row = mysqli_fetch_array($kq)) {
            $datas[] = $row;
        }
        
        $responseData = [
            'account' => $datas, 
        ];
        header('Content-Type: application/json');
        echo json_encode($responseData);
    } else {
        echo json_encode('lỗi');
    }
} else {
    
}

?>
