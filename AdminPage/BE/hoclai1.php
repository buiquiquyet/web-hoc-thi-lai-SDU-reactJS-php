<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
include "database.php";
$db = new database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //formData
    $type = $_POST['type'];
    $data = $_POST['user'];
    $typeSidebar = $_POST['typeSidebar'];
    $trangthai = $_POST['trangthai'];
    $dataUpdate = json_decode($_POST['duyet'], true); 
    $typeTable = isset($_POST['typeTable']) ? $_POST['typeTable'] :'';
    $totalData = isset($_POST['totalData']) ? json_decode($_POST['totalData'], true) : [];
    $idtotalData = !empty($totalData) ? implode(",", $totalData) : [];
    $checkDataToDuyet = isset($_POST["checkDataToDuyet"]) ? $_POST["checkDataToDuyet"] : 0 ;
     //phân trang
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $itemsPerPage = 10;
    $startIndex = ($page - 1) * $itemsPerPage;
    $endIndex = $startIndex + $itemsPerPage - 1;
    //số lượng page
    $totalPage = 0 ;
    //update
    $updateResult = '';
    //init
    $responseData = [];
    $datas = [];
    $countData = [];
    $tenGv = [];
    $totalPage = 0;

    $typeTableCsdl = $typeSidebar == 'hoclai' ? 'mega_dangky_hoc' : 'mega_dangky_thi';
    //khi lọc kỳ năm truyền từ Home xuống
    if($checkDataToDuyet != 0 && empty($dataUpdate)  ) {
        if($trangthai == '') {
            if($type == 'Home') {
                $kq1 = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE a.nhom_id IN (
                                    SELECT nhom_id
                                    FROM mega_acount_nhom
                                    WHERE nhom_admin = '$data' 
                                    ) AND b.id IN ($idtotalData) ");
                //select khi lọc 
                $kq = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE a.nhom_id IN (
                                    SELECT nhom_id
                                    FROM mega_acount_nhom
                                    WHERE nhom_admin = '$data' 
                                    ) AND b.id IN ($idtotalData) LIMIT $startIndex, $itemsPerPage");
            } else {
                $kq1 = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE b.check_giaovien = '1' 
                                    AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                    AND b.id IN ($idtotalData) ");
                //select khi lọc 
                $kq = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE b.check_giaovien = '1' 
                                    AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                    AND b.id IN ($idtotalData) LIMIT $startIndex, $itemsPerPage");  
            }
           
        } else {
            if( $type == 'Home') {
                $kq1 = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE a.nhom_id IN (
                                    SELECT nhom_id
                                    FROM mega_acount_nhom
                                    WHERE nhom_admin = '$data' 
                                    ) AND b.id IN ($idtotalData)  ");
                //select khi lọc 
                $kq = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE a.nhom_id IN (
                                    SELECT nhom_id
                                    FROM mega_acount_nhom
                                    WHERE nhom_admin = '$data' 
                                    ) AND b.id IN ($idtotalData)  AND b.check_giaovien = '$trangthai' LIMIT $startIndex, $itemsPerPage");
            }else {
                $kq1 = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE b.check_giaovien = '1' 
                                    AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                    AND b.id IN ($idtotalData) ");
                //select khi lọc 
                $kq = $db->thucthi("SELECT a.hodem, a.ten,  b.*
                                    FROM mega_acount as a
                                    INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                    WHERE b.check_giaovien = '1' 
                                    AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                    AND b.id IN ($idtotalData) AND b.check_truongkhoa = '$trangthai' LIMIT $startIndex, $itemsPerPage");  
            }
        }
    }
    //khi thực hiện trong table
    //check khi bắt đầu load, khi update mà chưa filter, khi chưa có totalData(tổng các dữ liệu được hiển thị lên)
    //chỉ đển load và update khi chưa lọc
    else {
        if((!empty($dataUpdate) && $trangthai !='' && $typeTable == '' && empty($totalData)) || ($data !='' && $dataUpdate == '' && $trangthai == '') || (!empty($dataUpdate) && $trangthai =='' && empty($totalData)) ) {
            //duyet
                //update khi chưa lọc
                    //Home
                    if($type == 'Home') {
                        if(!empty($dataUpdate) && $trangthai != '') {
                            $idList = implode(",", $dataUpdate);
                            $update = $db->thucthi("UPDATE $typeTableCsdl 
                                                    SET id_khoa = (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data'),
                                                    check_giaovien= '$trangthai', 
                                                    id_giao_vien = '$data' WHERE id IN ($idList)");
                            if($update) {
                                $updateResult = 'Thành công';
                            } else {
                                $updateResult = 'Lỗi';
                            } 
                        }
                        $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id, b.*
                        FROM mega_acount as a
                        INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                        WHERE a.nhom_id IN (
                            SELECT nhom_id
                            FROM mega_acount_nhom
                            WHERE nhom_admin = '$data' 
                        )  ");
                        //select bình thường khi lọc 
                        $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id, b.*
                                FROM mega_acount as a
                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                WHERE a.nhom_id IN (
                                    SELECT nhom_id
                                    FROM mega_acount_nhom
                                    WHERE nhom_admin = '$data' 
                                ) LIMIT $startIndex, $itemsPerPage");
                    //Department
                    } else if ($type == 'Department') {
                        if(!empty($dataUpdate) && $trangthai != '') {
                            $idList = implode(",", $dataUpdate);
                            $update = $db->thucthi("UPDATE $typeTableCsdl SET
                                                    check_truongkhoa= '$trangthai', 
                                                    id_truong_khoa = '$data' WHERE id IN ($idList)");
                            if($update) {
                                $updateResult = 'Thành công';
                            } else {
                                $updateResult = 'Lỗi';
                            } 
                        }
                        $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                            FROM mega_acount as a
                                            INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                            WHERE b.check_giaovien = '1' 
                                            AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa") ;
                        //select bình thường khi lọc 
                        $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                            FROM mega_acount as a
                                            INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                            WHERE b.check_giaovien = '1' 
                                            AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa       
                                            LIMIT $startIndex, $itemsPerPage");
                    }
                
        } else if(($trangthai !=''  && empty($dataUpdate)) || (!empty($dataUpdate) && $trangthai !='') || !empty($totalData) ) {
            //filter
                //update khi đã lọc
                //update thành công thì chỉ hiển thị những data đã lọc từ trước
                if((!empty($dataUpdate) && $trangthai != '' && !empty($totalData)) || (!empty($dataUpdate) && $trangthai != '' && !empty($totalData) && $checkDataToDuyet != 0 )  ) {
                    $idList = implode(",", $dataUpdate);
                    //Home
                    if($type == 'Home') {
                        $update = $db->thucthi("UPDATE $typeTableCsdl 
                                                SET id_khoa = (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data'),
                                                check_giaovien= '$trangthai', 
                                                id_giao_vien = '$data' WHERE id IN ($idList)");
                        if($update) {
                            $updateResult = 'Thành công';
                        } else {
                            $updateResult = 'Lỗi';
                        } 
                        $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                            FROM mega_acount as a
                                            INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                            WHERE a.nhom_id IN (
                                            SELECT nhom_id
                                            FROM mega_acount_nhom
                                            WHERE nhom_admin = '$data' 
                                            ) AND b.id IN ($idtotalData) ");
                        //select khi lọc 
                        $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                            FROM mega_acount as a
                                            INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                            WHERE a.nhom_id IN (
                                            SELECT nhom_id
                                            FROM mega_acount_nhom
                                            WHERE nhom_admin = '$data' 
                                            ) AND b.id IN ($idtotalData) LIMIT $startIndex, $itemsPerPage");
                    //Department
                    } else if($type == 'Department') {
                        $update = $db->thucthi("UPDATE $typeTableCsdl SET 
                                                check_truongkhoa = '$trangthai', 
                                                id_truong_khoa = '$data' WHERE id IN ($idList)");
                        if($update) {
                            $updateResult = 'Thành công';
                        } else {
                            $updateResult = 'Lỗi';
                        } 
                        $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                            FROM mega_acount as a
                                            INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                            WHERE b.check_giaovien = '1' 
                                            AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa      
                                            AND b.id IN ($idtotalData) ");
                        //select khi lọc 
                        $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                            FROM mega_acount as a
                                            INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                            WHERE b.check_giaovien = '1' 
                                            AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa     
                                            AND b.id IN ($idtotalData) LIMIT $startIndex, $itemsPerPage");
                    }
               
                }else if((empty($dataUpdate) && $trangthai != '') || !empty($dataUpdate) && $trangthai == '' && !empty($totalData)) {
                     //khi chọn phân trang thì nó chỉ hiển thị những data đã lọc từ trước
                    if(!empty($totalData) ) {
                        if($type == 'Home'){
                            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE a.nhom_id IN (
                                                SELECT nhom_id
                                                FROM mega_acount_nhom
                                                WHERE nhom_admin = '$data' 
                                                ) AND b.id IN ($idtotalData) ");
                            //select khi lọc 
                            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE a.nhom_id IN (
                                                SELECT nhom_id
                                                FROM mega_acount_nhom
                                                WHERE nhom_admin = '$data' 
                                                ) AND b.id IN ($idtotalData) LIMIT $startIndex, $itemsPerPage");
                        }else {
                            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE b.check_giaovien = '1' 
                                                AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                                AND b.id IN ($idtotalData) ");
                            //select khi lọc 
                            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE b.check_giaovien = '1' 
                                                AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                                AND b.id IN ($idtotalData) LIMIT $startIndex, $itemsPerPage");  
                        }
                    //hiển thị lọc khi chỉ chọn trạng thái 
                    }else {
                        if($type == 'Home'){
                            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE a.nhom_id IN (
                                                SELECT nhom_id
                                                FROM mega_acount_nhom
                                                WHERE nhom_admin = '$data'
                                                ) AND b.check_giaovien = '$trangthai' ");
                            //select phân trang
                            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE a.nhom_id IN (
                                                SELECT nhom_id
                                                FROM mega_acount_nhom
                                                WHERE nhom_admin = '$data'
                                                ) AND b.check_giaovien = '$trangthai' LIMIT $startIndex, $itemsPerPage");           
                        } else {
                            $kq1 = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE b.check_giaovien = '1' 
                                                AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                                AND b.check_truongkhoa = '$trangthai' ");
                            //select phân trang
                            $kq = $db->thucthi("SELECT a.hodem, a.ten, a.nhom_id,  b.*
                                                FROM mega_acount as a
                                                INNER JOIN $typeTableCsdl as b ON a.tendangnhap = b.id_sinh_vien       
                                                WHERE b.check_giaovien = '1' 
                                                AND (SELECT id_khoa FROM mega_acount WHERE tendangnhap = '$data') = b.id_khoa  
                                                AND b.check_truongkhoa = '$trangthai' LIMIT $startIndex, $itemsPerPage");  
                        }
                    }
                }
        }
    }
    
     //thưc hiện thêm dữ liệu vào arr
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
    if($updateResult != '') {
        $responseData = [
            'hoclai' => $datas,
            'totalPage' => $totalPage,
            'update'=> $updateResult,
            // 'page'=> $page,
            'totalData' => $countData,
            
        ];
    }else {
        $responseData = [
            'hoclai' => $datas,
            'totalPage' => $totalPage,
            // 'page'=> $page,
            'totalData' => $countData,
            
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($responseData);    
}
?>