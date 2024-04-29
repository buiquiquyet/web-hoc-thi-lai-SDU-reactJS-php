-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 29, 2024 lúc 08:26 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web_thi_lai`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mega_dangky_hoc`
--

CREATE TABLE `mega_dangky_hoc` (
  `id` int(11) NOT NULL,
  `sotin` int(11) NOT NULL,
  `tenhocphan` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `ky` int(11) NOT NULL,
  `loai` int(11) NOT NULL,
  `diemdadat` float NOT NULL,
  `fileupload` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'file',
  `id_khoa` int(11) NOT NULL,
  `id_sinh_vien` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `id_giao_vien` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `id_truong_khoa` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `check_giaovien` tinyint(1) NOT NULL DEFAULT 0,
  `check_truongkhoa` tinyint(1) NOT NULL DEFAULT 0,
  `nam` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ghichu` text COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `thoigian` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `mega_dangky_hoc`
--

INSERT INTO `mega_dangky_hoc` (`id`, `sotin`, `tenhocphan`, `ky`, `loai`, `diemdadat`, `fileupload`, `id_khoa`, `id_sinh_vien`, `id_giao_vien`, `id_truong_khoa`, `check_giaovien`, `check_truongkhoa`, `nam`, `ghichu`, `thoigian`) VALUES
(12, 3, 'Ngôn ngữ Java', 1, 2, 3, 'file', 9, '2000787', '01007029', '01007029', 1, 1, '2020-2021', 'Đã đóng tiền học cải thiện cho cô giáo chủ nhiệm ', '2023-10-24 21:37:43'),
(13, 3, 'Phát triển ứng dụng di động', 1, 1, 2, 'file', 9, '2000783', '01007029', '01007029', 1, 1, '2022-2023', 'Đã đăng ký học lại', '2023-10-24 21:37:44'),
(14, 3, '	Kiến trúc phần mềm', 2, 2, 4, 'file', 9, '2000456', '01007029', '01007029', 2, 2, '2023-2024', 'Đã đóng tiền thi cải thiện cho cô giáo chủ nhiệm ', '2023-10-24 21:37:44'),
(15, 3, '	Kiến trúc phần mềm', 1, 1, 3, 'file', 9, '2000500', '01007029', '01007029', 2, 2, '2022-2023', 'Đã đăng ký học lại', '2023-10-26 23:54:26'),
(16, 3, 'Phát triển ứng dụng di động', 2, 1, 4, 'file', 9, '2000129', '01007027', '01007029', 2, 0, '2022-2023', 'Đã đăng kí học lại', '2023-10-26 23:57:34'),
(17, 3, 'Bảo dưỡng nhanh ô tô', 2, 1, 4, 'file', 14, '2100199', '01001006', '01001004', 1, 2, '2021-2022', 'Đã đăng kí học lại', '2023-10-26 23:57:34'),
(18, 3, 'Lập trình game 3D', 2, 1, 4, 'file', 9, '2000574', '01007029', '01007029', 0, 2, '2022-2023', 'Đã đăng kí học lại', '2023-10-26 23:57:34'),
(19, 2, 'Quản lý dự án phần mềm', 2, 1, 4, 'file', 9, '2000514', '01007029', '01007029', 1, 1, '2020-2021', 'Đã đăng kí học lại', '2023-10-26 23:57:34');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `mega_dangky_hoc`
--
ALTER TABLE `mega_dangky_hoc`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `mega_dangky_hoc`
--
ALTER TABLE `mega_dangky_hoc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
