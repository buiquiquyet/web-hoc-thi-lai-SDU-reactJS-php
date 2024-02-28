
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['data']) ){
        $data = $_POST['data'];
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
    } else if ( isset($_POST['tendangnhap']) ){
        $tendangnhap = $_POST['tendangnhap'];
        $hodem = $_POST['hodem'];
        $ten = $_POST['ten'];
        $ngaysinh = $_POST['ngaysinh'];
        // $ngaysinh = date("YYYY-mm-dd", strtotime($date));
        $dienthoai = $_POST['dienthoai'];
        $email = $_POST['email'];
        $diachi = $_POST['diachi'];
        $update = $db->thucthi("UPDATE `mega_acount` SET `hodem`='$hodem',`ten`='$ten',`ngaysinh`='$ngaysinh',`dienthoai`='$dienthoai',`email`='$email',`diachi`='$diachi' WHERE `tendangnhap` = '$tendangnhap'");
        if($update) {
            header('Content-Type: application/json');
            echo json_encode('success');
        } else {
            header('Content-Type: application/json');
            echo json_encode('err');
        }
    }
    
} else {
   
    echo json_encode(['message' => 'Lỗi: Phương thức yêu cầu không hợp lệ.']);
}

?>