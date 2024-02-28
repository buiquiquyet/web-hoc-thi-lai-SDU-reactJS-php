<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datas = [];
   
    if (isset($_POST['idKhoa'])) {
        $idKhoa = $_POST['idKhoa'];
        $kq = $db->thucthi("SELECT b.nhom_id
                                FROM mega_acount as a
                                INNER JOIN mega_acount_nhom as b ON a.tendangnhap = b.nhom_admin       
                                WHERE a.id_khoa = $idKhoa ");
        while ($row = mysqli_fetch_array($kq)) {
            $datas[] = $row;
        }
    }
    $responseData = [
        'class' => $datas,
    ];
    header('Content-Type: application/json');
    echo json_encode($responseData);
}else {
    echo json_encode('lỗi');
}
