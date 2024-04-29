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
-- Cấu trúc bảng cho bảng `mega_dangky_thi`
--

CREATE TABLE `mega_dangky_thi` (
  `id` int(11) NOT NULL,
  `sotin` int(11) NOT NULL DEFAULT 0,
  `tenhocphan` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `ky` int(11) NOT NULL DEFAULT 0,
  `loai` int(11) NOT NULL DEFAULT 0,
  `diemlan1` float NOT NULL DEFAULT 0,
  `fileupload` varchar(250) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `id_khoa` int(11) NOT NULL,
  `id_sinh_vien` int(11) NOT NULL DEFAULT 0,
  `id_giao_vien` int(11) NOT NULL DEFAULT 0,
  `id_truong_khoa` int(11) NOT NULL DEFAULT 0,
  `check_giaovien` int(11) NOT NULL,
  `check_truongkhoa` int(11) NOT NULL,
  `nam` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ghichu` text COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `thoigian` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `created_at` datetime NOT NULL DEFAULT '1000-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `mega_dangky_thi`
--

INSERT INTO `mega_dangky_thi` (`id`, `sotin`, `tenhocphan`, `ky`, `loai`, `diemlan1`, `fileupload`, `id_khoa`, `id_sinh_vien`, `id_giao_vien`, `id_truong_khoa`, `check_giaovien`, `check_truongkhoa`, `nam`, `ghichu`, `thoigian`, `updated_at`, `created_at`) VALUES
(14, 3, 'Lập trình c', 2, 2, 8, '0', 12, 2000304, 0, 0, 0, 0, '2020-2021', 'Đã đăng ký thi lại', '2023-10-24 21:32:24', '2023-10-24 14:32:24', '2023-10-24 14:32:24'),
(15, 2, 'Trí tuệ nhân tạo', 2, 1, 7, '0', 9, 2000783, 1007029, 1007029, 1, 2, '2020-2021', 'Đã đăng ký thi lại', '2023-10-24 21:34:01', '2023-10-24 14:34:01', '2023-10-24 14:34:01'),
(16, 2, 'Thị giác máy tính', 2, 2, 4, '0', 9, 2000456, 1007029, 1007029, 1, 2, '2020-2021', 'Đã đăng ký thi lại', '2023-10-24 21:34:01', '2023-10-24 14:34:01', '2023-10-24 14:34:01'),
(17, 2, 'Dồ án kiến trúc ngành', 2, 2, 3, '0', 18, 2000786, 0, 0, 0, 0, '2020-2021', 'Đã đăng ký thi lại', '2023-10-24 21:34:01', '2023-10-24 14:34:01', '2023-10-24 14:34:01'),
(18, 2, 'Lập trình ngôn ngữ python', 2, 1, 3, '0', 11, 2000755, 0, 0, 0, 0, '2020-2021', 'Đã đăng ký thi lại', '2023-10-24 21:34:01', '2023-10-24 14:34:01', '2023-10-24 14:34:01');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
