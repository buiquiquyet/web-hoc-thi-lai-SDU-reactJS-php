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
-- Cấu trúc bảng cho bảng `mega_acount_khoa`
--

CREATE TABLE `mega_acount_khoa` (
  `id_khoa` int(11) NOT NULL,
  `name_khoa` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `mega_acount_khoa`
--

INSERT INTO `mega_acount_khoa` (`id_khoa`, `name_khoa`) VALUES
(9, 'Khoa Công nghệ thông tin'),
(11, 'Khoa Cơ khí'),
(12, 'Khoa Điện'),
(13, 'Phòng Quản trị'),
(14, 'Khoa Ô tô'),
(15, 'Khoa Thực phẩm và Hóa học'),
(16, 'Khoa May và Thời trang'),
(17, 'Khoa Kinh tế'),
(18, 'Khoa Du lịch và Ngoại ngữ'),
(19, 'Khoa Giáo dục Chính trị và Thể chất'),
(20, 'Khoa Khoa học Cơ bản');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `mega_acount_khoa`
--
ALTER TABLE `mega_acount_khoa`
  ADD PRIMARY KEY (`id_khoa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
