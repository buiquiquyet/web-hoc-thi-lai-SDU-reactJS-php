<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require('Classes/PHPExcel.php');
require 'Classes/PHPExcel/Cell.php';
require('Classes/PHPExcel/IOFactory.php');
include "database.php";
$db = new database();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['excelFile']) && $_FILES['excelFile']['error'] === UPLOAD_ERR_OK) {
        $inputFileName = $_FILES['excelFile']['tmp_name'];
        $inserted_row = 0;
        $file = fopen($inputFileName, 'r');
        while (!feof($file)) {
        
            //tạo đối tượng đọc phù hợp với excel
            $objReader = PHPExcel_IOFactory::createReaderForFile($inputFileName);
    
            //dùng để tải file Excel đã được upload lên bằng PHP lên và chuyển đổi nó thành một đối tượng PHPExcel
            $objExel = $objReader->load($inputFileName);

            // phương thức sử dụng để lấy đối tượng Worksheet 
            $sheetData = $objExel->getActiveSheet();

            $highestRow = $sheetData->getHighestRow();
        
            $columnIterator = $sheetData->getHighestDataColumn();
    
            $col = PHPExcel_Cell::columnIndexFromString($columnIterator);
            $number = 0;
            $array = array();
    
            for ($column = 0 ; $column <=$col; $column++) {
                for($i = 1; $i <= $highestRow; $i++){
                    $data = $sheetData->getCellByColumnAndRow($column,$i)->getValue();
                        if(empty($data)){
                            break;
                        }
                        else{
                            array_push($array,$column);
                        }   
                }
            }
            $arr = array_values(array_unique($array));

            $compare = $db->thucthi("SELECT tendangnhap From mega_acount");
            $member_ids = array();
            while ($row = $compare->fetch_array()) {
                    $member_ids[] = $row['tendangnhap'];
            }
            $compare_arr = array();
            for($row = 1; $row <= $highestRow; $row++){
                    $id = $sheetData->getCellByColumnAndRow(intval($arr[0]), $row)->getValue();
                    if(in_array($id,$member_ids)){
                        array_push($compare_arr,$id);
                    }  
            }
            if(count($compare_arr) == ($highestRow - 1)){
                header('Content-Type: application/json');
                echo json_encode('lỗi');
                for ($i = 0; $i < count($compare_arr); $i++) {
                    unset($compare_arr[$i]);   
                }          
            }else{
            
                for($row = 2; $row <= $highestRow; $row++){
                    $tendangnhap = $sheetData->getCellByColumnAndRow(intval($arr[0]), $row)->getValue();
                    $matkhau = $sheetData->getCellByColumnAndRow(intval($arr[1]), $row)->getValue();
                    $nhomid = $sheetData->getCellByColumnAndRow(intval($arr[2]), $row)->getValue();
                    $hodem = $sheetData->getCellByColumnAndRow(intval($arr[3]), $row)->getValue();
                    $ten = $sheetData->getCellByColumnAndRow(intval($arr[4]), $row)->getValue();
                    // $mpasswd = password_hash($pass, PASSWORD_BCRYPT);
                    if(in_array($id,$member_ids)){
                        continue;
                    }else{
                        $db->thucthi("INSERT IGNORE  INTO mega_acount
                        (tendangnhap, matkhau,nhom_id, hodem, ten) values('$tendangnhap','$matkhau','$nhomid','$hodem','$ten')");
                        $inserted_row++;      
                    }   
                }         
            } 
        
            fclose($file);
            exit();
        }
    if($inserted_row > 0) {
        header('Content-Type: application/json');
        echo json_encode('ok');
    }
       
    } else {
        header('Content-Type: application/json');
        echo json_encode('lỗi');
    }
} else {
    
}

?>
