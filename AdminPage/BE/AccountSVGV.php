
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['user']) || isset($_POST['selectNameClass'])){
        $data = $_POST['user'];
        $nhom_id = $_POST['nhom_id'];
        $selectNameClass = $_POST['selectNameClass'];
        $datas = [];
        $datas1 = [];
        $datas2 = [];
        $datas3 = [];
        $datas4 = [];
        $responseData = [];
        if( $nhom_id === 'TK'){
            $kq4 = $db->thucthi("SELECT b.name_khoa FROM 
                                `mega_acount` as a INNER JOIN `mega_acount_khoa` as b 
                                ON a.id_khoa = b.id_khoa AND tendangnhap = '$data' ");
            
            while ($row = mysqli_fetch_array($kq4)) {
                $datas4[] = $row;
                
            }
            $responseData = [
                
                'tenKhoa' => $datas4,  
            ];
        } else if ($nhom_id === 'TKGV' || $nhom_id === 'GVCN' ){ 
            if($nhom_id === 'TKGV'  ) {
                $kq4 = $db->thucthi("SELECT b.name_khoa FROM 
                                    `mega_acount` as a INNER JOIN `mega_acount_khoa` as b 
                                    ON a.id_khoa = b.id_khoa AND tendangnhap = '$data' ");
                while ($row = mysqli_fetch_array($kq4)) {
                    $datas4[] = $row;  
                }
            }
            $kq = $db->thucthi("SELECT * FROM `mega_acount` WHERE tendangnhap = '$data'");
            $kq1 = $db->thucthi("SELECT * FROM `mega_acount_nhom` WHERE nhom_admin = '$data'");
            $kq2 = $db->thucthi("SELECT nhom_id FROM `mega_acount_nhom` WHERE nhom_id NOT IN ('ADMIN', 'GVCN')");
            $kq3 = $db->thucthi("SELECT hodem, ten FROM
                                `mega_acount` as a INNER JOIN `mega_acount_nhom` as b 
                                WHERE a.tendangnhap = b.nhom_admin AND b.nhom_id = '$selectNameClass' ");
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
            if(!empty($datas4)) {
                $responseData = [
                    'account' => $datas,
                    'accountNhomAdmin' => $datas1,
                    'accountNhom' => $datas2,
                    'tenGv' => $datas3, 
                    'tenKhoa' => $datas4,  
                ];
            }else {
                $responseData = [
                    'account' => $datas,
                    'accountNhomAdmin' => $datas1,
                    'accountNhom' => $datas2,
                    'tenGv' => $datas3,   
                    
                ];
            }
        }
    
        
           
        header('Content-Type: application/json');
        echo json_encode($responseData);
    } 
} else {
   
    echo json_encode(['message' => 'Lỗi: Phương thức yêu cầu không hợp lệ.']);
}

?>