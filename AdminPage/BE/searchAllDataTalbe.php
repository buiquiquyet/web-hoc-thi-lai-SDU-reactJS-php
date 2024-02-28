<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include "database.php";
$db = new database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
     //phân trang
     $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
     $itemsPerPage = 10;
     $startIndex = ($page - 1) * $itemsPerPage;
     $endIndex = $startIndex + $itemsPerPage - 1;
     //init
     $responseData = [];
     $datas = [];
     $countData = [];
     
     $totalPage = 0;
     //formData
    $totalData = isset($_POST['totalData']) ? json_decode($_POST['totalData'], true) : [];
    $idtotalData = !empty($totalData) ? implode(",", $totalData) : [];

    $selectNameClass = isset($_POST["selectNameClass"]) ? $_POST["selectNameClass"] :"";
    $selectLoaihoc = isset($_POST["loaihoc"]) ? $_POST["loaihoc"] : "";
    $khoa = isset($_POST["khoa"]) ? $_POST["khoa"] : "";
    $selectKy = isset($_POST["ky"]) ? $_POST["ky"] :   "";
    $selectNam = isset($_POST["nam"]) ? $_POST["nam"] : "";
    $selectNam = substr($selectNam,0,4);
    $loaihocPage = isset($_POST["loaiHoc"]) ? $_POST["loaiHoc"] : '';
    //init để set if
    $loaihocCheck = null;
    $khoaCheck = null;
    $khoaCheck = $khoa != '' ? "AND b.id_khoa = '$khoa'" : '';
    if(!empty($totalData) ) {
        $loaihocCheck = $loaihocPage == '1' ? 'mega_dangky_hoc' : 'mega_dangky_thi';
        
        $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id, b.*, c.name_khoa
                            FROM mega_acount as a
                            INNER JOIN `$loaihocCheck` as b ON a.tendangnhap = b.id_sinh_vien 
                            INNER JOIN `mega_acount_khoa` as c ON b.id_khoa = c.id_khoa 
                            AND b.id IN ($idtotalData) $khoaCheck ");
        $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id, b.*, c.name_khoa
                            FROM mega_acount as a
                            INNER JOIN `$loaihocCheck` as b ON a.tendangnhap = b.id_sinh_vien
                            INNER JOIN `mega_acount_khoa` as c ON b.id_khoa = c.id_khoa   
                            AND  b.id IN ($idtotalData)  $khoaCheck
                            LIMIT $startIndex, $itemsPerPage ");              
    } else{
        if($selectNameClass != "" && $selectNam !="" && $selectKy != "" && $selectLoaihoc != "") {
            $loaihocCheck = $selectLoaihoc == '1' ? 'mega_dangky_hoc' : 'mega_dangky_thi';
            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*, c.name_khoa
                                FROM mega_acount as a
                                INNER JOIN  $loaihocCheck as b ON a.tendangnhap = b.id_sinh_vien 
                                INNER JOIN `mega_acount_khoa` as c ON b.id_khoa = c.id_khoa 
                                AND  a.nhom_id = '$selectNameClass' AND b.ky = '$selectKy' AND LEFT(b.nam, 4) = '$selectNam' $khoaCheck");
            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id, b.*, c.name_khoa
                                FROM mega_acount as a
                                INNER JOIN  $loaihocCheck as b ON a.tendangnhap = b.id_sinh_vien  
                                INNER JOIN `mega_acount_khoa` as c ON b.id_khoa = c.id_khoa 
                                AND a.nhom_id = '$selectNameClass' AND b.ky = '$selectKy' AND LEFT(b.nam, 4) = '$selectNam' $khoaCheck
                                LIMIT $startIndex, $itemsPerPage");
       
        } else  {
            $loaihocCheck = $loaihocPage == '1' ? 'mega_dangky_hoc' : 'mega_dangky_thi';
            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id, b.*, c.name_khoa
                                FROM mega_acount as a
                                INNER JOIN $loaihocCheck as b ON a.tendangnhap = b.id_sinh_vien
                                INNER JOIN `mega_acount_khoa` as c ON b.id_khoa = c.id_khoa  $khoaCheck ");
            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*, c.name_khoa
                                FROM mega_acount as a
                                INNER JOIN $loaihocCheck as b ON a.tendangnhap = b.id_sinh_vien
                                INNER JOIN `mega_acount_khoa` as c ON b.id_khoa = c.id_khoa   $khoaCheck
                                LIMIT $startIndex, $itemsPerPage");  
         }  
    } 
    
    while ($row = mysqli_fetch_array($kq)) {
        $datas[] = $row;
        }
    while ($row = mysqli_fetch_array($kq1)) {
        $countData[] = $row;
    }
    //check số lượng page
    if((count($countData) % $itemsPerPage) == 0) {
        $totalPage = ((int)(count($countData) / $itemsPerPage)) ;
    } else {
        $totalPage = ((int)(count($countData) / $itemsPerPage)) + 1 ;
    }
    $responseData = [
        'hoclai' => $datas,
        'totalPage' => $totalPage,
        'page'=> $page,
        'totalData' => $countData,
       
    ];
    

    header('Content-Type: application/json');
    echo json_encode($responseData); 
} else {
    header('Content-Type: application/json');
    echo json_encode('lỗi'); 
}

?>
