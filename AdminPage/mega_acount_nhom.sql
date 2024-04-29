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
-- Cấu trúc bảng cho bảng `mega_acount_nhom`
--

CREATE TABLE `mega_acount_nhom` (
  `nhom_id` varchar(20) NOT NULL,
  `nhom_name` varchar(150) NOT NULL,
  `nhom_admin` varchar(10) DEFAULT NULL,
  `nhom_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `mega_acount_nhom`
--

INSERT INTO `mega_acount_nhom` (`nhom_id`, `nhom_name`, `nhom_admin`, `nhom_active`) VALUES
('ADMIN', 'Quản trị', NULL, 1),
('DK10-CK1', 'Đại học khóa 10 Cơ khí 1', '01004014', 1),
('DK10-CK2', 'Đại học khóa 10 Cơ khí 2', '01004036', 1),
('DK10-CNTT', 'Đại học khóa 10 Công nghệ thông tin', '', 1),
('DK10-D1', 'Đại học khóa 10 Điện 1', '01006038', 1),
('DK10-D2', 'Đại học khóa 10 Điện 2', '01006026', 1),
('DK10-D3(HTĐ)', 'Đại học khóa 10 Điện 3', '01006020', 1),
('DK10-DT', 'Đại học khóa 10 Điện tử', '01007028', 1),
('DK10-KT', 'Đại học khóa 10 Kế toán', NULL, 1),
('DK10-KTDK&TDH1', 'Đại học khóa 10 Kỹ thuật điều khiển và Tự động hóa 1', '01006005', 1),
('DK10-KTDK&TDH2', 'Đại học khóa 10 Kỹ thuật điều khiển và Tự động hóa 2', '01006040', 1),
('DK10-M', 'Đại học khóa 10 May', NULL, 1),
('DK10-NTQ1', 'Đại học khóa 10 Ngôn ngữ Trung 1', NULL, 1),
('DK10-NTQ2', 'Đại học khóa 10 Ngôn ngữ Trung 2', NULL, 1),
('DK10-OTO1', 'Đại học khóa 10 Ô tô 1', '01001006', 1),
('DK10-OTO2', 'Đại học khóa 10 Ô tô 2', '01001018', 1),
('DK10-OTO3', 'Đại học khóa 10 Ô tô 3', '01001005', 1),
('DK10-OTO4(CNOTO)', 'Đại học khóa 10 Ô tô 4', '01001004', 1),
('DK10-QTKD', 'Đại học khóa 10 Quản trị kinh doanh', NULL, 1),
('DK10-TP', 'Đại học khóa 10 Thực phẩm', '01003004', 1),
('DK10LT-CK', 'Đại học khóa 10 liên thông Cơ khí', NULL, 1),
('DK10LT-CNTT', 'Đại học khóa 10 liên thông Công nghệ thông tin', NULL, 1),
('DK10LT-D', 'Đại học khóa 10 liên thông Điện', NULL, 1),
('DK10LT-DT', 'Đại học khóa 10 liên thông Điện tử', NULL, 1),
('DK10LT-KT', 'Đại học khóa 10 liên thông Kế toán', NULL, 1),
('DK10LT-OTO', 'Đại học khóa 10 liên thông Ô tô', NULL, 1),
('DK11-CK1', 'Đại học khóa 11 Cơ khí 1', '01004036', 1),
('DK11-CK2', 'Đại học khóa 11 Cơ khí 2', '01004040', 1),
('DK11-CK3', 'Đại học khóa 11 Cơ khí 3', '01004055', 1),
('DK11-CNTT1', 'Đại học khóa 11 Công nghệ thông tin 1', '01007027', 1),
('DK11-CNTT2', 'Đại học khóa 11 Công nghệ thông tin 2', '01007029', 1),
('DK11-D1', 'Đại học khóa 11 Điện 1', '01006033', 1),
('DK11-D2', 'Đại học khóa 11 Điện 2', '01006023', 1),
('DK11-D3', 'Đại học khóa 11 Điện 3', '01006036', 1),
('DK11-D4', 'Đại học khóa 11 Điện 4', '01006034', 1),
('DK11-DT', 'Đại học khóa 11 Điện tử', '01007026', 1),
('DK11-KT', 'Đại học khóa 11 Kế toán', '01010026', 1),
('DK11-KTDK&TDH1', 'Đại học khóa 11 Kỹ thuật điều khiển và Tự động hóa 1', '01006024', 1),
('DK11-KTDK&TDH2', 'Đại học khóa 11 Kỹ thuật điều khiển và Tự động hóa 2', '01015013', 1),
('DK11-KTDK&TDH3', 'Đại học khóa 11 Kỹ thuật điều khiển và Tự động hóa 3', '01022001', 1),
('DK11-M', 'Đại học khóa 11 May', '01002011', 1),
('DK11-NA', 'Đại học khóa 11 Ngôn ngữ Anh', '01005022', 1),
('DK11-NTQ1', 'Đại học khóa 11 Ngôn ngữ Trung 1', '01005040', 1),
('DK11-NTQ2', 'Đại học khóa 11 Ngôn ngữ Trung 2', '01005040', 1),
('DK11-NTQ3', 'Đại học khóa 11 Ngôn ngữ Trung 3', '01005045', 1),
('DK11-OTO1', 'Đại học khóa 11 Ô tô 1', '01001014', 1),
('DK11-OTO2', 'Đại học khóa 11 Ô tô 2', '01004028', 1),
('DK11-OTO3', 'Đại học khóa 11 Ô tô 3', '01003008', 1),
('DK11-OTO4', 'Đại học khóa 11 Ô tô 4', '01001003', 1),
('DK11-OTO5', 'Đại học khóa 11 Ô tô 5', '01001012', 1),
('DK11-OTO6', 'Đại học khóa 11 Ô tô 6', '01015009', 1),
('DK11-QTKD', 'Đại học khóa 11 Quản trị kinh doanh', '01005006', 1),
('DK11-VNH', 'Đại học khóa 11 Việt Nam học', '01005012', 1),
('DK11LT-CK1', 'Đại học khóa 11 liên thông Cơ khí 1', NULL, 1),
('DK11LT-CK2', 'Đại học khóa 11 liên thông Cơ khí 2', NULL, 1),
('DK11LT-CNTT', 'Đại học khóa 11 liên thông Công nghệ thông tin', NULL, 1),
('DK11LT-D1', 'Đại học khóa 11 liên thông Điện 1', NULL, 1),
('DK11LT-D2', 'Đại học khóa 11 liên thông Điện 2', NULL, 1),
('DK11LT-DT', 'Đại học khóa 11 liên thông Điện tử', NULL, 1),
('DK11LT-KT', 'Đại học khóa 11 liên thông Kế toán', NULL, 1),
('DK11LT-OTO', 'Đại học khóa 11 liên thông Ô tô', NULL, 1),
('DK12-ATTP', 'Đại học khóa 12 An toàn thực phẩm', '01003014', 1),
('DK12-CDT', 'Đại học khóa 12 Cơ điện tử', '01007012', 1),
('DK12-CK1', 'Đại học khóa 12 Cơ khí 1', '01004037', 1),
('DK12-CK2', 'Đại học khóa 12 Cơ khí 2', '01004040', 1),
('DK12-CNTT1', 'Đại học khóa 12 Công nghệ thông tin 1', '01007006', 1),
('DK12-CNTT2', 'Đại học khóa 12 Công nghệ thông tin 2', '01007003', 1),
('DK12-D1', 'Đại học khóa 12 Điện 1', '01001010', 1),
('DK12-D2', 'Đại học khóa 12 Điện 2', '01006049', 1),
('DK12-D3', 'Đại học khóa 12 Điện 3', '01006037', 1),
('DK12-DT', 'Đại học khóa 12 Điện tử', '01007012', 1),
('DK12-KT', 'Đại học khóa 12 Kế toán', '01010009', 1),
('DK12-KTDK&TDH1', 'Đại học khóa 12 Kỹ thuật điều khiển và Tự động hóa 1', '01007032', 1),
('DK12-KTDK&TDH2', 'Đại học khóa 12 Kỹ thuật điều khiển và Tự động hóa 2', '01010002', 1),
('DK12-KTDK&TDH3', 'Đại học khóa 12 Kỹ thuật điều khiển và Tự động hóa 3', '01006021', 1),
('DK12-KTDK&TDH4', 'Đại học khóa 12 Kỹ thuật điều khiển và Tự động hóa 4', '01007021', 1),
('DK12-M', 'Đại học khóa 12 May', '01002019', 1),
('DK12-NA', 'Đại học khóa 12 Ngôn ngữ Anh', '01005026', 1),
('DK12-NTQ1', 'Đại học khóa 12 Ngôn ngữ Trung 1', '01005013', 1),
('DK12-NTQ2', 'Đại học khóa 12 Ngôn ngữ Trung 2', '01005013', 1),
('DK12-NTQ3', 'Đại học khóa 12 Ngôn ngữ Trung 3', '01005045', 1),
('DK12-OTO1', 'Đại học khóa 12 Ô tô 1', '01001006', 1),
('DK12-OTO2', 'Đại học khóa 12 Ô tô 2', '01001018', 1),
('DK12-OTO3', 'Đại học khóa 12 Ô tô 3', '01001005', 1),
('DK12-OTO4', 'Đại học khóa 12 Ô tô 4', '01001011', 1),
('DK12-OTO5', 'Đại học khóa 12 Ô tô 5', '01015009', 1),
('DK12-QTDL', 'Đại học khóa 12 Quản trị du lịch', NULL, 1),
('DK12-QTKD', 'Đại học khóa 12 Quản trị kinh doanh', '01005020', 1),
('DK12-TP', 'Đại học khóa 12 Thực phẩm', '01003014', 1),
('DK13-CDT', 'Đại học khóa 13 Cơ điện tử', '01005030', 1),
('DK13-CK1', 'Đại học khóa 13 Cơ khí 1', '01014013', 1),
('DK13-CNTT', 'Đại học khóa 13 CNTT', '\n', 1),
('DK13-CNTT1', 'Đại học khóa 13 Công nghệ thông tin 1', '01007005', 1),
('DK13-CNTT2', 'Đại học khóa 13 Công nghệ thông tin 2', '01007033', 1),
('DK13-D1', 'Đại học khóa 13 Điện 1', '01006007', 1),
('DK13-D2', 'Đại học khóa 13 Điện 2', '01006011', 1),
('DK13-DT', 'Đại học khóa 13 Điện tử', NULL, 1),
('DK13-KT', 'Đại học khóa 13 Kế toán', '01010062', 1),
('DK13-KTDK&amp;TDH1', 'Đại học khóa 13 Kỹ thuật điều khiển và Tự động hóa 1', '01006028', 1),
('DK13-KTDK&amp;TDH2', 'Đại học khóa 13 Kỹ thuật điều khiển và Tự động hóa 2', '01006029', 1),
('DK13-KTDK&amp;TDH3', 'Đại học khóa 13 Kỹ thuật điều khiển và Tự động hóa 3', '01006029', 1),
('DK13-KTDK&amp;TDH4', 'Đại học khóa 13 Kỹ thuật điều khiển và Tự động hóa 4', '01006028', 1),
('DK13-M', 'Đại học khóa 13 May', '01002021', 1),
('DK13-NA', 'Đại học khóa 13 Ngôn ngữ Anh', '01005007', 1),
('DK13-NTQ1', 'Đại học khóa 13 Ngôn ngữ Trung 1', '01005013', 1),
('DK13-NTQ2', 'Đại học khóa 13 Ngôn ngữ Trung 2', '01005038', 1),
('DK13-NTQ3', 'Đại học khóa 13 Ngôn ngữ Trung 3', '01005021', 1),
('DK13-OTO1', 'Đại học khóa 13 Ô tô 1', '01001004', 1),
('DK13-OTO2', 'Đại học khóa 13 Ô tô 2', '01008021', 1),
('DK13-OTO3', 'Đại học khóa 13 Ô tô 3', '01010033', 1),
('DK13-OTO4', 'Đại học khóa 13 Ô tô 4', '01011002', 1),
('DK13-OTO5', 'Đại học khóa 13 Ô tô 5', '01008023', 1),
('DK13-QTDL', 'Đại học khóa 13 Quản trị du lịch', '01005017', 1),
('DK13-QTKD', 'Đại học khóa 13 Quản trị kinh doanh', '01010057', 1),
('DK13-TP', 'Đại học khóa 13 Thực phẩm', '01003004', 1),
('DK14-CDT', 'Đại học khóa 14 Cơ điện tử', '01004037', 1),
('DK14-CK', 'Đại học khóa 14 Cơ khí', '01004036', 1),
('DK14-CNTT1', 'Đại học khóa 14 Công nghệ thông tin 1', NULL, 1),
('DK14-CNTT2', 'Đại học khóa 14 Công nghệ thông tin 2', NULL, 1),
('DK14-D1', 'Đại học khóa 14 Điện 1', '01006038', 1),
('DK14-D2', 'Đại học khóa 14 Điện 2', '01007028', 1),
('DK14-D3', 'Đại học khóa 14 Điện 3', '01007013', 1),
('DK14-KT', 'Đại học khóa 14 Kế toán', NULL, 1),
('DK14-KTDK.TDH1', 'Đại học khóa 14 Kỹ thuật điều khiển và Tự động hóa 1', '01006038', 1),
('DK14-KTDK.TDH2', 'Đại học khóa 14 Kỹ thuật điều khiển và Tự động hóa 2', '01006040', 1),
('DK14-KTDK.TDH3', 'Đại học khóa 14 Kỹ thuật điều khiển và Tự động hóa 3', '01007025', 1),
('DK14-KTDK.TDH4', 'Đại học khóa 14 Kỹ thuật điều khiển và Tự động hóa 4', '01006026', 1),
('DK14-M', 'Đại học khóa 14 May', NULL, 1),
('DK14-NTQ1', 'Đại học khóa 14 Ngôn ngữ Trung 1', '01005013', 1),
('DK14-NTQ2', 'Đại học khóa 14 Ngôn ngữ Trung 2', '01005040', 1),
('DK14-NTQ3', 'Đại học khóa 14 Ngôn ngữ Trung 3', '01005045', 1),
('DK14-OTO1', 'Đại học khóa 14 Ô tô 1', '01001011', 1),
('DK14-OTO2', 'Đại học khóa 14 Ô tô 2', '01004028', 1),
('DK14-OTO3', 'Đại học khóa 14 Ô tô 3', '01001014', 1),
('DK14-OTO4', 'Đại học khóa 14 Ô tô 4', '01011012', 1),
('DK14-OTO5', 'Đại học khóa 14 Ô tô 5', '01011004', 1),
('DK14-OTO6', 'Đại học khóa 14 Ô tô 6', '01005005', 1),
('DK14-QTDL', 'Đại học khóa 14 Quản trị du lịch', '01005012', 1),
('DK14-QTKD', 'Đại học khóa 14 Quản trị kinh doanh', NULL, 1),
('DK14-TP', 'Đại học khóa 14 Thực phẩm', NULL, 1),
('DK9-CK1', 'Đại học khóa 9 Cơ khí 1', NULL, 0),
('DK9-CK2', 'Đại học khóa 9 Cơ khí 2', NULL, 0),
('DK9-CNTT', 'Đại học khóa 9 Công nghệ thông tin', NULL, 0),
('DK9-D1', 'Đại học khóa 9 Điện 1', NULL, 0),
('DK9-D2', 'Đại học khóa 9 Điện 2', NULL, 0),
('DK9-DT', 'Đại học khóa 9 Điện tử', NULL, 0),
('DK9-KT', 'Đại học khóa 9 Kế toán', NULL, 0),
('DK9-KTDK&TDH', 'Đại học khóa 9 Kỹ thuật điều khiển và Tự động hóa', NULL, 0),
('DK9-M', 'Đại học khóa 9 May', NULL, 0),
('DK9-NTQ1', 'Đại học khóa 9 Ngôn ngữ Trung 1', NULL, 0),
('DK9-NTQ2', 'Đại học khóa 9 Ngôn ngữ Trung 2', NULL, 0),
('DK9-OTO1', 'Đại học khóa 9 Ô tô 1', NULL, 0),
('DK9-OTO2', 'Đại học khóa 9 Ô tô 2', NULL, 0),
('DK9-OTO3', 'Đại học khóa 9 Ô tô 3', NULL, 0),
('DK9-QTKD', 'Đại học khóa 9 Quản trị kinh doanh', NULL, 0),
('DK9-VNH', 'Đại học khóa 9 Việt Nam học', NULL, 0),
('GVCN', 'Giảng viên chủ nhiệm', NULL, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `mega_acount_nhom`
--
ALTER TABLE `mega_acount_nhom`
  ADD PRIMARY KEY (`nhom_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
