
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['user']) || isset($_POST['selectNameClass'])){
        $data = $_POST['user'];
        $selectNameClass = $_POST['selectNameClass'];
        $kq = $db->thucthi("SELECT * FROM `mega_acount` WHERE tendangnhap = '$data'");
        $kq1 = $db->thucthi("SELECT * FROM `mega_acount_nhom` WHERE nhom_admin = '$data'");
        $kq2 = $db->thucthi("SELECT nhom_id FROM `mega_acount_nhom` WHERE nhom_id NOT IN ('ADMIN', 'GVCN', 'Tk')");
        $kq3 = $db->thucthi("SELECT hodem, ten FROM `mega_acount` as a INNER JOIN `mega_acount_nhom` as b WHERE a.tendangnhap = b.nhom_admin AND b.nhom_id = '$selectNameClass' ");
        $kq4 = $db -> thucthi("SELECT name_khoa, id_khoa from `mega_acount_khoa`");
        $datas = [];
        $datas1 = [];
        $datas2 = [];
        $datas3 = [];
        $datas4 = [];
        // $datas4 = [];
        while ($row = mysqli_fetch_array($kq)) {
            $datas[] = $row;
        }
        while ($row = mysqli_fetch_array($kq1)) {
            $datas1[] = $row;
        }
        while ($row = mysqli_fetch_array($kq2)) {
            $datas2[] = $row;
        }
        while ($row = mysqli_fetch_array($kq3)) {
            $datas3[] = $row;
        }
        while ($row = mysqli_fetch_array($kq4)) {
            $datas4[] = $row;
        }
        $responseData = [
            'account' => $datas,
            'accountNhomAdmin' => $datas1,
            'accountNhom' => $datas2,
            'tenGv' => $datas3,   
            'khoa' => $datas4,
        ];
        header('Content-Type: application/json');
        echo json_encode($responseData);
    } 
} else {
   
    echo json_encode(['message' => 'Lỗi: Phương thức yêu cầu không hợp lệ.']);
}

?>