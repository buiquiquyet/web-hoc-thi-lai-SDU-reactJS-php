<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require('Classes/PHPExcel.php');
require 'Classes/PHPExcel/Cell.php';
require('Classes/PHPExcel/IOFactory.php');
include "database.php";
$db = new database();
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $objPHPExcel = new PHPExcel();
    $objPHPExcel->setActiveSheetIndex(0);
    $sheet = $objPHPExcel->getActiveSheet()->setTitle('Đăng kí học lại');

    $rowCount = 1;
    $sheet->setCellValue('A'.$rowCount, 'Id')
            ->setCellValue('B'.$rowCount, 'Tên học phần')
            ->setCellValue('C'.$rowCount, 'Số tín')
            ->setCellValue('D'.$rowCount, 'Loại')
            ->setCellValue('E'.$rowCount, 'Tên sinh viên')
            ->setCellValue('F'.$rowCount, 'Tên giáo viên')
            ->setCellValue('G'.$rowCount, 'Kỳ học')
            ->setCellValue('H'.$rowCount, 'Ghi chú')
            ->setCellValue('I'.$rowCount, 'Thời gian');

    $result = $db->thucthi("SELECT hodem, ten,  id, sotin, tenhocphan, ky, loai, id_giao_vien, ghichu, thoigian
                            FROM mega_acount as a
                            INNER JOIN mega_dangky_hoc as b ON a.tendangnhap = b.id_sinh_vien
                            AND b.check_truongkhoa = '1'");

    while($row = $result->fetch_array()){
        $rowCount++;
        $sheet->setCellValue('A'.$rowCount,$row['id'])
                ->setCellValue('B'.$rowCount,$row['tenhocphan'])
                ->setCellValue('C'.$rowCount,$row['sotin'])
                ->setCellValue('D'.$rowCount,$row['loai'])
                ->setCellValue('E'.$rowCount,$row['hodem'].' '. $row['ten'])
                ->setCellValue('F'.$rowCount,$row['id_giao_vien'])
                ->setCellValue('G'.$rowCount,$row['ky'])
                ->setCellValue('H'.$rowCount,$row['ghichu'])
                ->setCellValue('I'.$rowCount,$row['thoigian']);
    }

    // Tạo tệp Excel tạm thời
    $filename = 'export.xlsx';
    $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
    $objWriter->save($filename);

    // Set headers for file download
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Content-Length: ' . filesize($filename));
    header('Content-Transfer-Encoding: binary');
    header('Cache-Control: must-revalidate');
    header('Pragma: no-cache');

    // Gửi tệp Excel dưới dạng tải
    readfile($filename);
    exit; // Kết thúc kịch bản PHP sau khi gửi tệp Excel

} else {
}
