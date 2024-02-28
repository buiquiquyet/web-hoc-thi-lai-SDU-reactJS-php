
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['user']) ){
        $data = $_POST['user'];
        $pass = $_POST['pass'];
        $kq = $db->thucthi("SELECT * FROM `mega_acount` WHERE tendangnhap = '$data' 
                            AND matkhau = '$pass' 
                            AND (nhom_id = 'GVCN' or nhom_id = 'TK' or nhom_id = 'TKGV' or nhom_id = 'RW')");
        $datas = [];
        while ($row = mysqli_fetch_array($kq)) {
            $datas[] = $row;
        }
        $responseData = [
            'account' => $datas,
        ];
        header('Content-Type: application/json');
        echo json_encode($responseData);
    } 
} else {
   
    echo json_encode(['message' => 'Lỗi: Phương thức yêu cầu không hợp lệ.']);
}

?>