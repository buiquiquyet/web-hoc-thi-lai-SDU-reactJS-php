<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $data = $_POST['user'];
    $type = $_POST['type'];

    //init
    $datas1 = [];
    $datas = [];
    $countData = [];
    //số lượng page
    $totalPage = 0 ;
    //phân trang
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $itemsPerPage = 10;
    $startIndex = ($page - 1) * $itemsPerPage;
    $endIndex = $startIndex + $itemsPerPage - 1;

    $typeSidebar = isset($_POST['typeSidebar']) ? ($_POST['typeSidebar']) : 'hoclai';
    $typeTableCsdl = $typeSidebar == 'hoclai' ? 'mega_dangky_hoc' : 'mega_dangky_thi';
    
    if (isset($_POST['user']) && isset($_POST['ky']) && isset($_POST['nam']) && isset($_POST['typeSidebar'])) {
        
        

        $ky = $_POST['ky'];
        $nam = $_POST['nam'];
        $nam = substr($nam,0,4);

        if($type == 'Home') {
            //select bình thường để lấy số lượng count
            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                FROM mega_acount as a
                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                WHERE a.nhom_id IN (
                                SELECT nhom_id
                                FROM mega_acount_nhom
                                WHERE nhom_admin = '$data'
                                ) AND b.ky = '$ky' AND LEFT(b.nam, 4) = '$nam'");
            //select phân trang
            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                FROM mega_acount as a
                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                WHERE a.nhom_id IN (
                                SELECT nhom_id
                                FROM mega_acount_nhom
                                WHERE nhom_admin = '$data'
                                ) AND b.ky = '$ky' AND LEFT(b.nam, 4) = '$nam'  
                                LIMIT $startIndex, $itemsPerPage");
            while ($row = mysqli_fetch_array($kq)) {
                $datas[] = $row;
            }
            while ($row = mysqli_fetch_array($kq1)) {
                $countData[] = $row;
            }
        }else {
            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                FROM mega_acount as a
                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                WHERE b.check_giaovien = '1' 
                                AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                AND b.ky = '$ky' AND LEFT(b.nam, 4) = '$nam'");
            //select phân trang
            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id, b.*
                                FROM mega_acount as a
                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                WHERE b.check_giaovien = '1' 
                                AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                AND b.ky = '$ky' AND LEFT(b.nam, 4) = '$nam'
                                LIMIT $startIndex, $itemsPerPage");  
            while ($row = mysqli_fetch_array($kq)) {
                $datas[] = $row;
            }
            while ($row = mysqli_fetch_array($kq1)) {
                $countData[] = $row;
            }
        }
         //check số lượng page
         if((count($countData) % $itemsPerPage) == 0) {
            $totalPage = ((int)(count($countData) / $itemsPerPage)) ;
        } else {
            $totalPage = ((int)(count($countData) / $itemsPerPage)) + 1 ;
        }
    }else if (isset($_POST['user']) ) {
        
        if($type == 'Home') {
            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.check_giaovien, a.tendangnhap
                                FROM mega_acount as a
                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                WHERE a.nhom_id IN (
                                SELECT nhom_id
                                FROM mega_acount_nhom
                                WHERE nhom_admin = '$data'
                                ) AND b.check_giaovien = '0'");
            while ($row = mysqli_fetch_array($kq)) {
                $datas[] = $row;
            }
        }else {
            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id  b.*
                                FROM mega_acount as a
                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                WHERE b.check_giaovien = '1' 
                                AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                AND b.check_truongkhoa = '0' ");
            while ($row = mysqli_fetch_array($kq)) {
                $datas[] = $row;
            }
        }
       
    } 
    $kq1 = $db->thucthi("SELECT * FROM `mega_acount` WHERE tendangnhap = '$data'");
    
    while ($row = mysqli_fetch_array($kq1)) {
        $datas1[] = $row;
    } 
        $responseData = [
            'hoclai' => $datas,
            'totalPage'=> $totalPage,
            'tenGv'=> $datas1,
            'page'=> $page,
            'totalData' => $countData,
           
        ];
    
    header('Content-Type: application/json');
    echo json_encode($responseData);
}  else {
    echo json_encode('Lỗi');
}

?>
