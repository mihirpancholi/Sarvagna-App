-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 12, 2025 at 08:03 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sarvagna_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `absent_reason_master`
--

CREATE TABLE `absent_reason_master` (
  `absent_reason_id` int(11) NOT NULL,
  `absent_reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` enum('Y','N') DEFAULT 'N'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `batch_code_master`
--

CREATE TABLE `batch_code_master` (
  `batch_id` int(11) NOT NULL,
  `batch_code` varchar(255) DEFAULT NULL,
  `is_default` enum('Y','N') DEFAULT 'N',
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Stand-in structure for view `batch_code_view`
-- (See below for the actual view)
--
CREATE TABLE `batch_code_view` (
`batch_id` int(11)
,`batch_code` varchar(255)
,`edit` varchar(393)
,`delete` varchar(453)
);

-- --------------------------------------------------------

--
-- Table structure for table `blood_group_master`
--

CREATE TABLE `blood_group_master` (
  `blood_group_id` int(11) NOT NULL,
  `blood_group_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `blood_group_master`
--

INSERT INTO `blood_group_master` (`blood_group_id`, `blood_group_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(2, 'B+', '2025-09-18 09:34:09', 1, '2025-09-18 10:11:42', 1, 'Y', '2025-09-18 15:41:42', 1),
(3, 'B+', '2025-09-18 10:11:51', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'A+', '2025-09-18 10:11:54', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'O+', '2025-09-18 10:12:00', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'O-', '2025-09-18 10:12:04', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'AB+', '2025-09-18 10:12:09', 1, NULL, NULL, 'N', NULL, NULL),
(8, 'AB-', '2025-09-18 10:12:15', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `blood_group_view`
-- (See below for the actual view)
--
CREATE TABLE `blood_group_view` (
`blood_group_id` int(11)
,`blood_group_name` varchar(255)
,`edit` varchar(485)
,`delete` varchar(454)
);

-- --------------------------------------------------------

--
-- Table structure for table `caste_master`
--

CREATE TABLE `caste_master` (
  `caste_id` int(11) NOT NULL,
  `caste_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `caste_master`
--

INSERT INTO `caste_master` (`caste_id`, `caste_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(13, 'Rajput', '2025-09-11 09:45:09', 1, '2025-09-11 09:51:08', NULL, 'N', NULL, NULL),
(14, 'Brahmain', '2025-09-11 09:47:43', 1, '2025-09-18 08:33:51', 1, 'N', NULL, NULL),
(15, 'Bhoi', '2025-09-18 08:23:37', 1, '2025-09-18 08:37:19', 1, 'Y', '2025-09-18 14:07:19', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `caste_view`
-- (See below for the actual view)
--
CREATE TABLE `caste_view` (
`caste_id` int(11)
,`caste_name` varchar(255)
,`edit` varchar(486)
,`delete` varchar(455)
);

-- --------------------------------------------------------

--
-- Table structure for table `category_master`
--

CREATE TABLE `category_master` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `category_master`
--

INSERT INTO `category_master` (`category_id`, `category_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'SC', NULL, 1, '2025-09-21 07:38:46', 1, 'Y', '2025-09-21 13:08:46', 1),
(2, 'OPEN', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(3, 'SC	', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(4, 'SEBC', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(5, 'ST', NULL, 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `category_view`
-- (See below for the actual view)
--
CREATE TABLE `category_view` (
`category_id` int(11)
,`category_name` varchar(255)
,`edit` varchar(483)
,`delete` varchar(452)
);

-- --------------------------------------------------------

--
-- Table structure for table `city_area`
--

CREATE TABLE `city_area` (
  `city_area_id` int(11) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `area_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `city_area`
--

INSERT INTO `city_area` (`city_area_id`, `city_id`, `area_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 10, 'Likoni', '2025-09-21 05:39:38', 1, '2025-09-21 06:02:23', 1, 'Y', '2025-09-21 11:32:23', 1),
(2, 14, 'Kisutu', '2025-09-21 05:40:31', 1, NULL, NULL, 'N', NULL, NULL),
(3, 17, 'Adajan', '2025-09-21 05:44:37', 1, NULL, NULL, 'N', NULL, NULL),
(4, 12, 'Ngamiani', '2025-09-21 06:01:02', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `city_area_view`
-- (See below for the actual view)
--
CREATE TABLE `city_area_view` (
`city_area_id` int(11)
,`area_name` varchar(255)
,`city_name` varchar(255)
,`edit` varchar(483)
,`delete` varchar(452)
);

-- --------------------------------------------------------

--
-- Table structure for table `city_master`
--

CREATE TABLE `city_master` (
  `city_id` int(11) NOT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `taluka_id` int(11) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `city_master`
--

INSERT INTO `city_master` (`city_id`, `state_id`, `country_id`, `district_id`, `taluka_id`, `city_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(9, 3, 2, 3, 3, 'Ahmedabad', '2025-09-20 12:52:34', 1, '2025-09-20 13:17:49', 1, 'N', NULL, NULL),
(10, 0, 5, 0, 0, 'Mombasa', '2025-09-20 13:22:08', 1, NULL, NULL, 'N', NULL, NULL),
(11, 0, 5, 0, 0, 'Nairobi', '2025-09-20 13:22:17', 1, NULL, NULL, 'N', NULL, NULL),
(12, 0, 4, 0, 0, 'Tanga', '2025-09-20 13:22:25', 1, NULL, NULL, 'N', NULL, NULL),
(14, 0, 4, 0, 0, 'Dar Es Salaam', '2025-09-21 05:40:20', 1, '2025-09-27 05:27:48', 1, 'N', NULL, NULL),
(16, 3, 2, 9, 10, 'Adajan', '2025-09-21 05:43:38', 1, NULL, NULL, 'N', NULL, NULL),
(17, 3, 2, 9, 0, 'Surat', '2025-09-21 05:44:26', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `city_view`
-- (See below for the actual view)
--
CREATE TABLE `city_view` (
`city_id` int(11)
,`city_name` varchar(255)
,`district_name` varchar(255)
,`state_name` varchar(255)
,`country_name` varchar(255)
,`taluka_name` varchar(255)
,`edit` varchar(479)
,`delete` varchar(448)
);

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `config_id` int(11) NOT NULL,
  `base_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`config_id`, `base_url`) VALUES
(1, 'http://localhost:3000/');

-- --------------------------------------------------------

--
-- Table structure for table `country_master`
--

CREATE TABLE `country_master` (
  `country_id` int(11) NOT NULL,
  `country_name` varchar(255) DEFAULT NULL,
  `dialing_code` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `country_master`
--

INSERT INTO `country_master` (`country_id`, `country_name`, `dialing_code`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Tanzania', '+255', '2025-09-18 06:40:02', 1, '2025-09-18 08:14:06', NULL, 'Y', '2025-09-18 13:44:06', 1),
(2, 'India', '+91', '2025-09-18 08:08:35', 1, '2025-09-18 08:08:49', NULL, 'N', NULL, NULL),
(3, 'Tanzania', '255', '2025-09-18 08:15:25', 1, '2025-09-18 08:16:16', 1, 'Y', '2025-09-18 13:46:16', 1),
(4, 'Tanzania', '+255', '2025-09-18 08:16:27', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'Kenya', '+254', '2025-09-18 08:16:39', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `country_view`
-- (See below for the actual view)
--
CREATE TABLE `country_view` (
`country_id` int(11)
,`country_name` varchar(255)
,`dialing_code` varchar(10)
,`edit` varchar(482)
,`delete` varchar(450)
);

-- --------------------------------------------------------

--
-- Table structure for table `degree_master`
--

CREATE TABLE `degree_master` (
  `degree_id` int(11) NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `degree_master`
--

INSERT INTO `degree_master` (`degree_id`, `degree`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(2, 'B-Com', '2025-09-18 12:00:15', 1, NULL, NULL, 'N', NULL, NULL),
(3, 'M-Com', '2025-09-18 12:00:22', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'B.Tech', '2025-09-18 12:43:15', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `degree_view`
-- (See below for the actual view)
--
CREATE TABLE `degree_view` (
`degree_id` int(11)
,`degree` varchar(255)
,`edit` varchar(481)
,`delete` varchar(450)
);

-- --------------------------------------------------------

--
-- Table structure for table `district_master`
--

CREATE TABLE `district_master` (
  `district_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `district_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `district_master`
--

INSERT INTO `district_master` (`district_id`, `country_id`, `state_id`, `district_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(3, 2, 3, 'Ahmedabad', '2025-09-19 05:54:50', 1, NULL, NULL, 'N', NULL, NULL),
(4, 2, 4, 'Mumbai', '2025-09-19 05:55:00', 1, NULL, NULL, 'N', NULL, NULL),
(5, 2, 3, 'Gandhinagar', '2025-09-19 05:55:30', 1, NULL, NULL, 'N', NULL, NULL),
(6, 2, 3, 'Navsari', '2025-09-19 05:55:49', 1, NULL, NULL, 'N', NULL, NULL),
(7, 4, 6, 'Dar Es Salaam', '2025-09-20 06:27:35', 1, '2025-09-20 10:13:27', NULL, 'Y', '2025-09-20 15:43:27', 1),
(8, 2, 3, 'Mehsana', '2025-09-20 06:29:55', 1, NULL, NULL, 'N', NULL, NULL),
(9, 2, 3, 'Surat', '2025-09-21 05:04:37', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `district_view`
-- (See below for the actual view)
--
CREATE TABLE `district_view` (
`district_id` int(11)
,`district_name` varchar(255)
,`state_name` varchar(255)
,`country_name` varchar(255)
,`edit` varchar(483)
,`delete` varchar(452)
);

-- --------------------------------------------------------

--
-- Table structure for table `employment_master`
--

CREATE TABLE `employment_master` (
  `employment_id` int(11) NOT NULL,
  `employment_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `employment_master`
--

INSERT INTO `employment_master` (`employment_id`, `employment_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Businessq', '2025-09-22 08:36:15', 1, '2025-09-22 08:37:09', 1, 'Y', '2025-09-22 14:07:09', 1),
(2, 'Government Jobq', '2025-09-22 08:36:54', 1, '2025-09-22 08:37:37', 1, 'Y', '2025-09-22 14:07:37', 1),
(3, 'Business', '2025-09-22 08:37:44', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'Government Job	', '2025-09-22 08:37:51', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'Mandir Sevak	', '2025-09-22 08:37:56', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'Other', '2025-09-22 08:38:01', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'Private Job	', '2025-09-22 08:38:07', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `employment_view`
-- (See below for the actual view)
--
CREATE TABLE `employment_view` (
`employment_id` int(11)
,`employment_name` varchar(255)
,`edit` varchar(485)
,`delete` varchar(454)
);

-- --------------------------------------------------------

--
-- Table structure for table `exam_mark_entry_master`
--

CREATE TABLE `exam_mark_entry_master` (
  `mark_entry_id` int(11) NOT NULL,
  `talim_batch_id` int(11) DEFAULT NULL,
  `examtype_id` int(11) DEFAULT NULL,
  `ytk_id` varchar(50) DEFAULT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `marks` float DEFAULT NULL,
  `attandance` enum('A','P') DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `exam_mark_entry_master`
--

INSERT INTO `exam_mark_entry_master` (`mark_entry_id`, `talim_batch_id`, `examtype_id`, `ytk_id`, `exam_id`, `student_name`, `sevak_id`, `marks`, `attandance`, `remarks`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(34, 2, 7, 'YTK2025S01', 4, 'Vandan Satyenkumar Patel', 3, 25, 'P', '', '2025-10-28 09:44:08', 1, '2025-10-28 09:46:12', 1, 'N', NULL, NULL),
(35, 2, 7, 'YTK2025S018', 4, 'Deep mukesh Thakkar', 5, 20, 'P', '', '2025-10-28 09:44:08', 1, '2025-10-28 09:46:12', 1, 'N', NULL, NULL),
(36, 2, 7, 'YTK2025S02', 4, 'Mayur Manish PAtel', 4, 12, 'P', '', '2025-10-28 09:44:08', 1, '2025-10-28 09:46:12', 1, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `exam_mark_entry_view`
-- (See below for the actual view)
--
CREATE TABLE `exam_mark_entry_view` (
`mark_entry_id` int(11)
,`exam_type` varchar(255)
,`exam_name` varchar(255)
,`total_marks` double
,`exam_date` varchar(10)
,`present_count` bigint(21)
,`absent_count` bigint(21)
,`edit` varchar(425)
,`delete` varchar(486)
);

-- --------------------------------------------------------

--
-- Table structure for table `exam_master`
--

CREATE TABLE `exam_master` (
  `exam_id` int(11) NOT NULL,
  `examtype_id` int(11) DEFAULT NULL,
  `exam_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `exam_master`
--

INSERT INTO `exam_master` (`exam_id`, `examtype_id`, `exam_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 6, 'Satsang Diksha (Oral)', '2025-10-20 06:45:14', 1, '2025-10-20 06:59:20', 1, 'Y', '2025-10-20 12:29:38', 1),
(2, 6, 'Satsang Diksha (Oral)', '2025-10-20 07:00:28', 1, NULL, NULL, 'N', NULL, NULL),
(3, 6, 'Swami Ni Vato Quatation (Oral)	', '2025-10-20 07:00:55', 1, NULL, NULL, 'N', NULL, NULL),
(4, 7, 'Weekly Test-01', '2025-10-20 07:01:15', 1, NULL, NULL, 'N', NULL, NULL),
(5, 7, 'Weekly Test-02', '2025-10-20 07:01:20', 1, NULL, NULL, 'N', NULL, NULL),
(6, 7, 'Weekly Test-03', '2025-10-20 07:01:24', 1, NULL, NULL, 'N', NULL, NULL),
(7, 7, 'Weekly Test-04', '2025-10-20 07:01:33', 1, NULL, NULL, 'N', NULL, NULL),
(8, 8, 'Pravachan Kala Goshthi - 1', '2025-10-20 07:01:52', 1, NULL, NULL, 'N', NULL, NULL),
(9, 8, 'Pravachan Kala Goshthi - 2', '2025-10-20 07:02:03', 1, NULL, NULL, 'N', NULL, NULL),
(10, 8, 'SSP-Parichay	', '2025-10-20 07:02:11', 1, NULL, NULL, 'N', NULL, NULL),
(11, 8, 'SSP-Prarambh	', '2025-10-20 07:02:19', 1, NULL, NULL, 'N', NULL, NULL),
(12, 8, 'SSP-Pravesh	', '2025-10-20 07:02:26', 1, NULL, NULL, 'N', NULL, NULL),
(13, 8, 'SSP-Pravin	', '2025-10-20 07:02:35', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exam_schedule_master`
--

CREATE TABLE `exam_schedule_master` (
  `exam_schedule_id` int(11) NOT NULL,
  `talim_batch_id` int(11) DEFAULT NULL,
  `examtype_id` int(11) DEFAULT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `exam_date` date DEFAULT NULL,
  `total_marks` double DEFAULT NULL,
  `mark_entry_start_date` date DEFAULT NULL,
  `mark_entry_end_date` date DEFAULT NULL,
  `upload_exam_paper` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `exam_schedule_master`
--

INSERT INTO `exam_schedule_master` (`exam_schedule_id`, `talim_batch_id`, `examtype_id`, `exam_id`, `exam_date`, `total_marks`, `mark_entry_start_date`, `mark_entry_end_date`, `upload_exam_paper`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(11, 2, 7, 4, '2025-10-19', 30, '2025-10-21', '2025-10-31', 'src/exam_paper/2025-10-19_7.jpg', '2025-10-21 06:49:27', 1, '2025-10-26 09:04:59', 1, 'N', NULL, NULL),
(12, 2, 7, 5, '2025-10-30', 30, '2025-10-31', '2025-11-12', NULL, '2025-10-27 13:23:35', 1, NULL, NULL, 'N', NULL, NULL),
(13, 2, 8, 8, '2025-11-01', 50, '2025-11-01', '2025-11-15', NULL, '2025-10-27 14:31:54', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `exam_schedule_view`
-- (See below for the actual view)
--
CREATE TABLE `exam_schedule_view` (
`exam_schedule_id` int(11)
,`exam_type` varchar(255)
,`exam_name` varchar(255)
,`exam_date` varchar(10)
,`total_marks` double
,`upload_exam_paper` text
,`mark_entry_start_date` varchar(10)
,`mark_entry_end_date` varchar(10)
,`exam_paper` mediumtext
,`edit` varchar(487)
,`delete` varchar(456)
);

-- --------------------------------------------------------

--
-- Table structure for table `exam_type_master`
--

CREATE TABLE `exam_type_master` (
  `examtype_id` int(11) NOT NULL,
  `exam_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `exam_type_master`
--

INSERT INTO `exam_type_master` (`examtype_id`, `exam_type`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(4, 'Annual', '2025-10-19 10:22:21', 1, '2025-10-20 04:33:04', 1, 'Y', '2025-10-20 10:04:10', 1),
(5, 'Revision Test	', '2025-10-19 10:27:33', 1, '2025-10-20 04:33:13', 1, 'Y', '2025-10-20 10:04:12', 1),
(6, 'Annual', '2025-10-20 04:34:19', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'Revision Test', '2025-10-20 04:34:29', 1, NULL, NULL, 'N', NULL, NULL),
(8, 'Subjectwise Test', '2025-10-20 04:34:35', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `exam_type_view`
-- (See below for the actual view)
--
CREATE TABLE `exam_type_view` (
`examtype_id` int(11)
,`exam_type` varchar(255)
,`edit` varchar(483)
,`delete` varchar(452)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `exam_view`
-- (See below for the actual view)
--
CREATE TABLE `exam_view` (
`exam_id` int(11)
,`exam_type` varchar(255)
,`exam_name` varchar(255)
,`edit` varchar(479)
,`delete` varchar(448)
);

-- --------------------------------------------------------

--
-- Table structure for table `followup_entry`
--

CREATE TABLE `followup_entry` (
  `followup_entry_id` int(11) NOT NULL,
  `followup_setting_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `status` enum('Yes','No') NOT NULL DEFAULT 'No',
  `absent_reason_id` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `followup_sahayak`
--

CREATE TABLE `followup_sahayak` (
  `followup_sahayak_id` int(11) NOT NULL,
  `talim_batch_id` int(20) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Triggers `followup_sahayak`
--
DELIMITER $$
CREATE TRIGGER `followup_sahayak_role_delete` AFTER DELETE ON `followup_sahayak` FOR EACH ROW BEGIN
    UPDATE sevak_master SET role_id = 6 WHERE sevak_id = OLD.sevak_id;
  END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `followup_sahayak_role_update` AFTER INSERT ON `followup_sahayak` FOR EACH ROW BEGIN
    UPDATE sevak_master SET role_id = 7 WHERE sevak_id = NEW.sevak_id;
  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `followup_sahayak_group`
--

CREATE TABLE `followup_sahayak_group` (
  `followup_sahayak_group_id` int(11) NOT NULL,
  `followup_sahayak_id` int(20) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Stand-in structure for view `followup_sahayak_view`
-- (See below for the actual view)
--
CREATE TABLE `followup_sahayak_view` (
`followup_sahayak_id` int(11)
,`talim_batch` varchar(13)
,`sahayak_name` text
,`ContactNo` text
,`edit` varchar(490)
,`delete` varchar(458)
);

-- --------------------------------------------------------

--
-- Table structure for table `followup_setting`
--

CREATE TABLE `followup_setting` (
  `followup_setting_id` int(11) NOT NULL,
  `month` varchar(50) DEFAULT NULL,
  `followup_mode` enum('Absentees','All Sevak') DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `member_count` int(11) DEFAULT NULL,
  `next_gosthidate` date DEFAULT NULL,
  `attachement` text DEFAULT NULL,
  `gosthi_id` int(11) DEFAULT NULL,
  `previous_gosthi_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `followup_setting_view`
-- (See below for the actual view)
--
CREATE TABLE `followup_setting_view` (
`followup_setting_id` int(11)
,`month` varchar(50)
,`followup_mode` enum('Absentees','All Sevak')
,`member_count` int(11)
,`attachement` mediumtext
,`sahayak_name` text
,`group_name` varchar(358)
,`next_gosthidate` varchar(10)
,`edit` varchar(490)
,`delete` varchar(459)
);

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_absent_group_member`
--

CREATE TABLE `gosthi_absent_group_member` (
  `gosthi_absent_id` int(11) NOT NULL,
  `gosthi_report_submission_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `sevak_id` int(11) NOT NULL,
  `attandance` enum('A','P') NOT NULL DEFAULT 'P',
  `absent_remark` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL,
  `other_remark` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_activity_detail`
--

CREATE TABLE `gosthi_activity_detail` (
  `gosthi_activity_detail_id` int(11) NOT NULL,
  `gosthi_report_submission_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `gosthi_schedule_detail_id` int(11) DEFAULT NULL,
  `sel` enum('Y','N') NOT NULL DEFAULT 'Y',
  `sevak_id` int(11) DEFAULT NULL,
  `gosthi_topic_type_id` int(11) DEFAULT NULL,
  `activity_remark` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_date_requested_log`
--

CREATE TABLE `gosthi_date_requested_log` (
  `gosthi_requested_id` int(11) NOT NULL,
  `gosthi_id` int(11) DEFAULT NULL,
  `requested_date` date DEFAULT NULL,
  `from_time` varchar(255) DEFAULT NULL,
  `to_time` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `requested_date_remark` text DEFAULT NULL,
  `requested_date_approved` enum('Y','N') DEFAULT NULL,
  `valid_reason` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_evaluation_criteria`
--

CREATE TABLE `gosthi_evaluation_criteria` (
  `gosthi_evaluation_criteria_id` int(11) NOT NULL,
  `total_marks` double DEFAULT NULL,
  `without_intimation` double DEFAULT NULL,
  `without_validreason` double DEFAULT NULL,
  `late_submission` double DEFAULT NULL,
  `topic_skip` double DEFAULT NULL,
  `attandance_groupsize_1` int(11) DEFAULT NULL,
  `attandance_absent_1` double DEFAULT NULL,
  `attandance_groupsize_2` int(11) DEFAULT NULL,
  `attandance_absent_2` double DEFAULT NULL,
  `pravakta_member` int(11) DEFAULT NULL,
  `pravakta_mark` double DEFAULT NULL,
  `pravakta_repetition` int(11) DEFAULT NULL,
  `saint_occurance` int(11) DEFAULT NULL,
  `saint_mark` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_master`
--

CREATE TABLE `gosthi_master` (
  `gosthi_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `month` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `scheduled_date` date NOT NULL,
  `from_time` varchar(255) NOT NULL,
  `to_time` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `report_submitted` enum('N','Y','C') DEFAULT 'N',
  `requested_date` date DEFAULT NULL,
  `requested_date_approved` enum('Y','N') DEFAULT NULL,
  `requested_date_remark` text DEFAULT NULL,
  `total_marks` double DEFAULT NULL,
  `total_deduct_marks` double DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` enum('N','Y') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL,
  `without_intimation` double DEFAULT NULL,
  `without_validreason` double DEFAULT NULL,
  `late_submission` double DEFAULT NULL,
  `topic_skip` double DEFAULT NULL,
  `attandance_absent_1` double DEFAULT NULL,
  `attandance_absent_2` double DEFAULT NULL,
  `pravakta_mark` double DEFAULT NULL,
  `saint_mark` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `gosthi_master`
--

INSERT INTO `gosthi_master` (`gosthi_id`, `sevak_id`, `group_id`, `month`, `year`, `scheduled_date`, `from_time`, `to_time`, `location`, `report_submitted`, `requested_date`, `requested_date_approved`, `requested_date_remark`, `total_marks`, `total_deduct_marks`, `created_id`, `created_at`, `updated_id`, `updated_at`, `is_deleted`, `deleted_at`, `deleted_id`, `without_intimation`, `without_validreason`, `late_submission`, `topic_skip`, `attandance_absent_1`, `attandance_absent_2`, `pravakta_mark`, `saint_mark`) VALUES
(1, 2, 8, 'October', '2025', '2025-10-18', '19:48', '20:48', 'my home', 'N', NULL, NULL, NULL, NULL, NULL, 1, '2025-10-17 14:18:50', NULL, '2025-10-18 07:45:55', 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_other_group_member`
--

CREATE TABLE `gosthi_other_group_member` (
  `other_gosthi_group_detail_id` int(11) NOT NULL,
  `gosthi_report_submission_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_photos`
--

CREATE TABLE `gosthi_photos` (
  `gosthi_photos_id` int(11) NOT NULL,
  `gosthi_id` int(11) NOT NULL,
  `gosthi_report_submission_id` int(11) DEFAULT NULL,
  `gosthi_photo` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_pravachan_detail`
--

CREATE TABLE `gosthi_pravachan_detail` (
  `gosthi_pravachan_detail_id` int(11) NOT NULL,
  `gosthi_report_submission_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `gosthi_topic_type` varchar(255) DEFAULT NULL,
  `topic_name` text DEFAULT NULL,
  `pravachan_sevak_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_report_submission`
--

CREATE TABLE `gosthi_report_submission` (
  `gosthi_report_submission_id` int(11) NOT NULL,
  `gosthi_id` int(11) DEFAULT NULL,
  `gosthi_date` date DEFAULT NULL,
  `from_time` varchar(255) DEFAULT NULL,
  `to_time` varchar(255) DEFAULT NULL,
  `location` text DEFAULT NULL,
  `sant_presence` enum('Y','N') NOT NULL DEFAULT 'N',
  `sant_name` varchar(255) DEFAULT NULL,
  `sant_designation_id` int(11) DEFAULT NULL,
  `karyakar_presence` enum('Y','N') NOT NULL DEFAULT 'N',
  `karyakar_name` varchar(255) DEFAULT NULL,
  `karyakar_designation_id` int(11) DEFAULT NULL,
  `nirikshak_presence` enum('Y','N') NOT NULL DEFAULT 'N',
  `pravakta_sevak_id` int(11) DEFAULT NULL,
  `next_gosthi_date` date DEFAULT NULL,
  `next_from_time` varchar(255) DEFAULT NULL,
  `next_to_time` varchar(255) DEFAULT NULL,
  `next_location` text DEFAULT NULL,
  `gosthi_remark` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Stand-in structure for view `gosthi_report_submission_view`
-- (See below for the actual view)
--
CREATE TABLE `gosthi_report_submission_view` (
`group_id` int(11)
,`gosthi_id` int(11)
,`group_name` varchar(356)
,`month` varchar(511)
,`sevak_id` int(11)
,`year` varchar(255)
,`scheduled_date` varchar(10)
,`from_time` varchar(255)
,`to_time` varchar(255)
,`location` varchar(255)
,`sevak_name` text
,`gosthi_date` varchar(10)
,`total_marks` varchar(45)
,`report_submitted` varchar(117)
,`action` text
,`edit_action` varchar(497)
,`delete_action` varchar(466)
);

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_schedule`
--

CREATE TABLE `gosthi_schedule` (
  `gosthi_schedule_id` int(11) NOT NULL,
  `gosthi_month` varchar(50) DEFAULT NULL,
  `gosthi_year` int(11) DEFAULT NULL,
  `gosthi_date` date DEFAULT NULL,
  `report_submission_from_date` date DEFAULT NULL,
  `report_submission_to_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `gosthi_schedule`
--

INSERT INTO `gosthi_schedule` (`gosthi_schedule_id`, `gosthi_month`, `gosthi_year`, `gosthi_date`, `report_submission_from_date`, `report_submission_to_date`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(2, 'November', 2025, NULL, '2025-10-13', NULL, '2025-10-13 12:57:39', 1, NULL, NULL, 'Y', '2025-10-14 21:02:47', 1),
(3, 'June', 2025, NULL, '2025-06-25', NULL, '2025-10-13 13:10:12', 1, NULL, NULL, 'Y', '2025-10-14 21:03:21', 1),
(4, 'November', 2025, NULL, '2025-10-12', NULL, '2025-10-14 15:35:34', 1, '2025-10-15 06:06:34', 1, 'Y', '2025-10-15 11:40:57', 1),
(5, 'October', 2025, NULL, '2025-10-21', NULL, '2025-10-15 05:40:56', 1, '2025-10-15 06:09:58', 1, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_schedule_detail`
--

CREATE TABLE `gosthi_schedule_detail` (
  `gosthi_schedule_detail_id` int(11) NOT NULL,
  `gosthi_schedule_id` int(11) DEFAULT NULL,
  `gosthi_topic_type_id` int(11) DEFAULT NULL,
  `gosthi_topic_type_no` int(11) NOT NULL,
  `topic_name` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `gosthi_schedule_detail`
--

INSERT INTO `gosthi_schedule_detail` (`gosthi_schedule_detail_id`, `gosthi_schedule_id`, `gosthi_topic_type_id`, `gosthi_topic_type_no`, `topic_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(4, 2, 9, 1, 'video', '2025-10-13 12:57:39', 1, NULL, NULL, 'Y', '2025-10-14 21:02:47', 1),
(5, 2, 6, 1, 'jay aksharpati', '2025-10-13 12:57:39', 1, NULL, NULL, 'Y', '2025-10-14 21:02:47', 1),
(6, 2, 10, 1, 'lago chho pyara', '2025-10-13 12:57:39', 1, NULL, NULL, 'Y', '2025-10-14 21:02:47', 1),
(7, 3, 2, 1, '', '2025-10-13 13:10:12', 1, NULL, NULL, 'Y', '2025-10-14 21:03:21', 1),
(8, 3, 2, 2, '', '2025-10-13 13:10:12', 1, NULL, NULL, 'Y', '2025-10-14 21:03:21', 1),
(9, 3, 2, 3, '', '2025-10-13 13:10:12', 1, NULL, NULL, 'Y', '2025-10-14 21:03:21', 1),
(10, 4, 9, 1, 'aa', '2025-10-14 15:35:34', 1, NULL, NULL, 'Y', '2025-10-15 11:36:34', 1),
(11, 5, 9, 1, '', '2025-10-15 05:40:56', 1, NULL, NULL, 'Y', '2025-10-15 11:39:58', 1),
(12, 5, 6, 1, 'swaminarayan bhimpalas', '2025-10-15 05:40:56', 1, NULL, NULL, 'Y', '2025-10-15 11:39:58', 1),
(13, 5, 10, 1, 'lago chho pyara', '2025-10-15 05:40:56', 1, NULL, NULL, 'Y', '2025-10-15 11:39:58', 1),
(14, 5, 9, 1, '', '2025-10-15 06:09:13', 1, NULL, NULL, 'Y', '2025-10-15 11:39:58', 1),
(15, 5, 6, 1, 'swaminarayan bhimpalas', '2025-10-15 06:09:13', 1, NULL, NULL, 'Y', '2025-10-15 11:39:58', 1),
(16, 5, 10, 1, 'lago chho pyara', '2025-10-15 06:09:13', 1, NULL, NULL, 'Y', '2025-10-15 11:39:58', 1),
(17, 5, 9, 1, '', '2025-10-15 06:09:58', 1, NULL, NULL, 'N', NULL, NULL),
(18, 5, 6, 1, 'swaminarayan bhimpalas', '2025-10-15 06:09:58', 1, NULL, NULL, 'N', NULL, NULL),
(19, 5, 10, 1, 'lago chho pyara', '2025-10-15 06:09:58', 1, NULL, NULL, 'N', NULL, NULL),
(20, 5, 12, 1, 'jodhpur intro', '2025-10-15 06:09:58', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `gosthi_schedule_view`
-- (See below for the actual view)
--
CREATE TABLE `gosthi_schedule_view` (
`gosthi_schedule_id` int(11)
,`gosthi_month` varchar(50)
,`gosthi_year` int(11)
,`report_submission_from_date` varchar(10)
,`edit` text
,`delete` varchar(458)
);

-- --------------------------------------------------------

--
-- Table structure for table `gosthi_topic_type_master`
--

CREATE TABLE `gosthi_topic_type_master` (
  `gosthi_topic_type_id` int(11) NOT NULL,
  `gosthi_topic_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `gosthi_topic_type_master`
--

INSERT INTO `gosthi_topic_type_master` (`gosthi_topic_type_id`, `gosthi_topic_type`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Activitysasdasdas', '2025-09-24 08:23:00', 1, '2025-09-24 08:23:06', 1, 'Y', '2025-09-24 13:53:06', 1),
(2, 'Activity', '2025-09-24 08:23:13', 1, NULL, NULL, 'N', NULL, NULL),
(3, 'Antardrashthi', '2025-09-24 08:23:19', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'Dainik Vidhi	', '2025-09-24 08:23:25', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'Debate', '2025-09-24 08:23:30', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'Dhoon', '2025-09-24 08:23:35', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'Goshthi', '2025-09-24 08:23:40', 1, NULL, NULL, 'N', NULL, NULL),
(8, 'Jaherat', '2025-09-24 08:23:45', 1, NULL, NULL, 'N', NULL, NULL),
(9, 'Jainad + Stuti	', '2025-09-24 08:23:51', 1, NULL, NULL, 'N', NULL, NULL),
(10, 'Kirtan', '2025-09-24 08:23:56', 1, NULL, NULL, 'N', NULL, NULL),
(11, 'Lekhan Charcha	', '2025-09-24 08:24:02', 1, NULL, NULL, 'N', NULL, NULL),
(12, 'Video', '2025-10-15 06:09:38', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `gosthi_topic_type_view`
-- (See below for the actual view)
--
CREATE TABLE `gosthi_topic_type_view` (
`gosthi_topic_type_id` int(11)
,`gosthi_topic_type` varchar(255)
,`edit` varchar(493)
,`delete` varchar(462)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `gosthi_view`
-- (See below for the actual view)
--
CREATE TABLE `gosthi_view` (
`group_name` varchar(356)
,`sevak_name` text
,`month` varchar(511)
,`scheduled_date` varchar(10)
,`from_time` varchar(255)
,`to_time` varchar(255)
,`location` varchar(255)
,`report_status` varchar(117)
,`gosthi_id` int(11)
,`group_id` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `grade_master`
--

CREATE TABLE `grade_master` (
  `grade_id` int(11) NOT NULL,
  `grade_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `grade_master`
--

INSERT INTO `grade_master` (`grade_id`, `grade_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'A', '2025-09-22 07:18:37', 1, '2025-09-22 07:18:52', NULL, 'Y', '2025-09-22 12:48:52', 1),
(2, 'A', '2025-09-22 07:19:00', 1, NULL, NULL, 'N', NULL, NULL),
(3, 'A+', '2025-09-22 07:19:06', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'B', '2025-09-22 07:19:10', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'B+', '2025-09-22 07:19:13', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'C', '2025-09-22 07:19:16', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'C+', '2025-09-22 07:19:18', 1, NULL, NULL, 'N', NULL, NULL),
(8, 'C-', '2025-09-22 07:19:23', 1, '2025-09-22 07:20:08', 1, 'Y', '2025-09-22 12:50:08', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `grade_view`
-- (See below for the actual view)
--
CREATE TABLE `grade_view` (
`grade_id` int(11)
,`grade_name` varchar(255)
,`edit` varchar(480)
,`delete` varchar(449)
);

-- --------------------------------------------------------

--
-- Table structure for table `group_master`
--

CREATE TABLE `group_master` (
  `group_id` int(11) NOT NULL,
  `zone_code` varchar(20) DEFAULT NULL,
  `zone_no` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `mandir_id` int(11) DEFAULT 0,
  `kshetra_id` int(11) DEFAULT 0,
  `group_code` varchar(100) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `group_master`
--

INSERT INTO `group_master` (`group_id`, `zone_code`, `zone_no`, `zone_id`, `mandir_id`, `kshetra_id`, `group_code`, `group_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(6, 'E', 1, 6, 3, 2, 'E-01', 'surat 1', '2025-10-08 09:42:05', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'E', 2, 6, 3, 2, 'E-02', 'surat 2', '2025-10-08 09:42:14', 1, NULL, NULL, 'N', NULL, NULL),
(8, 'Z', 1, 12, 4, 0, 'Z-1', 'tanga 1', '2025-10-08 09:42:24', 1, '2025-10-08 09:42:40', 1, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `group_member_mapping`
--

CREATE TABLE `group_member_mapping` (
  `group_member_mapping_id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `is_sanchalak` enum('N','Y') DEFAULT 'N',
  `is_sah_sanchalak` enum('N','Y') DEFAULT 'N',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `group_member_mapping`
--

INSERT INTO `group_member_mapping` (`group_member_mapping_id`, `group_id`, `sevak_id`, `is_sanchalak`, `is_sah_sanchalak`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(24, 6, 4, 'N', 'N', '2025-10-15 17:35:25', 1, NULL, NULL, 'N', NULL, NULL),
(27, 6, 6, 'N', 'N', '2025-11-04 05:01:04', NULL, NULL, NULL, 'N', NULL, NULL),
(34, 8, 3, 'N', 'N', '2025-11-10 06:10:51', NULL, NULL, NULL, 'N', NULL, NULL),
(35, 7, 8, 'N', 'N', '2025-11-10 10:59:28', NULL, NULL, NULL, 'N', NULL, NULL),
(36, 8, 2, 'N', 'N', '2025-11-11 12:19:31', NULL, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `group_view`
-- (See below for the actual view)
--
CREATE TABLE `group_view` (
`group_id` int(11)
,`zone_name` varchar(255)
,`group_code` varchar(100)
,`group_name` varchar(255)
,`mandir_name` varchar(255)
,`kshetra_name` varchar(20)
,`edit` varchar(480)
,`delete` varchar(163)
,`createGosthi` varchar(200)
);

-- --------------------------------------------------------

--
-- Table structure for table `kshetra_master`
--

CREATE TABLE `kshetra_master` (
  `kshetra_id` int(11) NOT NULL,
  `kshetra_code` varchar(255) DEFAULT NULL,
  `kshetra_name` varchar(20) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `mandir_id` int(11) DEFAULT NULL,
  `sant_nirdeshak_id` int(11) DEFAULT NULL,
  `nirdeshak_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `kshetra_master`
--

INSERT INTO `kshetra_master` (`kshetra_id`, `kshetra_code`, `kshetra_name`, `zone_id`, `mandir_id`, `sant_nirdeshak_id`, `nirdeshak_id`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, '162', 'Bhandut', 6, 3, 3, 2, '2025-09-24 05:56:41', 1, '2025-09-24 06:18:55', NULL, 'Y', '2025-09-24 11:48:55', 1),
(2, '162', 'Bhandut', 6, 3, 4, 3, '2025-09-24 06:19:09', 1, '2025-09-24 06:22:03', 1, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `kshetra_view`
-- (See below for the actual view)
--
CREATE TABLE `kshetra_view` (
`kshetra_id` int(11)
,`kshetra_name` varchar(20)
,`kshetra_code` varchar(255)
,`zone_name` varchar(255)
,`mandir_name` varchar(255)
,`sant_nirdeshak_name` varchar(255)
,`nirdeshak_name` varchar(255)
,`edit` varchar(482)
,`delete` varchar(451)
);

-- --------------------------------------------------------

--
-- Table structure for table `mandir_master`
--

CREATE TABLE `mandir_master` (
  `mandir_id` int(11) NOT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `mandir_type` enum('Shikharbadh','Hari Mandir') DEFAULT NULL,
  `mandir_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `mandir_master`
--

INSERT INTO `mandir_master` (`mandir_id`, `zone_id`, `country_id`, `mandir_type`, `mandir_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 9, 4, 'Hari Mandir', 'BAPS Dar es salaam', '2025-09-22 14:39:52', 1, '2025-09-22 14:50:24', 1, 'Y', '2025-09-22 20:20:24', 1),
(2, 12, 4, 'Hari Mandir', 'BAPS SHRI SWAMINARAYAN MANDIR DAR-E-SALAAM', '2025-09-22 14:50:59', 1, '2025-09-29 11:57:01', 1, 'N', NULL, NULL),
(3, 6, 2, 'Shikharbadh', 'Surat', '2025-09-24 05:06:05', 1, NULL, NULL, 'N', NULL, NULL),
(4, 12, 4, 'Hari Mandir', 'BAPS Mandir Tanga', '2025-10-03 17:12:41', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `mandir_view`
-- (See below for the actual view)
--
CREATE TABLE `mandir_view` (
`mandir_id` int(11)
,`mandir_name` varchar(255)
,`mandir_type` enum('Shikharbadh','Hari Mandir')
,`country_name` varchar(255)
,`zone_name` varchar(255)
,`edit` varchar(481)
,`delete` varchar(450)
);

-- --------------------------------------------------------

--
-- Table structure for table `marital_status_master`
--

CREATE TABLE `marital_status_master` (
  `marital_status_id` int(11) NOT NULL,
  `marital_status_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `marital_status_master`
--

INSERT INTO `marital_status_master` (`marital_status_id`, `marital_status_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Single', '2025-09-27 03:55:56', 1, '2025-09-27 03:56:21', NULL, 'N', NULL, NULL),
(2, 'Married', '2025-09-27 03:56:02', 1, '2025-09-27 03:56:25', NULL, 'N', NULL, NULL),
(3, 'Engaged', '2025-09-27 03:56:09', 1, '2025-09-27 03:56:33', NULL, 'N', NULL, NULL),
(4, 'Divorced', '2025-09-27 03:56:14', 1, '2025-09-27 03:56:35', NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `marital_status_view`
-- (See below for the actual view)
--
CREATE TABLE `marital_status_view` (
`marital_status_id` int(11)
,`marital_status_name` varchar(255)
,`edit` varchar(488)
,`delete` varchar(457)
);

-- --------------------------------------------------------

--
-- Table structure for table `nirdeshak_master`
--

CREATE TABLE `nirdeshak_master` (
  `nirdeshak_id` int(11) NOT NULL,
  `nirdeshak_name` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `whatapp_no` varchar(20) DEFAULT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `nirdeshak_master`
--

INSERT INTO `nirdeshak_master` (`nirdeshak_id`, `nirdeshak_name`, `mobile_no`, `whatapp_no`, `email_id`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Ashokbhai Patel', '1', '', '', '2025-09-23 13:02:39', 1, '2025-09-23 13:06:57', 1, 'Y', '2025-09-23 18:36:57', 1),
(2, 'Ashokbhai Patel	', '9998999182', '9998999123', 'ashok@gmail.com', '2025-09-23 13:07:22', 1, NULL, NULL, 'N', NULL, NULL),
(3, 'Natvarbhai Patel', '', '', '', '2025-09-24 06:19:38', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `nirdeshak_view`
-- (See below for the actual view)
--
CREATE TABLE `nirdeshak_view` (
`nirdeshak_id` int(11)
,`nirdeshak_name` varchar(255)
,`mobile_no` varchar(20)
,`whatapp_no` varchar(20)
,`email_id` varchar(50)
,`edit` varchar(484)
,`delete` varchar(453)
);

-- --------------------------------------------------------

--
-- Table structure for table `nirikshak_group`
--

CREATE TABLE `nirikshak_group` (
  `nirikshak_group_id` int(11) NOT NULL,
  `nirikshak_id` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('N','Y') NOT NULL DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `nirikshak_group`
--

INSERT INTO `nirikshak_group` (`nirikshak_group_id`, `nirikshak_id`, `zone_id`, `group_id`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(2, 6, 6, 6, '2025-10-09 16:55:07', 1, '2025-10-10 07:13:19', 1, 'Y', '2025-10-10 12:51:25', 1),
(3, 7, 6, 6, '2025-10-10 07:21:49', 1, NULL, NULL, 'N', NULL, NULL),
(4, 8, 12, 8, '2025-10-10 07:21:59', 1, NULL, NULL, 'N', NULL, NULL),
(5, 9, 6, 7, '2025-10-10 07:22:10', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nirikshak_master`
--

CREATE TABLE `nirikshak_master` (
  `nirikshak_id` int(11) NOT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `talim_batch_id` int(20) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('N','Y') NOT NULL DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `nirikshak_master`
--

INSERT INTO `nirikshak_master` (`nirikshak_id`, `zone_id`, `talim_batch_id`, `sevak_id`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(6, 6, 2, 1, '2025-10-09 16:55:07', 1, '2025-10-10 07:13:19', 1, 'Y', '2025-10-10 12:51:25', 1),
(7, 6, 2, 1, '2025-10-10 07:21:49', 1, NULL, NULL, 'N', NULL, NULL),
(8, 12, 2, 1, '2025-10-10 07:21:59', 1, NULL, NULL, 'N', NULL, NULL),
(9, 6, 2, 1, '2025-10-10 07:22:10', 1, NULL, NULL, 'N', NULL, NULL);

--
-- Triggers `nirikshak_master`
--
DELIMITER $$
CREATE TRIGGER `sevak_role_delete` AFTER DELETE ON `nirikshak_master` FOR EACH ROW BEGIN
UPDATE
  sevak_master
SET
  role_id = 6
WHERE
  sevak_id = OLD.sevak_id;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `sevak_role_update` AFTER INSERT ON `nirikshak_master` FOR EACH ROW BEGIN
UPDATE
  sevak_master
SET
  role_id = 3
WHERE
  sevak_id = NEW.sevak_id;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `nirikshak_view`
-- (See below for the actual view)
--
CREATE TABLE `nirikshak_view` (
`nirikshak_id` int(11)
,`zone_name` varchar(255)
,`talim_batch` varchar(13)
,`nirikshak_name` text
,`group_name` mediumtext
,`edit` varchar(484)
,`delete` varchar(452)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `none_sevak_view`
-- (See below for the actual view)
--
CREATE TABLE `none_sevak_view` (
`sevak_id` int(11)
,`sevak_name` text
,`edit` varchar(484)
,`delete` varchar(460)
);

-- --------------------------------------------------------

--
-- Table structure for table `other_gosthi_group_detail`
--

CREATE TABLE `other_gosthi_group_detail` (
  `other_gosthi_group_detail_id` int(11) NOT NULL,
  `gosthi_report_submission_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `pincode_master`
--

CREATE TABLE `pincode_master` (
  `pin_id` int(11) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pincode_master`
--

INSERT INTO `pincode_master` (`pin_id`, `city_id`, `pincode`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 17, '395010', '2025-09-21 06:27:21', 1, '2025-09-21 06:40:58', 1, 'N', NULL, NULL),
(2, 17, '395007', '2025-09-21 06:35:16', 1, NULL, NULL, 'N', NULL, NULL),
(3, 12, 'a', '2025-09-21 06:41:11', 1, '2025-09-21 06:41:26', NULL, 'Y', '2025-09-21 12:11:26', 1),
(4, 14, 'a', '2025-09-21 06:41:15', 1, '2025-09-21 06:41:35', NULL, 'Y', '2025-09-21 12:11:35', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `pincode_view`
-- (See below for the actual view)
--
CREATE TABLE `pincode_view` (
`pin_id` int(11)
,`city_name` varchar(255)
,`pincode` varchar(255)
,`edit` varchar(482)
,`delete` varchar(451)
);

-- --------------------------------------------------------

--
-- Table structure for table `prasang_documents`
--

CREATE TABLE `prasang_documents` (
  `prasang_document_id` int(11) NOT NULL,
  `prasang_id` int(11) DEFAULT NULL,
  `document_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prasang_master`
--

CREATE TABLE `prasang_master` (
  `prasang_id` int(11) NOT NULL,
  `talim_batch_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `prasang_date` date DEFAULT NULL,
  `prasang_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `vishay` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `attachement` text DEFAULT NULL,
  `original_attachement` text DEFAULT NULL,
  `action_date` date DEFAULT NULL,
  `status` enum('New','Approved','Rejected') DEFAULT 'New',
  `grade_id` int(11) DEFAULT NULL,
  `remark` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Stand-in structure for view `prasang_view`
-- (See below for the actual view)
--
CREATE TABLE `prasang_view` (
`prasang_id` varchar(11)
,`prasang_date` varchar(10)
,`prasang_title` varchar(255)
,`sevak_id` varchar(11)
,`sevak_type` varchar(1)
,`ytk_id` varchar(50)
,`sevak_name` text
,`vishay` mediumtext
,`status` varchar(8)
,`attachement` varchar(129)
,`sevakEditBtn` varchar(391)
,`editBtn` varchar(391)
,`sevakDeleteBtn` varchar(451)
,`deleteBtn` varchar(451)
,`sevakPrintBtn` varchar(416)
,`printBtn` varchar(416)
,`sevakViewBtn` varchar(403)
,`viewBtn` varchar(403)
,`grade_name` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `profile_update_request`
--

CREATE TABLE `profile_update_request` (
  `request_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `sevak_info` longtext DEFAULT NULL,
  `education` longtext DEFAULT NULL,
  `family` longtext DEFAULT NULL,
  `employment` longtext DEFAULT NULL,
  `satsang` longtext DEFAULT NULL,
  `talent` longtext DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `updated_sevak` longtext DEFAULT NULL,
  `updated_education` longtext DEFAULT NULL,
  `updated_family` longtext DEFAULT NULL,
  `updated_employment` longtext DEFAULT NULL,
  `updated_satsang` longtext DEFAULT NULL,
  `updated_talent` longtext DEFAULT NULL,
  `updated_group` enum('Y','N') DEFAULT 'N',
  `is_approved` enum('Y','N','C') NOT NULL DEFAULT 'N',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `relationship_master`
--

CREATE TABLE `relationship_master` (
  `relationship_id` int(11) NOT NULL,
  `relationship_name` varchar(255) DEFAULT NULL,
  `sorting_order` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `relationship_master`
--

INSERT INTO `relationship_master` (`relationship_id`, `relationship_name`, `sorting_order`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Father', NULL, NULL, 1, '2025-09-19 03:36:34', 1, 'Y', '2025-09-19 09:06:34', 1),
(2, 'Mother', NULL, NULL, 1, NULL, NULL, 'N', NULL, NULL),
(3, 'Brother', NULL, NULL, 1, NULL, NULL, 'N', NULL, NULL),
(4, 'Sister', NULL, NULL, 1, NULL, NULL, 'N', NULL, NULL),
(5, 'Father', NULL, NULL, 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `relationship_view`
-- (See below for the actual view)
--
CREATE TABLE `relationship_view` (
`relationship_id` int(11)
,`relationship_name` varchar(255)
,`edit` varchar(487)
,`delete` varchar(456)
);

-- --------------------------------------------------------

--
-- Table structure for table `reset_password`
--

CREATE TABLE `reset_password` (
  `id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `is_expiry` enum('Y','N') DEFAULT 'N',
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `room_allocation`
--

CREATE TABLE `room_allocation` (
  `room_allcoation_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `is_leader` enum('true','false') DEFAULT 'false',
  `is_per_leader` enum('true','false') DEFAULT 'false',
  `is_per_room` enum('true','false') DEFAULT 'false',
  `bed_no` int(11) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=FIXED;

-- --------------------------------------------------------

--
-- Table structure for table `room_allocation_log`
--

CREATE TABLE `room_allocation_log` (
  `room_allcoation_log_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `is_leader` enum('true','false') DEFAULT 'false',
  `is_per_leader` enum('true','false') DEFAULT 'false',
  `is_per_room` enum('true','false') DEFAULT 'false',
  `bed_no` int(11) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `room_allocation_shuffle_log`
--

CREATE TABLE `room_allocation_shuffle_log` (
  `room_allocation_shuffle_log_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `is_leader` enum('true','false') DEFAULT 'false',
  `is_per_leader` enum('true','false') DEFAULT 'false',
  `is_per_room` enum('true','false') DEFAULT 'false',
  `bed_no` int(11) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room_allocation_temp`
--

CREATE TABLE `room_allocation_temp` (
  `room_allcoation_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `is_leader` enum('true','false') DEFAULT 'false',
  `is_per_leader` enum('true','false') DEFAULT 'false',
  `is_per_room` enum('true','false') DEFAULT 'false',
  `bed_no` int(11) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `room_master`
--

CREATE TABLE `room_master` (
  `room_id` int(11) NOT NULL,
  `room_no` varchar(255) DEFAULT NULL,
  `no_of_occupancy` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `room_master`
--

INSERT INTO `room_master` (`room_id`, `room_no`, `no_of_occupancy`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, '302', 6, '2025-09-22 07:47:00', 1, '2025-09-22 07:48:07', 1, 'Y', '2025-09-22 13:18:07', 1),
(2, '302', 6, '2025-09-22 07:48:21', 1, '2025-09-22 08:26:59', 1, 'N', NULL, NULL),
(3, '303', 6, '2025-09-22 07:48:29', 1, NULL, NULL, 'N', NULL, NULL),
(4, '304', 6, '2025-09-22 07:48:46', 1, NULL, NULL, 'N', NULL, NULL),
(5, '305', 6, '2025-09-22 07:48:53', 1, NULL, NULL, 'N', NULL, NULL),
(6, '306', 6, '2025-09-22 07:49:06', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `room_view`
-- (See below for the actual view)
--
CREATE TABLE `room_view` (
`room_id` int(11)
,`room_no` varchar(255)
,`no_of_occupancy` int(11)
,`edit` varchar(479)
,`delete` varchar(448)
);

-- --------------------------------------------------------

--
-- Table structure for table `sant_karyakar_designation_master`
--

CREATE TABLE `sant_karyakar_designation_master` (
  `sant_karyakar_designation_id` int(11) NOT NULL,
  `type` enum('S','K') DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sant_karyakar_designation_master`
--

INSERT INTO `sant_karyakar_designation_master` (`sant_karyakar_designation_id`, `type`, `designation`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'S', 'asdasd', '2025-09-24 07:58:04', 1, '2025-09-24 08:02:17', 1, 'Y', '2025-09-24 13:32:58', 1),
(2, 'S', 'Kothari', '2025-09-24 08:03:07', 1, NULL, NULL, 'N', NULL, NULL),
(3, 'S', 'Bhandari Sant	', '2025-09-24 08:03:16', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'S', 'Sant Nirdeshak	', '2025-09-24 08:03:22', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'S', 'Pujya Sant	', '2025-09-24 08:03:29', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'K', 'Bal Agresar	', '2025-09-24 08:03:36', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'K', 'Yuva Agresar	', '2025-09-24 08:03:43', 1, NULL, NULL, 'N', NULL, NULL),
(8, 'K', 'Satsang Agresar	', '2025-09-24 08:03:51', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `sant_karyakar_designation_view`
-- (See below for the actual view)
--
CREATE TABLE `sant_karyakar_designation_view` (
`sant_karyakar_designation_id` int(11)
,`type` varchar(8)
,`designation` varchar(255)
,`edit` varchar(498)
,`delete` varchar(467)
);

-- --------------------------------------------------------

--
-- Table structure for table `sant_nirdeshak_master`
--

CREATE TABLE `sant_nirdeshak_master` (
  `sant_nirdeshak_id` int(11) NOT NULL,
  `sant_nirdeshak_name` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `whatapp_no` varchar(20) DEFAULT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sant_nirdeshak_master`
--

INSERT INTO `sant_nirdeshak_master` (`sant_nirdeshak_id`, `sant_nirdeshak_name`, `mobile_no`, `whatapp_no`, `email_id`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Aatmachintan Swami', '', '', '', '2025-09-23 05:24:16', 1, '2025-09-23 05:26:52', NULL, 'Y', '2025-09-23 10:56:52', 1),
(2, 'Aatmachintan Swami', '11', '1', '1@gmail.com', '2025-09-23 05:27:02', 1, '2025-09-23 12:52:36', 1, 'Y', '2025-09-23 18:22:36', 1),
(3, 'Aatmachintan Swami', '8125789737', '', 'baps.secunderabad@gmail.com', '2025-09-23 12:53:07', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'Shreejinandan Swami', '', '', '', '2025-09-24 06:19:25', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `sant_nirdeshak_view`
-- (See below for the actual view)
--
CREATE TABLE `sant_nirdeshak_view` (
`sant_nirdeshak_id` int(11)
,`sant_nirdeshak_name` varchar(255)
,`mobile_no` varchar(20)
,`whatapp_no` varchar(20)
,`email_id` varchar(50)
,`edit` varchar(488)
,`delete` varchar(457)
);

-- --------------------------------------------------------

--
-- Table structure for table `satsang_activity_master`
--

CREATE TABLE `satsang_activity_master` (
  `satsang_activity_id` int(11) NOT NULL,
  `satsang_activity_name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `satsang_activity_master`
--

INSERT INTO `satsang_activity_master` (`satsang_activity_id`, `satsang_activity_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'asdasd', NULL, 1, '2025-09-24 07:04:02', 1, 'Y', '2025-09-24 12:34:02', 1),
(2, 'Bal Pravrutti', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(3, 'BAPS Mandir Seva	', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(4, 'Chhatralay Pravrutti	', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(5, 'Mahila Pravrutti	', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(6, 'Satsang Pravrutti	', NULL, 1, NULL, NULL, 'N', NULL, NULL),
(7, 'Yuva Pravrutti	', NULL, 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `satsang_activity_view`
-- (See below for the actual view)
--
CREATE TABLE `satsang_activity_view` (
`satsang_activity_id` int(11)
,`satsang_activity_name` varchar(255)
,`edit` varchar(490)
,`delete` varchar(459)
);

-- --------------------------------------------------------

--
-- Table structure for table `satsang_designation_master`
--

CREATE TABLE `satsang_designation_master` (
  `satsang_designation_id` int(11) NOT NULL,
  `satsang_designation_name` varchar(255) DEFAULT NULL,
  `satsang_activity_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `satsang_designation_master`
--

INSERT INTO `satsang_designation_master` (`satsang_designation_id`, `satsang_designation_name`, `satsang_activity_id`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Ayojak', 2, '2025-09-24 07:16:32', 1, '2025-09-24 07:27:45', NULL, 'Y', '2025-09-24 12:57:45', 1),
(2, '123123asdasd', 7, '2025-09-24 07:27:57', 1, '2025-09-24 07:28:14', 1, 'Y', '2025-09-24 12:58:14', 1),
(3, 'IT Nirikshak', 6, '2025-09-24 07:28:45', 1, '2025-09-24 07:29:17', 1, 'N', NULL, NULL),
(4, 'Sanchalak', 2, '2025-09-24 07:30:21', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'Shishu Karyakar	', 2, '2025-09-24 07:30:33', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'Sanchalak', 7, '2025-09-24 07:30:51', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'Pariksha Nirikshak	', 7, '2025-09-24 07:31:04', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `satsang_designation_view`
-- (See below for the actual view)
--
CREATE TABLE `satsang_designation_view` (
`satsang_designation_id` int(11)
,`satsang_activity_name` varchar(255)
,`satsang_designation_name` varchar(255)
,`edit` varchar(493)
,`delete` varchar(462)
);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `setting_id` int(11) NOT NULL,
  `protocol` varchar(50) DEFAULT NULL,
  `smtp_host` varchar(255) DEFAULT NULL,
  `smtp_user` varchar(255) DEFAULT NULL,
  `smtp_pass` varchar(255) DEFAULT NULL,
  `smtp_port` varchar(20) DEFAULT NULL,
  `from_email` text DEFAULT NULL,
  `from_name` varchar(255) DEFAULT NULL,
  `type` enum('Email','Mobile') DEFAULT NULL,
  `is_active` enum('Y','N') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_delete` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sevak_education`
--

CREATE TABLE `sevak_education` (
  `education_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `degree_id` int(11) DEFAULT NULL,
  `specialization_id` int(11) DEFAULT NULL,
  `edu_remark` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sevak_education`
--

INSERT INTO `sevak_education` (`education_id`, `sevak_id`, `degree_id`, `specialization_id`, `edu_remark`, `created_at`) VALUES
(1, 6, 3, 5, 'none', '2025-11-04 05:01:04'),
(2, 7, 2, 2, '', '2025-11-06 03:03:21'),
(4, 9, 3, 5, '', '2025-11-06 04:51:25'),
(5, 10, 3, 4, '', '2025-11-06 04:54:42'),
(6, 11, 2, 2, '', '2025-11-06 04:56:06'),
(8, 13, 3, 5, '', '2025-11-10 03:13:35'),
(15, 3, 2, 7, '', '2025-11-10 06:10:51'),
(16, 8, 2, 2, '', '2025-11-10 10:59:28'),
(17, 12, 3, 5, '', '2025-11-10 11:00:09'),
(18, 2, 2, 3, '', '2025-11-11 12:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `sevak_employment`
--

CREATE TABLE `sevak_employment` (
  `sevak_employment_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `employment_id` int(11) DEFAULT NULL,
  `emp_detail` varchar(255) DEFAULT NULL,
  `post_designation` varchar(255) DEFAULT NULL,
  `emp_remark` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sevak_employment`
--

INSERT INTO `sevak_employment` (`sevak_employment_id`, `sevak_id`, `employment_id`, `emp_detail`, `post_designation`, `emp_remark`, `created_at`) VALUES
(1, 6, 7, 'none', 'manager', 'none', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sevak_evaluation`
--

CREATE TABLE `sevak_evaluation` (
  `sevak_evaluation_id` int(11) NOT NULL,
  `talim_batch_id` int(11) DEFAULT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `satsang_grade_id` int(11) DEFAULT NULL,
  `satsang_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `seva_grade_id` int(11) DEFAULT NULL,
  `seva_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `human_relations_grade_id` int(11) DEFAULT NULL,
  `human_relations_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `skill_grade_id` int(11) DEFAULT NULL,
  `skill_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `abhyas_grade_id` int(11) DEFAULT NULL,
  `abhyas_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `family_ecostatus_grade_id` int(11) DEFAULT NULL,
  `family_ecostatus_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `family_satsang_grade_id` int(11) DEFAULT NULL,
  `family_satsang_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `overall_grade_id` int(11) DEFAULT NULL,
  `overall_notes` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `remarks` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sevak_evaluation`
--

INSERT INTO `sevak_evaluation` (`sevak_evaluation_id`, `talim_batch_id`, `sevak_id`, `satsang_grade_id`, `satsang_notes`, `seva_grade_id`, `seva_notes`, `human_relations_grade_id`, `human_relations_notes`, `skill_grade_id`, `skill_notes`, `abhyas_grade_id`, `abhyas_notes`, `family_ecostatus_grade_id`, `family_ecostatus_notes`, `family_satsang_grade_id`, `family_satsang_notes`, `overall_grade_id`, `overall_notes`, `remarks`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 1, 2, 3, 'Satsang Grade', 4, 'Seva', 4, 'Human Relations', 4, 'Skill', 4, 'Abhyas', 2, 'Family Economic', 5, 'Family satsang', 4, 'Overall Grade', 'final remarks', NULL, 1, '2025-10-29 17:25:35', 1, 'N', NULL, NULL),
(2, 2, 4, 3, 'very nice', 4, '', 3, '', 6, '', 4, '', 5, '', 5, '', 5, '', '', NULL, 1, '2025-10-29 17:25:46', 1, 'Y', '2025-10-30 08:04:34', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `sevak_evaluation_view`
-- (See below for the actual view)
--
CREATE TABLE `sevak_evaluation_view` (
`sevak_evaluation_id` int(11)
,`talimBatch` varchar(13)
,`sevak_name` text
,`city_name` varchar(255)
,`satsangGrade` varchar(255)
,`educationGrade` varchar(255)
,`satsang_action` text
,`sevaGrade` text
,`humanRelationsGrade` text
,`skillGrade` text
,`education_action` text
,`familyEcostatusGrade` text
,`familySatsangGrade` text
,`overall_grade` text
,`edit` varchar(399)
,`action_delete` varchar(459)
,`print` varchar(431)
);

-- --------------------------------------------------------

--
-- Table structure for table `sevak_family`
--

CREATE TABLE `sevak_family` (
  `sevak_family_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `relationship_id` int(11) DEFAULT NULL,
  `family_name` varchar(255) DEFAULT NULL,
  `family_mobile` varchar(255) DEFAULT NULL,
  `family_country_code` varchar(50) DEFAULT NULL,
  `family_email` varchar(255) DEFAULT NULL,
  `family_occupation` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sevak_family`
--

INSERT INTO `sevak_family` (`sevak_family_id`, `sevak_id`, `relationship_id`, `family_name`, `family_mobile`, `family_country_code`, `family_email`, `family_occupation`, `created_at`) VALUES
(1, 6, 2, 'kasumati', '12341323', '+91', 'kasumati@gmail.com', 'housewife', NULL),
(2, 6, 5, 'ajay', '446547657', '+91', 'asda@gmail.com', 'job', NULL),
(11, 8, 2, 'kasumati', '9878278283', '+91', 'kasumati@gmail.com', 'housewife', '2025-11-10 10:59:28'),
(12, 8, 5, 'ajay', '9878278284', '+91', 'ajay18@gmail.com', 'job', '2025-11-10 10:59:28'),
(13, 2, 5, 'Rajenkumar Pancholi', '782230010', '+255', 'demo@gmail.com', 'businessman', '2025-11-11 12:19:31'),
(14, 2, 2, 'Nisha Pancholi', '688230010', '+255', 'nrka@hotmail.com', 'housewife', '2025-11-11 12:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `sevak_master`
--

CREATE TABLE `sevak_master` (
  `sevak_id` int(11) NOT NULL,
  `sevak_id_old` int(11) DEFAULT NULL,
  `sevak_type` enum('S','N') DEFAULT 'S',
  `role_id` int(11) DEFAULT NULL,
  `is_active` enum('N','Y') DEFAULT 'Y',
  `password` varchar(255) DEFAULT NULL,
  `talim_batch_id` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `ytk_id` varchar(50) DEFAULT NULL,
  `sevak_no` varchar(50) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `caste_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `blood_group_id` int(11) DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `marital_status_id` int(11) DEFAULT NULL,
  `marital_date` date DEFAULT NULL,
  `sevak_photo` varchar(255) DEFAULT NULL,
  `latest_photo` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `taluka_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_area_id` int(11) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `address1` text DEFAULT NULL,
  `address2` text DEFAULT NULL,
  `is_perm_add` enum('Y','N') DEFAULT NULL,
  `per_country_id` int(11) DEFAULT NULL,
  `per_state_id` int(11) DEFAULT NULL,
  `per_district_id` int(11) DEFAULT NULL,
  `per_taluka_id` int(11) DEFAULT NULL,
  `per_city_id` int(11) DEFAULT NULL,
  `per_city_area_id` int(11) DEFAULT NULL,
  `per_pincode` varchar(255) DEFAULT NULL,
  `per_address1` text DEFAULT NULL,
  `per_address2` text DEFAULT NULL,
  `is_talim_add` enum('Y','N') DEFAULT NULL,
  `talim_country_id` int(11) DEFAULT NULL,
  `talim_state_id` int(11) DEFAULT NULL,
  `talim_district_id` int(11) DEFAULT NULL,
  `talim_taluka_id` int(11) DEFAULT NULL,
  `talim_city_id` int(11) DEFAULT NULL,
  `talim_city_area_id` int(11) DEFAULT NULL,
  `talim_pincode` varchar(255) DEFAULT NULL,
  `talim_address1` text DEFAULT NULL,
  `talim_address2` text DEFAULT NULL,
  `sat_ref_name` varchar(255) DEFAULT NULL,
  `sat_ref_city_id` int(11) DEFAULT NULL,
  `sat_ref_mobile_country_code` varchar(5) DEFAULT NULL,
  `sat_ref_mobile` varchar(255) DEFAULT NULL,
  `ins_by_name` varchar(255) DEFAULT NULL,
  `ins_by_city_id` int(11) DEFAULT NULL,
  `ins_by_country_code` varchar(5) DEFAULT NULL,
  `ins_by_mobile` varchar(255) DEFAULT NULL,
  `mobile1_country_code` varchar(5) DEFAULT NULL,
  `contact_mobile1` varchar(50) DEFAULT NULL,
  `mobile2_country_code` varchar(5) DEFAULT NULL,
  `contact_mobile2` varchar(50) DEFAULT NULL,
  `contact_phone_1` varchar(255) DEFAULT NULL,
  `contact_phone_2` varchar(255) DEFAULT NULL,
  `whatsapp_country_code` varchar(5) DEFAULT NULL,
  `contact_whatsapp_no` varchar(255) DEFAULT NULL,
  `sameprimaryno` varchar(255) DEFAULT NULL,
  `contact_res_phone1` varchar(255) DEFAULT NULL,
  `contact_res_phone2` varchar(255) DEFAULT NULL,
  `contact_per_mail` varchar(255) DEFAULT NULL,
  `contact_bus_mail` varchar(255) DEFAULT NULL,
  `kshetra_id` int(11) DEFAULT NULL,
  `sant_nirdeshak` varchar(255) DEFAULT NULL,
  `nirdeshak` varchar(255) DEFAULT NULL,
  `mandir` varchar(255) DEFAULT NULL,
  `mandir_type` varchar(255) DEFAULT NULL,
  `talim_kshetra_id` int(11) DEFAULT NULL,
  `talim_sant_nirdeshak` varchar(255) DEFAULT NULL,
  `talim_nirdeshak` varchar(255) DEFAULT NULL,
  `talim_mandir` varchar(255) DEFAULT NULL,
  `talim_mandir_type` varchar(255) DEFAULT NULL,
  `current_kshetra_id` int(11) DEFAULT NULL,
  `current_sant_nirdeshak` varchar(255) DEFAULT NULL,
  `current_nirdeshak` varchar(255) DEFAULT NULL,
  `current_mandir` varchar(255) DEFAULT NULL,
  `current_mandir_type` varchar(255) DEFAULT NULL,
  `satasangi_since` varchar(255) DEFAULT NULL,
  `satsang_remark` text DEFAULT NULL,
  `other_achievement` text DEFAULT NULL,
  `achievement_remarks` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `country_code` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL,
  `ytk_sevak_satsangi` varchar(5) DEFAULT NULL,
  `satsangi_batch_id` int(11) DEFAULT NULL,
  `satsangi_sevak_id` int(11) DEFAULT NULL,
  `ytk_sevak_inspired` varchar(5) DEFAULT NULL,
  `inpired_batch_id` int(11) DEFAULT NULL,
  `inspired_sevak_id` int(11) DEFAULT NULL,
  `otp` varchar(50) DEFAULT NULL,
  `otp_date_time` timestamp NULL DEFAULT NULL,
  `login_active` enum('Y','N') NOT NULL DEFAULT 'N',
  `gosthi_group_status` enum('Y','N') DEFAULT 'Y',
  `admitted_status` enum('Y','N') DEFAULT 'N',
  `admitted_date` date DEFAULT NULL,
  `admitted_remark` varchar(255) DEFAULT NULL,
  `certified_status` enum('Y','N') DEFAULT 'N',
  `certified_date` date DEFAULT NULL,
  `certified_remark` varchar(255) DEFAULT NULL,
  `not_complete_status` enum('Y','N') DEFAULT 'N',
  `not_complete_date` date DEFAULT NULL,
  `not_complete_remark` varchar(255) DEFAULT NULL,
  `temporary_status` enum('Y','N') DEFAULT 'N',
  `temporary_date` date DEFAULT NULL,
  `temporary_remark` varchar(255) DEFAULT NULL,
  `expired_status` enum('Y','N') DEFAULT 'N',
  `expired_date` date DEFAULT NULL,
  `expired_remark` varchar(255) DEFAULT NULL,
  `sant_in_baps_status` enum('Y','N') DEFAULT 'N',
  `sant_in_baps_date` date DEFAULT NULL,
  `sant_in_baps_remark` varchar(255) DEFAULT NULL,
  `name_of_parshad` varchar(255) DEFAULT NULL,
  `parshad_date` date DEFAULT NULL,
  `name_of_sant` varchar(255) DEFAULT NULL,
  `shikhar_mandir_id` int(11) DEFAULT NULL,
  `hari_mandir_id` int(11) DEFAULT NULL,
  `update_current_kshetra_date` datetime DEFAULT NULL,
  `update_talim_kshetra_date` datetime DEFAULT NULL,
  `update_kshetra_date` datetime DEFAULT NULL,
  `satsang_mandal_name` varchar(255) DEFAULT NULL,
  `hidden_satasangi_since` varchar(10) DEFAULT NULL,
  `goshthi_status_remark` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sevak_master`
--

INSERT INTO `sevak_master` (`sevak_id`, `sevak_id_old`, `sevak_type`, `role_id`, `is_active`, `password`, `talim_batch_id`, `batch_id`, `ytk_id`, `sevak_no`, `first_name`, `middle_name`, `last_name`, `birth_date`, `caste_id`, `category_id`, `blood_group_id`, `gender`, `marital_status_id`, `marital_date`, `sevak_photo`, `latest_photo`, `country_id`, `state_id`, `district_id`, `taluka_id`, `city_id`, `city_area_id`, `pincode`, `address1`, `address2`, `is_perm_add`, `per_country_id`, `per_state_id`, `per_district_id`, `per_taluka_id`, `per_city_id`, `per_city_area_id`, `per_pincode`, `per_address1`, `per_address2`, `is_talim_add`, `talim_country_id`, `talim_state_id`, `talim_district_id`, `talim_taluka_id`, `talim_city_id`, `talim_city_area_id`, `talim_pincode`, `talim_address1`, `talim_address2`, `sat_ref_name`, `sat_ref_city_id`, `sat_ref_mobile_country_code`, `sat_ref_mobile`, `ins_by_name`, `ins_by_city_id`, `ins_by_country_code`, `ins_by_mobile`, `mobile1_country_code`, `contact_mobile1`, `mobile2_country_code`, `contact_mobile2`, `contact_phone_1`, `contact_phone_2`, `whatsapp_country_code`, `contact_whatsapp_no`, `sameprimaryno`, `contact_res_phone1`, `contact_res_phone2`, `contact_per_mail`, `contact_bus_mail`, `kshetra_id`, `sant_nirdeshak`, `nirdeshak`, `mandir`, `mandir_type`, `talim_kshetra_id`, `talim_sant_nirdeshak`, `talim_nirdeshak`, `talim_mandir`, `talim_mandir_type`, `current_kshetra_id`, `current_sant_nirdeshak`, `current_nirdeshak`, `current_mandir`, `current_mandir_type`, `satasangi_since`, `satsang_remark`, `other_achievement`, `achievement_remarks`, `status`, `created_at`, `created_id`, `country_code`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`, `ytk_sevak_satsangi`, `satsangi_batch_id`, `satsangi_sevak_id`, `ytk_sevak_inspired`, `inpired_batch_id`, `inspired_sevak_id`, `otp`, `otp_date_time`, `login_active`, `gosthi_group_status`, `admitted_status`, `admitted_date`, `admitted_remark`, `certified_status`, `certified_date`, `certified_remark`, `not_complete_status`, `not_complete_date`, `not_complete_remark`, `temporary_status`, `temporary_date`, `temporary_remark`, `expired_status`, `expired_date`, `expired_remark`, `sant_in_baps_status`, `sant_in_baps_date`, `sant_in_baps_remark`, `name_of_parshad`, `parshad_date`, `name_of_sant`, `shikhar_mandir_id`, `hari_mandir_id`, `update_current_kshetra_date`, `update_talim_kshetra_date`, `update_kshetra_date`, `satsang_mandal_name`, `hidden_satasangi_since`, `goshthi_status_remark`) VALUES
(1, NULL, 'S', NULL, 'Y', NULL, 1, NULL, 'YTK2025F01', '1', 'John', 'aksd', 'Doe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, NULL, 'N', NULL, '', 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, NULL, 'S', NULL, 'Y', '1234', 1, NULL, 'YTK2025F02', '2', 'Mihir', 'Rajenkumar', 'Pancholi', '2002-10-27', NULL, NULL, NULL, 'M', 1, NULL, 'upload/sevak_photos/sevak_photo-1762863571868.jpg', NULL, 4, NULL, NULL, NULL, 12, NULL, NULL, '', NULL, 'Y', 4, NULL, NULL, NULL, 12, NULL, NULL, '', NULL, 'Y', 4, NULL, NULL, NULL, 12, NULL, NULL, '', NULL, '', NULL, '', '', '', NULL, '', '', '+255', '772230010', '', '', '+255772230010', '', '+255', '772230010', 'Y', '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', '2005', '', '', '', 'Certified', NULL, NULL, NULL, '2025-11-11 12:19:31', 1, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, 'N', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '2005', ''),
(3, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S01', '1', 'Vandan', 'Satyenkumar', 'Patel', NULL, NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, 10, NULL, NULL, '', NULL, 'Y', 5, NULL, NULL, NULL, 10, NULL, NULL, '', NULL, 'Y', 5, NULL, NULL, NULL, 10, NULL, NULL, '', NULL, '', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', '', 'N', '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', '', '', '', '', 'Certified', NULL, NULL, NULL, '2025-11-10 06:10:51', 1, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, 'N', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', ''),
(4, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S02', '2', 'Mayur', 'Manish', 'PAtel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, NULL, 'N', NULL, '', 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S018', '18', 'Deep', 'mukesh', 'Thakkar', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, NULL, 'N', NULL, '', 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, NULL, 'S', NULL, 'Y', NULL, 1, NULL, NULL, NULL, 'Karan', 'Ajay', 'Patel', '2000-10-31', 13, 2, 5, 'M', 3, '2025-11-01', NULL, NULL, 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, 'Y', 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, 'Y', 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, '', NULL, '', '', '', NULL, NULL, '', '+91', '768678685', '+91', '768678678', '4325656', '7567567', '+91', '768678685', 'Y', '657567567', '345345345', 'asdas@gmail.com', 'askudbasd@gmail.com', 2, '4', '3', '3', 'Shikharbadh', 2, '4', '3', '3', 'Shikharbadh', 2, '4', '3', '3', 'Shikharbadh', '2005', 'none', 'none', 'none', 'Certified', '2025-11-04 10:31:04', 1, NULL, NULL, NULL, 'Y', '2025-11-06 08:16:44', 1, 'Y', 1, 2, 'Y', 1, 2, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', 'none'),
(7, NULL, 'S', NULL, 'Y', NULL, 2, NULL, NULL, NULL, 'Karan', 'Ajay', 'Patel', '1999-11-07', 13, 3, 4, 'M', 3, '2025-11-01', NULL, NULL, 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, 'Y', 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, 'Y', 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, '', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', '', 'N', '', '', '', '', 2, '4', '3', '3', 'Shikharbadh', 2, '4', '3', '3', 'Shikharbadh', 2, '4', '3', '3', 'Shikharbadh', '1999', '', '', '', 'Certified', '2025-11-06 08:33:21', 1, NULL, NULL, NULL, 'Y', '2025-11-06 08:36:05', 1, 'Y', 1, 2, 'Y', 1, 2, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', ''),
(8, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S003', '3', 'Karan', 'Ajay', 'Patel', '2000-10-31', 13, 2, 4, 'M', 3, '2024-10-31', NULL, NULL, 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, 'Y', 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, 'Y', 2, 3, 9, NULL, 17, 3, '1', 'palanpur', NULL, '', NULL, '', '', '', NULL, '', '', '+91', '98798767282', '', '', '', '', '+91', '98798767282', 'Y', '', '', '', '', 2, '4', '3', '3', 'Shikharbadh', 2, '4', '3', '3', 'Shikharbadh', 2, '4', '3', '3', 'Shikharbadh', '2000', '', '', '', 'Certified', '2025-11-06 10:00:41', 1, NULL, '2025-11-10 10:59:28', 1, 'N', NULL, NULL, 'Y', 1, 2, 'Y', 1, 2, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '2000', ''),
(9, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S004', '4', 'Akshar', '', 'Patel', NULL, NULL, NULL, NULL, 'M', NULL, NULL, 'uploads/sevak_photos/sevak_photo-1762404685055.jpg', 'uploads/sevak_photos/latest_photo-1762404685056.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', '', 'N', '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', '2025-11-06 10:21:25', 1, NULL, NULL, NULL, 'Y', '2025-11-06 10:21:54', 1, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', ''),
(10, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S004', '4', 'Akshar', '', 'Patel', NULL, NULL, NULL, NULL, 'M', NULL, NULL, 'uploads/sevak_photos/sevak_photo-1762404882651.jpg', 'uploads/sevak_photos/latest_photo-1762404882653.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', '', 'N', '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', 'Certified', '2025-11-06 10:24:42', 1, NULL, NULL, NULL, 'Y', '2025-11-06 10:25:36', 1, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', ''),
(11, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S004', '4', 'Akshar', '', 'Patel', NULL, NULL, NULL, NULL, 'M', NULL, NULL, 'upload/sevak_photos/sevak_photo-1762404966461.jpg', 'upload/sevak_photos/latest_photo-1762404966462.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', '', 'N', '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', 'Certified', '2025-11-06 10:26:06', 1, NULL, NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', ''),
(12, NULL, 'S', NULL, 'Y', NULL, 1, NULL, 'YTK2025F005', '5', 'Vijay', 'Kanubhai', 'Patel', '1989-10-16', 13, 4, 4, 'M', NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, 14, NULL, NULL, 'n', NULL, 'Y', 4, NULL, NULL, NULL, 14, NULL, NULL, 'n', NULL, 'Y', 4, NULL, NULL, NULL, 14, NULL, NULL, 'n', NULL, '', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', '', 'N', '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', '1989', '', '', '', 'Certified,Sant in_baps', '2025-11-09 13:46:33', 1, NULL, '2025-11-10 11:00:09', 1, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'Y', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'Y', '2025-11-14', NULL, 'vijay bhagat', '2020-11-01', 'sadhu narayanmurtidas', NULL, 2, NULL, NULL, NULL, '', '1989', ''),
(13, NULL, 'S', NULL, 'Y', NULL, 2, NULL, 'YTK2025S005', '5', 'Darshan', 'Mahendrabhai', 'Chotalia', '2003-11-01', NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', '', 'N', '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', NULL, '', '', '', '', '2003', '', '', '', '', '2025-11-10 08:43:35', 1, NULL, NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, 'Y', 'Y', 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, '', 'N', NULL, '', 'N', NULL, '', 'N', NULL, NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '', '', ''),
(17, NULL, 'N', 8, 'Y', '1233', NULL, NULL, NULL, NULL, 'Khjbasd', 'Asdb', 'Akjsdb', '2025-11-07', NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', NULL, '', '', 'asdsa@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-10 19:32:18', 1, NULL, NULL, NULL, 'Y', '2025-11-10 20:11:23', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', 'Y', 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, NULL, 'N', 1, 'Y', '1233', NULL, NULL, NULL, NULL, 'Khjbasd', 'Asdb', 'Akjsdb', '2025-11-07', NULL, NULL, NULL, 'M', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', NULL, '', '', 'asdsa@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-10 19:32:28', 1, NULL, NULL, NULL, 'Y', '2025-11-10 20:11:27', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', 'Y', 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `sevak_registered_view`
-- (See below for the actual view)
--
CREATE TABLE `sevak_registered_view` (
`sevak_id` int(11)
,`ytk_id` varchar(50)
,`statusRegister` varchar(9)
,`sevak_name` text
,`city_name` varchar(255)
,`role` mediumtext
,`status` varchar(52)
);

-- --------------------------------------------------------

--
-- Table structure for table `sevak_role`
--

CREATE TABLE `sevak_role` (
  `sevak_role_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sevak_role`
--

INSERT INTO `sevak_role` (`sevak_role_id`, `sevak_id`, `role_id`, `created_id`, `created_at`) VALUES
(13, 6, 2, NULL, '2025-11-04 05:01:04'),
(14, 7, 2, NULL, '2025-11-06 03:03:21'),
(16, 9, 2, NULL, '2025-11-06 04:51:25'),
(17, 10, 2, NULL, '2025-11-06 04:54:42'),
(18, 11, 2, NULL, '2025-11-06 04:56:06'),
(20, 13, 2, NULL, '2025-11-10 03:13:35'),
(21, 14, 1, NULL, '2025-11-10 12:47:45'),
(22, 15, 1, NULL, '2025-11-10 13:03:12'),
(25, 16, 1, NULL, '2025-11-10 14:00:15');

-- --------------------------------------------------------

--
-- Table structure for table `sevak_satsang`
--

CREATE TABLE `sevak_satsang` (
  `sevak_satsang_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `satsang_activity_id` int(11) DEFAULT NULL,
  `satsang_designation_id` int(11) DEFAULT NULL,
  `seva_details` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sevak_satsang`
--

INSERT INTO `sevak_satsang` (`sevak_satsang_id`, `sevak_id`, `satsang_activity_id`, `satsang_designation_id`, `seva_details`, `created_at`) VALUES
(1, 6, 2, 4, 'none', NULL),
(8, 2, 2, 4, 'since 2023', '2025-11-11 12:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `sevak_talent`
--

CREATE TABLE `sevak_talent` (
  `sevak_talent_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `talent_id` int(11) DEFAULT NULL,
  `grade_id` int(11) DEFAULT NULL,
  `talent_detail` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `sevak_talent`
--

INSERT INTO `sevak_talent` (`sevak_talent_id`, `sevak_id`, `talent_id`, `grade_id`, `talent_detail`, `created_at`) VALUES
(1, 6, 4, 3, 'none', NULL),
(2, 6, 5, 4, '', NULL),
(11, 8, 7, 4, '', '2025-11-10 10:59:28'),
(12, 8, 6, 4, '', '2025-11-10 10:59:28'),
(13, 2, 4, 5, '', '2025-11-11 12:19:31');

-- --------------------------------------------------------

--
-- Stand-in structure for view `sevak_view`
-- (See below for the actual view)
--
CREATE TABLE `sevak_view` (
`sevak_id` int(11)
,`ytk_id` varchar(50)
,`sevak_name` text
,`city_name` varchar(255)
,`kshetra_name` varchar(20)
,`kshetra_code` varchar(255)
,`mandir` varchar(255)
,`area_name` varchar(255)
,`taluka_name` varchar(255)
,`district_name` varchar(255)
,`state_name` varchar(255)
,`country_name` varchar(255)
,`sant_nirdeshak` varchar(255)
,`contact_mobile1` varchar(50)
,`statusRegister` varchar(9)
,`contact_mobile2` varchar(50)
,`contact_phone_1` varchar(255)
,`contact_phone_2` varchar(255)
,`contact_res_phone1` varchar(255)
,`contact_res_phone2` varchar(255)
,`contact_whatsapp_no` varchar(255)
,`birth_date` varchar(10)
,`caste_name` varchar(255)
,`marriage_date` varchar(10)
,`contact_per_mail` varchar(255)
,`contact_bus_mail` varchar(255)
,`zone_name` varchar(255)
,`group_id` int(11)
,`employment_name` mediumtext
,`employment_detail` mediumtext
,`post_designation` mediumtext
,`group_name` varchar(358)
,`satsang_activity_name` mediumtext
,`satsang_designation_name` mediumtext
,`sevak_education` mediumtext
,`all_contact_no` text
,`specialization` mediumtext
,`grade_action` text
,`address` mediumtext
,`batch` varchar(18)
,`edit` varchar(492)
,`delete` varchar(468)
,`edit_profile` varchar(381)
);

-- --------------------------------------------------------

--
-- Table structure for table `specialization_master`
--

CREATE TABLE `specialization_master` (
  `specialization_id` int(11) NOT NULL,
  `degree_id` int(11) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `specialization_master`
--

INSERT INTO `specialization_master` (`specialization_id`, `degree_id`, `specialization`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 2, 'Accounting & Finance1', NULL, 1, '2025-09-22 06:36:52', 1, 'Y', '2025-09-22 12:06:52', 1),
(2, 2, 'Marketing', '2025-09-22 06:35:50', 1, NULL, NULL, 'N', NULL, NULL),
(3, 2, 'Computer Applications', '2025-09-22 06:36:03', 1, NULL, NULL, 'N', NULL, NULL),
(4, 3, 'Taxation', '2025-09-22 06:36:16', 1, NULL, NULL, 'N', NULL, NULL),
(5, 3, 'Marketing', '2025-09-22 06:36:24', 1, NULL, NULL, 'N', NULL, NULL),
(6, 3, 'Accounting & Finance', '2025-09-22 06:36:38', 1, NULL, NULL, 'N', NULL, NULL),
(7, 2, 'Accounting & Finance	', '2025-09-22 06:36:58', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `specialization_view`
-- (See below for the actual view)
--
CREATE TABLE `specialization_view` (
`specialization_id` int(11)
,`specialization` varchar(255)
,`degree` varchar(255)
,`edit` varchar(489)
,`delete` varchar(458)
);

-- --------------------------------------------------------

--
-- Table structure for table `state_master`
--

CREATE TABLE `state_master` (
  `state_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `state_master`
--

INSERT INTO `state_master` (`state_id`, `country_id`, `state_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(2, 2, 'Gujarat', NULL, 1, '2025-09-19 04:33:59', 1, 'Y', '2025-09-19 10:03:59', 1),
(3, 2, 'Gujarat', '2025-09-19 04:34:11', 1, NULL, NULL, 'N', NULL, NULL),
(4, 2, 'Maharashtra', '2025-09-19 04:34:19', 1, '2025-09-19 04:35:29', 1, 'N', NULL, NULL),
(5, 2, 'Rajasthan', '2025-09-19 04:34:32', 1, NULL, NULL, 'N', NULL, NULL),
(6, 4, 'Dar Es Salaam	', '2025-09-19 06:51:22', 1, '2025-09-20 10:13:34', 1, 'Y', '2025-09-20 15:43:34', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `state_view`
-- (See below for the actual view)
--
CREATE TABLE `state_view` (
`state_id` int(11)
,`state_name` varchar(255)
,`country_name` varchar(255)
,`edit` varchar(480)
,`delete` varchar(449)
);

-- --------------------------------------------------------

--
-- Table structure for table `talent_master`
--

CREATE TABLE `talent_master` (
  `talent_id` int(11) NOT NULL,
  `talent_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `talent_master`
--

INSERT INTO `talent_master` (`talent_id`, `talent_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'Accounts2', NULL, 1, '2025-09-22 07:31:18', 1, 'Y', '2025-09-22 13:01:18', 1),
(2, 'Accounts', '2025-09-22 07:31:32', 1, NULL, NULL, 'N', NULL, NULL),
(3, 'Casio', '2025-09-22 07:31:45', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'Harmonium', '2025-09-22 07:31:56', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'Photography', '2025-09-22 07:32:03', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'Graphic Designing', '2025-09-22 07:32:15', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'Photoshop', '2025-09-22 07:32:19', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `talent_view`
-- (See below for the actual view)
--
CREATE TABLE `talent_view` (
`talent_id` int(11)
,`talent_name` varchar(255)
,`edit` varchar(481)
,`delete` varchar(450)
);

-- --------------------------------------------------------

--
-- Table structure for table `talim_batch_master`
--

CREATE TABLE `talim_batch_master` (
  `talim_batch_id` int(11) NOT NULL,
  `talim_year` int(4) DEFAULT NULL,
  `talim_batch` enum('F','S') DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_active` enum('Y','N') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `talim_batch_master`
--

INSERT INTO `talim_batch_master` (`talim_batch_id`, `talim_year`, `talim_batch`, `start_date`, `end_date`, `is_active`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 2025, 'F', '2024-12-14', '2026-05-30', 'N', '2025-09-22 10:40:33', 1, '2025-09-26 12:31:54', NULL, 'N', NULL, NULL),
(2, 2025, 'S', '2025-06-14', '2025-11-30', 'Y', '2025-09-22 10:26:41', 1, '2025-09-26 12:31:52', 1, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `talim_batch_view`
-- (See below for the actual view)
--
CREATE TABLE `talim_batch_view` (
`talim_batch_id` int(11)
,`talim_year` int(4)
,`talim_batch` varchar(6)
,`is_active` varchar(117)
,`edit` varchar(485)
,`delete` varchar(454)
);

-- --------------------------------------------------------

--
-- Table structure for table `taluka_master`
--

CREATE TABLE `taluka_master` (
  `taluka_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `taluka_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `taluka_master`
--

INSERT INTO `taluka_master` (`taluka_id`, `country_id`, `state_id`, `district_id`, `taluka_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(2, 2, 3, 3, 'Ahmedabad', '2025-09-19 10:31:33', 1, '2025-09-19 10:44:56', 1, 'Y', '2025-09-19 16:14:56', 1),
(3, 2, 3, 3, 'Ahmedabad', '2025-09-19 10:45:13', 1, NULL, NULL, 'N', NULL, NULL),
(4, 2, 4, 4, 'Mumbai', '2025-09-19 10:45:40', 1, NULL, NULL, 'N', NULL, NULL),
(5, 2, 3, 3, 'Kadi', '2025-09-20 06:30:14', 1, '2025-09-20 06:31:39', 1, 'N', NULL, NULL),
(6, 4, 6, 7, 'Dar Es Salaam', '2025-09-20 06:30:54', 1, '2025-09-20 06:31:14', 1, 'Y', '2025-09-20 12:01:14', 1),
(7, 2, 3, 9, 'Bardoli', '2025-09-21 05:05:23', 1, NULL, NULL, 'N', NULL, NULL),
(8, 2, 3, 9, 'Surat', '2025-09-21 05:05:44', 1, NULL, NULL, 'N', NULL, NULL),
(9, 2, 3, 9, 'Kamrej', '2025-09-21 05:06:39', 1, NULL, NULL, 'N', NULL, NULL),
(10, 2, 3, 9, 'Choryasi', '2025-09-21 05:06:53', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `taluka_view`
-- (See below for the actual view)
--
CREATE TABLE `taluka_view` (
`taluka_id` int(11)
,`taluka_name` varchar(255)
,`district_name` varchar(255)
,`state_name` varchar(255)
,`country_name` varchar(255)
,`edit` varchar(481)
,`delete` varchar(450)
);

-- --------------------------------------------------------

--
-- Table structure for table `user_master`
--

CREATE TABLE `user_master` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_id` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `is_delete` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `user_rights`
--

CREATE TABLE `user_rights` (
  `user_rights_id` int(11) NOT NULL,
  `sevak_id` int(11) DEFAULT NULL,
  `talim_batch_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `form_name` varchar(255) DEFAULT NULL,
  `accessible` varchar(50) DEFAULT NULL,
  `allow_insert` varchar(10) DEFAULT NULL,
  `allow_edit` varchar(10) DEFAULT NULL,
  `allow_delete` varchar(10) DEFAULT NULL,
  `allow_print` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `allow_full_rights` varchar(10) DEFAULT NULL,
  `allow_allrecords` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `role_id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `is_default` enum('Y','N') DEFAULT 'N',
  `created_id` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`role_id`, `role`, `is_default`, `created_id`, `created_at`, `updated_id`, `updated_at`, `deleted_id`, `is_deleted`, `deleted_at`) VALUES
(1, 'Admin', 'N', NULL, NULL, NULL, '2025-09-02 05:32:12', NULL, 'N', NULL),
(2, 'Sevak', 'Y', NULL, NULL, NULL, '2025-09-29 03:51:56', NULL, 'N', NULL),
(3, 'Sanchalak', 'N', NULL, NULL, NULL, '2025-10-15 17:23:46', NULL, 'N', NULL),
(4, 'Sah Sanchalak', 'N', NULL, NULL, NULL, '2025-10-15 17:23:46', NULL, 'N', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `user_role_view`
-- (See below for the actual view)
--
CREATE TABLE `user_role_view` (
`role_id` int(11)
,`role` varchar(255)
,`is_default` enum('Y','N')
,`edit` varchar(482)
,`delete` varchar(450)
);

-- --------------------------------------------------------

--
-- Table structure for table `zone_master`
--

CREATE TABLE `zone_master` (
  `zone_id` int(11) NOT NULL,
  `zone_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_id` int(11) DEFAULT NULL,
  `is_deleted` enum('Y','N') DEFAULT 'N',
  `deleted_at` datetime DEFAULT NULL,
  `deleted_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `zone_master`
--

INSERT INTO `zone_master` (`zone_id`, `zone_name`, `created_at`, `created_id`, `updated_at`, `updated_id`, `is_deleted`, `deleted_at`, `deleted_id`) VALUES
(1, 'A - Saurastra - Kutchha', '2025-09-22 13:23:41', 1, '2025-09-22 13:24:06', 1, 'Y', '2025-09-22 18:54:06', 1),
(2, 'A - Saurastra - Kutchh	', '2025-09-22 13:24:15', 1, NULL, NULL, 'N', NULL, NULL),
(3, 'B - Uttar Gujarat	', '2025-09-22 13:24:20', 1, NULL, NULL, 'N', NULL, NULL),
(4, 'C - Charotar	', '2025-09-22 13:25:12', 1, NULL, NULL, 'N', NULL, NULL),
(5, 'D - Madhya Gujarat	', '2025-09-22 13:25:19', 1, NULL, NULL, 'N', NULL, NULL),
(6, 'E - Dakshin Gujarat	', '2025-09-22 13:25:25', 1, NULL, NULL, 'N', NULL, NULL),
(7, 'F - Maharastra	', '2025-09-22 13:25:35', 1, NULL, NULL, 'N', NULL, NULL),
(8, 'G - Parprant	', '2025-09-22 13:25:43', 1, NULL, NULL, 'N', NULL, NULL),
(9, 'W - Foreign Countries - Not US, UK, Africa	', '2025-09-22 13:25:51', 1, NULL, NULL, 'N', NULL, NULL),
(10, 'X - USA, Canada	', '2025-09-22 13:25:59', 1, NULL, NULL, 'N', NULL, NULL),
(11, 'Y - UK	', '2025-09-22 13:26:05', 1, NULL, NULL, 'N', NULL, NULL),
(12, 'Z - Africa', '2025-09-29 11:56:48', 1, NULL, NULL, 'N', NULL, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `zone_view`
-- (See below for the actual view)
--
CREATE TABLE `zone_view` (
`zone_id` int(11)
,`zone_name` varchar(255)
,`edit` varchar(479)
,`delete` varchar(448)
);

-- --------------------------------------------------------

--
-- Structure for view `batch_code_view`
--
DROP TABLE IF EXISTS `batch_code_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `batch_code_view`  AS SELECT `batch_code_master`.`batch_id` AS `batch_id`, `batch_code_master`.`batch_code` AS `batch_code`, concat('<a href="',(select `config`.`base_url` from `config`),'BatchCode/edit?id=',`batch_code_master`.`batch_id`,'" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning">','<i class="fa fa-pencil"></i>','</a>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'BatchCode/delete?id=',`batch_code_master`.`batch_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `batch_code_master` WHERE `batch_code_master`.`is_deleted` = 'N' ORDER BY `batch_code_master`.`batch_code` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `blood_group_view`
--
DROP TABLE IF EXISTS `blood_group_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `blood_group_view`  AS SELECT `blood_group_master`.`blood_group_id` AS `blood_group_id`, `blood_group_master`.`blood_group_name` AS `blood_group_name`, concat('<form action="',(select `config`.`base_url` from `config`),'BloodGroup/edit" method="post"><input type="hidden" value="',`blood_group_master`.`blood_group_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'BloodGroup/delete?id=',`blood_group_master`.`blood_group_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `blood_group_master` WHERE `blood_group_master`.`is_deleted` = 'N' ORDER BY `blood_group_master`.`blood_group_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `caste_view`
--
DROP TABLE IF EXISTS `caste_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `caste_view`  AS SELECT `caste_master`.`caste_id` AS `caste_id`, `caste_master`.`caste_name` AS `caste_name`, concat('<form action="',(select `config`.`base_url` from `config`),'CasteMaster/edit" method="post"><input type="hidden" value="',`caste_master`.`caste_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'CasteMaster/delete?id=',`caste_master`.`caste_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `caste_master` WHERE `caste_master`.`is_deleted` = 'N' ORDER BY `caste_master`.`caste_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `category_view`
--
DROP TABLE IF EXISTS `category_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `category_view`  AS SELECT `category_master`.`category_id` AS `category_id`, `category_master`.`category_name` AS `category_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Category/edit" method="post"><input type="hidden" value="',`category_master`.`category_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Category/delete?id=',`category_master`.`category_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `category_master` WHERE `category_master`.`is_deleted` = 'N' ORDER BY `category_master`.`category_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `city_area_view`
--
DROP TABLE IF EXISTS `city_area_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `city_area_view`  AS SELECT `city_area`.`city_area_id` AS `city_area_id`, `city_area`.`area_name` AS `area_name`, `city_master`.`city_name` AS `city_name`, concat('<form action="',(select `config`.`base_url` from `config`),'CityArea/edit" method="post"><input type="hidden" value="',`city_area`.`city_area_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'CityArea/delete?id=',`city_area`.`city_area_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (`city_area` join `city_master` on(`city_master`.`city_id` = `city_area`.`city_id`)) WHERE `city_area`.`is_deleted` = 'N' ORDER BY `city_area`.`area_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `city_view`
--
DROP TABLE IF EXISTS `city_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `city_view`  AS SELECT `city_master`.`city_id` AS `city_id`, `city_master`.`city_name` AS `city_name`, `district_master`.`district_name` AS `district_name`, `state_master`.`state_name` AS `state_name`, `country_master`.`country_name` AS `country_name`, `taluka_master`.`taluka_name` AS `taluka_name`, concat('<form action="',(select `config`.`base_url` from `config`),'City/edit" method="post"><input type="hidden" value="',`city_master`.`city_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'City/delete?id=',`city_master`.`city_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM ((((`city_master` left join `country_master` on(`country_master`.`country_id` = `city_master`.`country_id`)) left join `state_master` on(`state_master`.`state_id` = `city_master`.`state_id`)) left join `district_master` on(`district_master`.`district_id` = `city_master`.`district_id`)) left join `taluka_master` on(`taluka_master`.`taluka_id` = `city_master`.`taluka_id`)) WHERE `city_master`.`is_deleted` = 'N' ORDER BY `city_master`.`city_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `country_view`
--
DROP TABLE IF EXISTS `country_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `country_view`  AS SELECT `country_master`.`country_id` AS `country_id`, `country_master`.`country_name` AS `country_name`, `country_master`.`dialing_code` AS `dialing_code`, concat('<form action="',(select `config`.`base_url` from `config`),'Country/edit" method="post"><input type="hidden" value="',`country_master`.`country_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Country/delete?id=',`country_master`.`country_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `country_master` WHERE `country_master`.`is_deleted` = 'N' ORDER BY `country_master`.`country_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `degree_view`
--
DROP TABLE IF EXISTS `degree_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `degree_view`  AS SELECT `degree_master`.`degree_id` AS `degree_id`, `degree_master`.`degree` AS `degree`, concat('<form action="',(select `config`.`base_url` from `config`),'Degree/edit" method="post"><input type="hidden" value="',`degree_master`.`degree_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Degree/delete?id=',`degree_master`.`degree_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `degree_master` WHERE `degree_master`.`is_deleted` = 'N' ORDER BY `degree_master`.`degree` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `district_view`
--
DROP TABLE IF EXISTS `district_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `district_view`  AS SELECT `district_master`.`district_id` AS `district_id`, `district_master`.`district_name` AS `district_name`, `state_master`.`state_name` AS `state_name`, `country_master`.`country_name` AS `country_name`, concat('<form action="',(select `config`.`base_url` from `config`),'District/edit" method="post"><input type="hidden" value="',`district_master`.`district_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'District/delete?id=',`district_master`.`district_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM ((`district_master` join `country_master` on(`country_master`.`country_id` = `district_master`.`country_id`)) join `state_master` on(`state_master`.`state_id` = `district_master`.`state_id`)) WHERE `district_master`.`is_deleted` = 'N' ORDER BY `district_master`.`district_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `employment_view`
--
DROP TABLE IF EXISTS `employment_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `employment_view`  AS SELECT `employment_master`.`employment_id` AS `employment_id`, `employment_master`.`employment_name` AS `employment_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Employment/edit" method="post"><input type="hidden" value="',`employment_master`.`employment_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Employment/delete?id=',`employment_master`.`employment_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `employment_master` WHERE `employment_master`.`is_deleted` = 'N' ORDER BY `employment_master`.`employment_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `exam_mark_entry_view`
--
DROP TABLE IF EXISTS `exam_mark_entry_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `exam_mark_entry_view`  AS SELECT `exam_mark_entry_master`.`mark_entry_id` AS `mark_entry_id`, `exam_type_master`.`exam_type` AS `exam_type`, `exam_master`.`exam_name` AS `exam_name`, (select `exam_schedule_master`.`total_marks` from `exam_schedule_master` where `exam_schedule_master`.`examtype_id` = `exam_mark_entry_master`.`examtype_id` and `exam_schedule_master`.`exam_id` = `exam_mark_entry_master`.`exam_id` and `exam_schedule_master`.`talim_batch_id` = `exam_mark_entry_master`.`talim_batch_id` limit 1) AS `total_marks`, (select date_format(`exam_schedule_master`.`exam_date`,'%d-%m-%Y') from `exam_schedule_master` where `exam_schedule_master`.`examtype_id` = `exam_mark_entry_master`.`examtype_id` and `exam_schedule_master`.`exam_id` = `exam_mark_entry_master`.`exam_id` and `exam_schedule_master`.`talim_batch_id` = `exam_mark_entry_master`.`talim_batch_id` limit 1) AS `exam_date`, count(if(`exam_mark_entry_master`.`attandance` = 'P',1,NULL)) AS `present_count`, count(if(`exam_mark_entry_master`.`attandance` = 'A',1,NULL)) AS `absent_count`, concat('<a href="',(select `config`.`base_url` from `config`),'ExamMarkEntry/edit?exam_id=',`exam_mark_entry_master`.`exam_id`,'&examtype_id=',`exam_mark_entry_master`.`examtype_id`,'" data-toggle="tooltip" title="View" class="btn btn-sm btn-secondary">','<i class="fa fa-eye"></i>','</a>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'ExamMarkEntry/delete?exam_id=',`exam_mark_entry_master`.`exam_id`,'&examtype_id=',`exam_mark_entry_master`.`examtype_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (((`exam_mark_entry_master` join `exam_master` on(`exam_master`.`exam_id` = `exam_mark_entry_master`.`exam_id`)) join `exam_type_master` on(`exam_type_master`.`examtype_id` = `exam_mark_entry_master`.`examtype_id`)) join `sevak_master` on(`sevak_master`.`sevak_id` = `exam_mark_entry_master`.`sevak_id`)) WHERE `exam_mark_entry_master`.`is_deleted` = 'N' AND (`sevak_master`.`certified_status` = 'Y' OR `sevak_master`.`temporary_status` = 'Y') AND `sevak_master`.`expired_status` <> 'Y' AND `sevak_master`.`sant_in_baps_status` <> 'Y' AND `exam_mark_entry_master`.`talim_batch_id` in (select `talim_batch_master`.`talim_batch_id` from `talim_batch_master` where `talim_batch_master`.`is_active` = 'Y' AND `talim_batch_master`.`is_deleted` = 'N') GROUP BY `exam_mark_entry_master`.`examtype_id`, `exam_mark_entry_master`.`exam_id` ;

-- --------------------------------------------------------

--
-- Structure for view `exam_schedule_view`
--
DROP TABLE IF EXISTS `exam_schedule_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `exam_schedule_view`  AS SELECT `exam_schedule_master`.`exam_schedule_id` AS `exam_schedule_id`, `exam_type_master`.`exam_type` AS `exam_type`, `exam_master`.`exam_name` AS `exam_name`, date_format(`exam_schedule_master`.`exam_date`,'%d/%m/%Y') AS `exam_date`, `exam_schedule_master`.`total_marks` AS `total_marks`, `exam_schedule_master`.`upload_exam_paper` AS `upload_exam_paper`, date_format(`exam_schedule_master`.`mark_entry_start_date`,'%d/%m/%Y') AS `mark_entry_start_date`, date_format(`exam_schedule_master`.`mark_entry_end_date`,'%d/%m/%Y') AS `mark_entry_end_date`, concat('<a href="',(select `config`.`base_url` from `config`),'upload/exam_paper/',`exam_schedule_master`.`upload_exam_paper`,'" data-toggle="tooltip" title="Download" class="btn btn-sm btn-primary">','<i class="fa fa-download"></i>','</a>') AS `exam_paper`, concat('<form action="',(select `config`.`base_url` from `config`),'ExamSchedule/edit" method="post"><input type="hidden" value="',`exam_schedule_master`.`exam_schedule_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'ExamSchedule/delete?id=',`exam_schedule_master`.`exam_schedule_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM ((`exam_schedule_master` join `exam_type_master` on(`exam_type_master`.`examtype_id` = `exam_schedule_master`.`examtype_id`)) join `exam_master` on(`exam_master`.`exam_id` = `exam_schedule_master`.`exam_id`)) WHERE `exam_schedule_master`.`is_deleted` = 'N' AND `exam_schedule_master`.`talim_batch_id` in (select `talim_batch_master`.`talim_batch_id` from `talim_batch_master` where `talim_batch_master`.`is_active` = 'Y' AND `talim_batch_master`.`is_deleted` = 'N') ORDER BY `exam_schedule_master`.`exam_date` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `exam_type_view`
--
DROP TABLE IF EXISTS `exam_type_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `exam_type_view`  AS SELECT `exam_type_master`.`examtype_id` AS `examtype_id`, `exam_type_master`.`exam_type` AS `exam_type`, concat('<form action="',(select `config`.`base_url` from `config`),'ExamType/edit" method="post"><input type="hidden" value="',`exam_type_master`.`examtype_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'ExamType/delete?id=',`exam_type_master`.`examtype_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `exam_type_master` WHERE `exam_type_master`.`is_deleted` = 'N' ORDER BY `exam_type_master`.`exam_type` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `exam_view`
--
DROP TABLE IF EXISTS `exam_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `exam_view`  AS SELECT `exam_master`.`exam_id` AS `exam_id`, `exam_type_master`.`exam_type` AS `exam_type`, `exam_master`.`exam_name` AS `exam_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Exam/edit" method="post"><input type="hidden" value="',`exam_master`.`exam_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Exam/delete?id=',`exam_master`.`exam_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (`exam_master` join `exam_type_master` on(`exam_type_master`.`examtype_id` = `exam_master`.`examtype_id`)) WHERE `exam_master`.`is_deleted` = 'N' ORDER BY `exam_master`.`exam_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `followup_sahayak_view`
--
DROP TABLE IF EXISTS `followup_sahayak_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `followup_sahayak_view`  AS SELECT `followup_sahayak`.`followup_sahayak_id` AS `followup_sahayak_id`, concat(`talim_batch_master`.`talim_year`,'-',`talim_batch_master`.`talim_batch`) AS `talim_batch`, concat(ifnull(concat(`sevak_master`.`ytk_id`,' - '),''),`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`) AS `sahayak_name`, concat(if(`sevak_master`.`contact_mobile1` <> '',`sevak_master`.`contact_mobile1`,''),if(`sevak_master`.`contact_mobile2` <> '',concat(', ',`sevak_master`.`contact_mobile2`),''),if(`sevak_master`.`contact_phone_1` <> '',concat(', ',`sevak_master`.`contact_phone_1`),''),if(`sevak_master`.`contact_phone_2` <> '',concat(', ',`sevak_master`.`contact_phone_2`),''),if(`sevak_master`.`contact_res_phone1` <> '',concat(', ',`sevak_master`.`contact_res_phone1`),''),if(`sevak_master`.`contact_res_phone2` <> '',concat(', ',`sevak_master`.`contact_res_phone2`),''),if(`sevak_master`.`contact_whatsapp_no` <> '',concat(', ',`sevak_master`.`contact_whatsapp_no`),'')) AS `ContactNo`, concat('<form action="',(select `config`.`base_url` from `config`),'FollowUpSahayak/edit" method="post"><input type="hidden" value="',`followup_sahayak`.`followup_sahayak_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'FollowUpSahayak/delete?id=',`followup_sahayak`.`followup_sahayak_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM ((`followup_sahayak` join `talim_batch_master` on(`talim_batch_master`.`talim_batch_id` = `followup_sahayak`.`talim_batch_id`)) join `sevak_master` on(`sevak_master`.`sevak_id` = `followup_sahayak`.`sevak_id`)) GROUP BY `followup_sahayak`.`followup_sahayak_id` ORDER BY concat(`talim_batch_master`.`talim_year`,'-',`talim_batch_master`.`talim_batch`) ASC, concat(ifnull(concat(`sevak_master`.`ytk_id`,' - '),''),`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`) ASC ;

-- --------------------------------------------------------

--
-- Structure for view `followup_setting_view`
--
DROP TABLE IF EXISTS `followup_setting_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `followup_setting_view`  AS SELECT `followup_setting`.`followup_setting_id` AS `followup_setting_id`, `followup_setting`.`month` AS `month`, `followup_setting`.`followup_mode` AS `followup_mode`, `followup_setting`.`member_count` AS `member_count`, if(`followup_setting`.`attachement` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'upload/followup_setting_doc/',`followup_setting`.`attachement`,'" data-toggle="tooltip" title="Download" target="_blank" target="_blink" class="btn btn-sm btn-primary">','<i class="fa fa-download"></i>','</a>')) AS `attachement`, concat(ifnull(concat(`sevak_master`.`ytk_id`,' - '),''),`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`,ifnull(concat('(',`city_master`.`city_name`,')'),'')) AS `sahayak_name`, concat(`group_master`.`group_code`,' - ',`group_master`.`group_name`) AS `group_name`, if(`gosthi_master`.`requested_date_approved` = 'Y',date_format(`gosthi_master`.`requested_date`,'%d/%m/%Y'),date_format(`gosthi_master`.`scheduled_date`,'%d/%m/%Y')) AS `next_gosthidate`, if(`gosthi_master`.`report_submitted` = 'Y','',concat('<form action="',(select `config`.`base_url` from `config`),'FollowUpSetting/edit" method="post"><input type="hidden" value="',`followup_setting`.`followup_setting_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>')) AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'FollowUpSetting/delete?id=',`followup_setting`.`followup_setting_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM ((((`followup_setting` join `sevak_master` on(`sevak_master`.`sevak_id` = `followup_setting`.`sevak_id`)) join `group_master` on(`group_master`.`group_id` = `followup_setting`.`group_id`)) left join `city_master` on(`city_master`.`city_id` = `sevak_master`.`city_id`)) join `gosthi_master` on(`gosthi_master`.`gosthi_id` = `followup_setting`.`gosthi_id` and concat(`gosthi_master`.`month`,' ',`gosthi_master`.`year`) = `followup_setting`.`month`)) WHERE `followup_setting`.`is_deleted` = 'N' ORDER BY if(`gosthi_master`.`requested_date` is not null and `gosthi_master`.`requested_date_approved` = 'Y',`gosthi_master`.`requested_date`,`gosthi_master`.`scheduled_date`) DESC ;

-- --------------------------------------------------------

--
-- Structure for view `gosthi_report_submission_view`
--
DROP TABLE IF EXISTS `gosthi_report_submission_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `gosthi_report_submission_view`  AS SELECT `gosthi_master`.`group_id` AS `group_id`, `gosthi_master`.`gosthi_id` AS `gosthi_id`, concat(`group_master`.`group_code`,'-',`group_master`.`group_name`) AS `group_name`, concat(`gosthi_master`.`month`,'-',`gosthi_master`.`year`) AS `month`, `gosthi_master`.`sevak_id` AS `sevak_id`, `gosthi_master`.`year` AS `year`, if(`gosthi_master`.`requested_date` is not null and `gosthi_master`.`requested_date_approved` = 'Y',date_format(`gosthi_master`.`requested_date`,'%d-%m-%Y'),date_format(`gosthi_master`.`scheduled_date`,'%d-%m-%Y')) AS `scheduled_date`, `gosthi_master`.`from_time` AS `from_time`, `gosthi_master`.`to_time` AS `to_time`, `gosthi_master`.`location` AS `location`, concat(ifnull(concat(`sevak_master`.`ytk_id`,' - '),''),`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`) AS `sevak_name`, date_format(`gosthi_report_submission`.`gosthi_date`,'%d-%m-%Y') AS `gosthi_date`, concat(`gosthi_master`.`total_deduct_marks`,'/',`gosthi_master`.`total_marks`) AS `total_marks`, if(`gosthi_master`.`report_submitted` = 'Y',concat('<span class="badge badge-pill badge-default badge-primary badge-default"><i class="fa fa-check"></i> Submitted</span>'),if(`gosthi_master`.`report_submitted` = 'C',concat('<span class="badge badge-pill badge-default badge-danger badge-default"><i class="fa fa-close"></i> Cancelled</span>'),concat('<span class="badge badge-pill badge-default badge-warning badge-default"><i class="fa fa-close"></i> Pending</span>'))) AS `report_submitted`, if(`gosthi_master`.`report_submitted` = 'Y' or `gosthi_master`.`report_submitted` = 'C',concat('<a href="',(select `config`.`base_url` from `config`),'GosthiReportSubmission/printGosthiReportSubmission?id=',`gosthi_master`.`gosthi_id`,'" data-toggle="tooltip" title="Print" target="_blank" class="btn btn-sm btn-success">','<i class="fa fa-print"></i>',' Print</a>',' ',if((select ifnull(count(`gosthi_photos`.`gosthi_photos_id`),0) from `gosthi_photos` where `gosthi_photos`.`gosthi_id` = `gosthi_master`.`gosthi_id`) > 0,concat('<a href="',(select `config`.`base_url` from `config`),'GosthiReportSubmission/gosthiPhotosDetail?id=',`gosthi_master`.`gosthi_id`,'" style="padding-left: 4px;padding-right: 4px" data-toggle="tooltip" data-toggle="modal" data-target="#gosthiPhotoModal" title="Goshthi Photos" class="btn btn-sm btn-success">','<i class="fa fa-picture-o"></i>','</a>'),'')),if(`gosthi_master`.`requested_date` is not null and `gosthi_master`.`requested_date_approved` = 'Y',if(`gosthi_master`.`requested_date` <= curdate(),concat('<a href="',(select `config`.`base_url` from `config`),'GosthiReportSubmission/addGosthiReportSubmission?id=',`gosthi_master`.`gosthi_id`,'" data-toggle="tooltip" title="Add Gosthi Report Submission" class="btn btn-sm btn-secondary">','<i class="fa fa-calendar-plus-o"></i>',' Fill Report</a>'),''),if(`gosthi_master`.`scheduled_date` <= curdate(),concat('<a href="',(select `config`.`base_url` from `config`),'GosthiReportSubmission/addGosthiReportSubmission?id=',`gosthi_master`.`gosthi_id`,'" data-toggle="tooltip" title="Add Gosthi Report Submission" class="btn btn-sm btn-secondary">','<i class="fa fa-calendar-plus-o"></i>',' Fill Report</a>'),''))) AS `action`, if(`gosthi_master`.`report_submitted` = 'Y',concat('<form action="',(select `config`.`base_url` from `config`),'GosthiReportSubmission/edit" method="post"><input type="hidden" value="',`gosthi_report_submission`.`gosthi_report_submission_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>'),'') AS `edit_action`, if(`gosthi_master`.`report_submitted` = 'Y',concat('<a href="',(select `config`.`base_url` from `config`),'GosthiReportSubmission/delete?id=',`gosthi_report_submission`.`gosthi_report_submission_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>'),'') AS `delete_action` FROM (((`gosthi_master` join `group_master` on(`group_master`.`group_id` = `gosthi_master`.`group_id`)) left join `gosthi_report_submission` on(`gosthi_report_submission`.`gosthi_id` = `gosthi_master`.`gosthi_id`)) join `sevak_master` on(`sevak_master`.`sevak_id` = `gosthi_master`.`sevak_id`)) WHERE `gosthi_master`.`is_deleted` = 'N' ORDER BY `gosthi_master`.`gosthi_id` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `gosthi_schedule_view`
--
DROP TABLE IF EXISTS `gosthi_schedule_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `gosthi_schedule_view`  AS SELECT `gosthi_schedule`.`gosthi_schedule_id` AS `gosthi_schedule_id`, `gosthi_schedule`.`gosthi_month` AS `gosthi_month`, `gosthi_schedule`.`gosthi_year` AS `gosthi_year`, date_format(`gosthi_schedule`.`report_submission_from_date`,'%d-%m-%Y') AS `report_submission_from_date`, if((select count(`gosthi_master`.`gosthi_id`) from `gosthi_master` where `gosthi_master`.`month` = `gosthi_schedule`.`gosthi_month` and `gosthi_master`.`year` = `gosthi_schedule`.`gosthi_year` and `gosthi_master`.`report_submitted` = 'Y') < 0,'',concat('<form action="',(select `config`.`base_url` from `config`),'GosthiSchedule/edit" method="post">\r\n             <input type="hidden" value="',`gosthi_schedule`.`gosthi_schedule_id`,'" name="id">\r\n                          <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning">\r\n                           <i class="fa fa-pencil"></i> </button></form>')) AS `edit`, if((select count(`gosthi_master`.`gosthi_id`) from `gosthi_master` where `gosthi_master`.`month` = `gosthi_schedule`.`gosthi_month` and `gosthi_master`.`year` = `gosthi_schedule`.`gosthi_year` and `gosthi_master`.`report_submitted` = 'Y') < 0,'',concat('<a href="',(select `config`.`base_url` from `config`),'GosthiSchedule/delete?id=',`gosthi_schedule`.`gosthi_schedule_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>')) AS `delete` FROM `gosthi_schedule` WHERE `gosthi_schedule`.`is_deleted` = 'N' ORDER BY date_format(`gosthi_schedule`.`report_submission_from_date`,'%Y') DESC, date_format(`gosthi_schedule`.`report_submission_from_date`,'%m') DESC ;

-- --------------------------------------------------------

--
-- Structure for view `gosthi_topic_type_view`
--
DROP TABLE IF EXISTS `gosthi_topic_type_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `gosthi_topic_type_view`  AS SELECT `gosthi_topic_type_master`.`gosthi_topic_type_id` AS `gosthi_topic_type_id`, `gosthi_topic_type_master`.`gosthi_topic_type` AS `gosthi_topic_type`, concat('<form action="',(select `config`.`base_url` from `config`),'AddGosthiTopicType/edit" method="post"><input type="hidden" value="',`gosthi_topic_type_master`.`gosthi_topic_type_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'AddGosthiTopicType/delete?id=',`gosthi_topic_type_master`.`gosthi_topic_type_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `gosthi_topic_type_master` ORDER BY `gosthi_topic_type_master`.`gosthi_topic_type` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `gosthi_view`
--
DROP TABLE IF EXISTS `gosthi_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `gosthi_view`  AS SELECT concat(`gm`.`group_code`,'-',`gm`.`group_name`) AS `group_name`, concat(ifnull(concat(`sm`.`ytk_id`,' - '),''),`sm`.`first_name`,' ',`sm`.`middle_name`,' ',`sm`.`last_name`) AS `sevak_name`, concat(`gosthi_master`.`month`,'-',`gosthi_master`.`year`) AS `month`, date_format(`gosthi_master`.`scheduled_date`,'%d-%m-%Y') AS `scheduled_date`, `gosthi_master`.`from_time` AS `from_time`, `gosthi_master`.`to_time` AS `to_time`, `gosthi_master`.`location` AS `location`, if(`gosthi_master`.`report_submitted` = 'Y',concat('<span class="badge badge-pill badge-default badge-primary badge-default"><i class="fa fa-check"></i> Submitted</span>'),if(`gosthi_master`.`report_submitted` = 'C',concat('<span class="badge badge-pill badge-default badge-danger badge-default"><i class="fa fa-close"></i> Cancelled</span>'),concat('<span class="badge badge-pill badge-default badge-warning badge-default"><i class="fa fa-close"></i> Pending</span>'))) AS `report_status`, `gosthi_master`.`gosthi_id` AS `gosthi_id`, `gm`.`group_id` AS `group_id` FROM ((`gosthi_master` join `group_master` `gm` on(`gosthi_master`.`group_id` = `gm`.`group_id`)) join `sevak_master` `sm` on(`gosthi_master`.`sevak_id` = `sm`.`sevak_id`)) ORDER BY `gosthi_master`.`gosthi_id` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `grade_view`
--
DROP TABLE IF EXISTS `grade_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `grade_view`  AS SELECT `grade_master`.`grade_id` AS `grade_id`, `grade_master`.`grade_name` AS `grade_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Grade/edit" method="post"><input type="hidden" value="',`grade_master`.`grade_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Grade/delete?id=',`grade_master`.`grade_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `grade_master` WHERE `grade_master`.`is_deleted` = 'N' ORDER BY `grade_master`.`grade_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `group_view`
--
DROP TABLE IF EXISTS `group_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `group_view`  AS SELECT `group_master`.`group_id` AS `group_id`, `zone_master`.`zone_name` AS `zone_name`, `group_master`.`group_code` AS `group_code`, `group_master`.`group_name` AS `group_name`, `mandir_master`.`mandir_name` AS `mandir_name`, `kshetra_master`.`kshetra_name` AS `kshetra_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Group/edit" method="post"><input type="hidden" value="',`group_master`.`group_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="javascript:void(0);" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="deleteGroup(',`group_master`.`group_id`,')">','<i class="fa fa-trash"></i>','</a>') AS `delete`, if((select ifnull(count(`group_member_mapping`.`group_member_mapping_id`),0) from `group_member_mapping` where `group_member_mapping`.`group_id` = `group_master`.`group_id` and `group_member_mapping`.`is_sanchalak` = 'Y') > 0 and (select ifnull(count(`gosthi_master`.`gosthi_id`),0) from `gosthi_master` where `gosthi_master`.`group_id` = `group_master`.`group_id` and `gosthi_master`.`is_deleted` = 'N') = 0,concat(' <button type="button" class="create-gosthi btn btn-primary btn-sm" data-id="',`group_master`.`group_id`,'" data-toggle="modal" data-target="#myModal"> <i class="fa fa-plus-circle"></i> Create Initial Goshthi </button>'),'') AS `createGosthi` FROM (((`group_master` join `zone_master` on(`zone_master`.`zone_id` = `group_master`.`zone_id`)) left join `mandir_master` on(`mandir_master`.`mandir_id` = `group_master`.`mandir_id`)) left join `kshetra_master` on(`kshetra_master`.`kshetra_id` = `group_master`.`kshetra_id`)) WHERE `group_master`.`is_deleted` = 'N' ORDER BY `zone_master`.`zone_name` ASC, `group_master`.`group_code` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `kshetra_view`
--
DROP TABLE IF EXISTS `kshetra_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `kshetra_view`  AS SELECT `kshetra_master`.`kshetra_id` AS `kshetra_id`, `kshetra_master`.`kshetra_name` AS `kshetra_name`, `kshetra_master`.`kshetra_code` AS `kshetra_code`, `zone_master`.`zone_name` AS `zone_name`, `mandir_master`.`mandir_name` AS `mandir_name`, `sant_nirdeshak_master`.`sant_nirdeshak_name` AS `sant_nirdeshak_name`, `nirdeshak_master`.`nirdeshak_name` AS `nirdeshak_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Kshetra/edit" method="post"><input type="hidden" value="',`kshetra_master`.`kshetra_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Kshetra/delete?id=',`kshetra_master`.`kshetra_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM ((((`kshetra_master` join `zone_master` on(`zone_master`.`zone_id` = `kshetra_master`.`zone_id`)) join `mandir_master` on(`mandir_master`.`mandir_id` = `kshetra_master`.`mandir_id`)) left join `sant_nirdeshak_master` on(`sant_nirdeshak_master`.`sant_nirdeshak_id` = `kshetra_master`.`sant_nirdeshak_id`)) left join `nirdeshak_master` on(`nirdeshak_master`.`nirdeshak_id` = `kshetra_master`.`nirdeshak_id`)) WHERE `kshetra_master`.`is_deleted` = 'N' ORDER BY `kshetra_master`.`kshetra_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `mandir_view`
--
DROP TABLE IF EXISTS `mandir_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `mandir_view`  AS SELECT `mandir_master`.`mandir_id` AS `mandir_id`, `mandir_master`.`mandir_name` AS `mandir_name`, `mandir_master`.`mandir_type` AS `mandir_type`, `country_master`.`country_name` AS `country_name`, `zone_master`.`zone_name` AS `zone_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Mandir/edit" method="post"><input type="hidden" value="',`mandir_master`.`mandir_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Mandir/delete?id=',`mandir_master`.`mandir_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM ((`mandir_master` left join `country_master` on(`country_master`.`country_id` = `mandir_master`.`country_id`)) join `zone_master` on(`zone_master`.`zone_id` = `mandir_master`.`zone_id`)) WHERE `mandir_master`.`is_deleted` = 'N' ORDER BY `mandir_master`.`mandir_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `marital_status_view`
--
DROP TABLE IF EXISTS `marital_status_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `marital_status_view`  AS SELECT `marital_status_master`.`marital_status_id` AS `marital_status_id`, `marital_status_master`.`marital_status_name` AS `marital_status_name`, concat('<form action="',(select `config`.`base_url` from `config`),'MaritalStatus/edit" method="post"><input type="hidden" value="',`marital_status_master`.`marital_status_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'MaritalStatus/delete?id=',`marital_status_master`.`marital_status_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `marital_status_master` WHERE `marital_status_master`.`is_deleted` = 'N' ORDER BY `marital_status_master`.`marital_status_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `nirdeshak_view`
--
DROP TABLE IF EXISTS `nirdeshak_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `nirdeshak_view`  AS SELECT `nirdeshak_master`.`nirdeshak_id` AS `nirdeshak_id`, `nirdeshak_master`.`nirdeshak_name` AS `nirdeshak_name`, `nirdeshak_master`.`mobile_no` AS `mobile_no`, `nirdeshak_master`.`whatapp_no` AS `whatapp_no`, `nirdeshak_master`.`email_id` AS `email_id`, concat('<form action="',(select `config`.`base_url` from `config`),'Nirdeshak/edit" method="post"><input type="hidden" value="',`nirdeshak_master`.`nirdeshak_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'nirdeshak/delete?id=',`nirdeshak_master`.`nirdeshak_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `nirdeshak_master` WHERE `nirdeshak_master`.`is_deleted` = 'N' ORDER BY `nirdeshak_master`.`nirdeshak_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `nirikshak_view`
--
DROP TABLE IF EXISTS `nirikshak_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `nirikshak_view`  AS SELECT `nirikshak_master`.`nirikshak_id` AS `nirikshak_id`, `zone_master`.`zone_name` AS `zone_name`, concat(`talim_batch_master`.`talim_year`,'-',`talim_batch_master`.`talim_batch`) AS `talim_batch`, concat(ifnull(concat(`sevak_master`.`ytk_id`,' - '),''),`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`) AS `nirikshak_name`, group_concat(concat(`group_master`.`group_code`,' - ',`group_master`.`group_name`) separator ',') AS `group_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Nirikshak/edit" method="post"><input type="hidden" value="',`nirikshak_master`.`nirikshak_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Nirikshak/delete?id=',`nirikshak_master`.`nirikshak_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (((((`nirikshak_master` join `nirikshak_group` on(`nirikshak_master`.`nirikshak_id` = `nirikshak_group`.`nirikshak_id`)) join `group_master` on(`group_master`.`group_id` = `nirikshak_group`.`group_id`)) join `zone_master` on(`zone_master`.`zone_id` = `nirikshak_master`.`zone_id`)) join `talim_batch_master` on(`talim_batch_master`.`talim_batch_id` = `nirikshak_master`.`talim_batch_id`)) join `sevak_master` on(`sevak_master`.`sevak_id` = `nirikshak_master`.`sevak_id`)) GROUP BY `nirikshak_master`.`nirikshak_id` ORDER BY `zone_master`.`zone_name` ASC, `group_master`.`group_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `none_sevak_view`
--
DROP TABLE IF EXISTS `none_sevak_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `none_sevak_view`  AS SELECT `sevak_master`.`sevak_id` AS `sevak_id`, concat(`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`) AS `sevak_name`, concat('<form action="',(select `config`.`base_url` from `config`),'NoneSevak/edit" method="post"><input type="hidden" value="',`sevak_master`.`sevak_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'NoneSevak/getSevakPassword/',`sevak_master`.`sevak_id`,'" data-toggle="modal" onclick="getSevakPassword(',`sevak_master`.`sevak_id`,')" class="btn btn-sm btn-danger" data-target="#sevakPasswordModel">',' ','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `sevak_master` WHERE `sevak_master`.`is_deleted` = 'N' AND `sevak_master`.`sevak_type` = 'N' GROUP BY `sevak_master`.`sevak_id` ORDER BY `sevak_master`.`first_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `pincode_view`
--
DROP TABLE IF EXISTS `pincode_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `pincode_view`  AS SELECT `pincode_master`.`pin_id` AS `pin_id`, `city_master`.`city_name` AS `city_name`, `pincode_master`.`pincode` AS `pincode`, concat('<form action="',(select `config`.`base_url` from `config`),'PinCode/edit" method="post"><input type="hidden" value="',`pincode_master`.`pin_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'PinCode/delete?id=',`pincode_master`.`pin_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (`pincode_master` join `city_master` on(`city_master`.`city_id` = `pincode_master`.`city_id`)) WHERE `pincode_master`.`is_deleted` = 'N' ORDER BY `city_master`.`city_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `prasang_view`
--
DROP TABLE IF EXISTS `prasang_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `prasang_view`  AS SELECT ifnull(`prasang_master`.`prasang_id`,'0') AS `prasang_id`, date_format(`prasang_master`.`prasang_date`,'%d/%m/%Y') AS `prasang_date`, ifnull(`prasang_master`.`prasang_title`,'') AS `prasang_title`, ifnull(`prasang_master`.`sevak_id`,'') AS `sevak_id`, ifnull(`sevak_master`.`sevak_type`,'') AS `sevak_type`, ifnull(`sevak_master`.`ytk_id`,'') AS `ytk_id`, ifnull(concat(ifnull(concat(`sevak_master`.`ytk_id`,' - '),''),`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`,ifnull(concat('(',`city_master`.`city_name`,')'),''),''),'') AS `sevak_name`, ifnull(`prasang_master`.`vishay`,'') AS `vishay`, ifnull(`prasang_master`.`status`,'') AS `status`, if((select ifnull(count(`prasang_documents`.`prasang_document_id`),0) from `prasang_documents` where `prasang_documents`.`prasang_id` = `prasang_master`.`prasang_id`) > 0,concat('<button type="button" class="btn btn-primary btn-sm" onclick="openDocuments(',`prasang_master`.`prasang_id`,')"><i class="fa fa-download"></i></button>'),'') AS `attachement`, if(`sevak_master`.`sevak_type` = 'S',if(`prasang_master`.`status` = 'New',concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/edit?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning">','<i class="fa fa-pencil"></i>','</a>'),' '),'') AS `sevakEditBtn`, concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/edit?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning">','<i class="fa fa-pencil"></i>','</a>') AS `editBtn`, if(`sevak_master`.`sevak_type` = 'S',if(`prasang_master`.`status` = 'New',concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/delete?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>'),' '),'') AS `sevakDeleteBtn`, concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/delete?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `deleteBtn`, if(`sevak_master`.`sevak_type` = 'S',if(`prasang_master`.`status` = 'New',concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/prasangReport?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" target="_blank" title="Print" class="btn btn-sm btn-success">','<i class="fa fa-print"></i>','</a>'),' '),'') AS `sevakPrintBtn`, concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/prasangReport?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" target="_blank" title="Print" class="btn btn-sm btn-success">','<i class="fa fa-print"></i>','</a>') AS `printBtn`, if(`sevak_master`.`sevak_type` = 'S',if(`prasang_master`.`status` <> 'New',concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/prasangDetailView?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" title="View" class="btn btn-sm btn-secondary">','<i class="fa fa-eye"></i>','</a>'),' '),'') AS `sevakViewBtn`, concat('<a href="',(select `config`.`base_url` from `config`),'Prasang/prasangDetailView?id=',`prasang_master`.`prasang_id`,'" data-toggle="tooltip" title="View" class="btn btn-sm btn-secondary">','<i class="fa fa-eye"></i>','</a>') AS `viewBtn`, `grade_master`.`grade_name` AS `grade_name` FROM (((`prasang_master` left join `sevak_master` on(`sevak_master`.`sevak_id` = `prasang_master`.`sevak_id`)) left join `city_master` on(`city_master`.`city_id` = `sevak_master`.`city_id`)) left join `grade_master` on(`grade_master`.`grade_id` = `prasang_master`.`grade_id`)) WHERE `prasang_master`.`is_deleted` = 'N' AND `sevak_master`.`is_deleted` = 'N' ORDER BY `prasang_master`.`prasang_date` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `relationship_view`
--
DROP TABLE IF EXISTS `relationship_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `relationship_view`  AS SELECT `relationship_master`.`relationship_id` AS `relationship_id`, `relationship_master`.`relationship_name` AS `relationship_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Relationship/edit" method="post"><input type="hidden" value="',`relationship_master`.`relationship_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Relationship/delete?id=',`relationship_master`.`relationship_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `relationship_master` WHERE `relationship_master`.`is_deleted` = 'N' ORDER BY `relationship_master`.`relationship_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `room_view`
--
DROP TABLE IF EXISTS `room_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `room_view`  AS SELECT `room_master`.`room_id` AS `room_id`, `room_master`.`room_no` AS `room_no`, `room_master`.`no_of_occupancy` AS `no_of_occupancy`, concat('<form action="',(select `config`.`base_url` from `config`),'Room/edit" method="post"><input type="hidden" value="',`room_master`.`room_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Room/delete?id=',`room_master`.`room_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `room_master` WHERE `room_master`.`is_deleted` = 'N' ORDER BY `room_master`.`room_no` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `sant_karyakar_designation_view`
--
DROP TABLE IF EXISTS `sant_karyakar_designation_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sant_karyakar_designation_view`  AS SELECT `sant_karyakar_designation_master`.`sant_karyakar_designation_id` AS `sant_karyakar_designation_id`, if(`sant_karyakar_designation_master`.`type` = 'S','Sant','Karyakar') AS `type`, `sant_karyakar_designation_master`.`designation` AS `designation`, concat('<form action="',(select `config`.`base_url` from `config`),'SantKaryakarDesignation/edit" method="post"><input type="hidden" value="',`sant_karyakar_designation_master`.`sant_karyakar_designation_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'SantKaryakarDesignation/delete?id=',`sant_karyakar_designation_master`.`sant_karyakar_designation_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `sant_karyakar_designation_master` WHERE `sant_karyakar_designation_master`.`is_deleted` = 'N' ORDER BY `sant_karyakar_designation_master`.`type` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `sant_nirdeshak_view`
--
DROP TABLE IF EXISTS `sant_nirdeshak_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sant_nirdeshak_view`  AS SELECT `sant_nirdeshak_master`.`sant_nirdeshak_id` AS `sant_nirdeshak_id`, `sant_nirdeshak_master`.`sant_nirdeshak_name` AS `sant_nirdeshak_name`, `sant_nirdeshak_master`.`mobile_no` AS `mobile_no`, `sant_nirdeshak_master`.`whatapp_no` AS `whatapp_no`, `sant_nirdeshak_master`.`email_id` AS `email_id`, concat('<form action="',(select `config`.`base_url` from `config`),'SantNirdeshak/edit" method="post"><input type="hidden" value="',`sant_nirdeshak_master`.`sant_nirdeshak_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'SantNirdeshak/delete?id=',`sant_nirdeshak_master`.`sant_nirdeshak_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `sant_nirdeshak_master` WHERE `sant_nirdeshak_master`.`is_deleted` = 'N' ORDER BY `sant_nirdeshak_master`.`sant_nirdeshak_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `satsang_activity_view`
--
DROP TABLE IF EXISTS `satsang_activity_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `satsang_activity_view`  AS SELECT `satsang_activity_master`.`satsang_activity_id` AS `satsang_activity_id`, `satsang_activity_master`.`satsang_activity_name` AS `satsang_activity_name`, concat('<form action="',(select `config`.`base_url` from `config`),'SatsangActivity/edit" method="post"><input type="hidden" value="',`satsang_activity_master`.`satsang_activity_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'SatsangActivity/delete?id=',`satsang_activity_master`.`satsang_activity_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `satsang_activity_master` WHERE `satsang_activity_master`.`is_deleted` = 'N' ORDER BY `satsang_activity_master`.`satsang_activity_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `satsang_designation_view`
--
DROP TABLE IF EXISTS `satsang_designation_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `satsang_designation_view`  AS SELECT `satsang_designation_master`.`satsang_designation_id` AS `satsang_designation_id`, `satsang_activity_master`.`satsang_activity_name` AS `satsang_activity_name`, `satsang_designation_master`.`satsang_designation_name` AS `satsang_designation_name`, concat('<form action="',(select `config`.`base_url` from `config`),'SatsangDesignation/edit" method="post"><input type="hidden" value="',`satsang_designation_master`.`satsang_designation_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'SatsangDesignation/delete?id=',`satsang_designation_master`.`satsang_designation_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (`satsang_designation_master` left join `satsang_activity_master` on(`satsang_activity_master`.`satsang_activity_id` = `satsang_designation_master`.`satsang_activity_id`)) WHERE `satsang_designation_master`.`is_deleted` = 'N' ORDER BY `satsang_designation_master`.`satsang_designation_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `sevak_evaluation_view`
--
DROP TABLE IF EXISTS `sevak_evaluation_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sevak_evaluation_view`  AS SELECT `sevak_evaluation`.`sevak_evaluation_id` AS `sevak_evaluation_id`, concat(`talim_batch_master`.`talim_year`,'-',`talim_batch_master`.`talim_batch`) AS `talimBatch`, concat(ifnull(concat(`sevak_master`.`ytk_id`,' - '),''),`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`) AS `sevak_name`, `city_master`.`city_name` AS `city_name`, `satsa_grade`.`grade_name` AS `satsangGrade`, `edu_grade`.`grade_name` AS `educationGrade`, concat(concat(`satsa_grade`.`grade_name`),' ',if(`sevak_evaluation`.`satsang_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/satsangRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getSevakEvaluationId(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#satsangRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `satsang_action`, concat(concat(`seva_grade_master`.`grade_name`),' ',if(`sevak_evaluation`.`seva_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/sevaGradeRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getSevaGradeRemark(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#sevaGradeRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `sevaGrade`, concat(concat(`human_relations_grade_master`.`grade_name`),' ',if(`sevak_evaluation`.`human_relations_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/humanRelationGradeRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getHumanRelationRemark(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#humanRelationsRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `humanRelationsGrade`, concat(concat(`skill_grade_master`.`grade_name`),' ',if(`sevak_evaluation`.`skill_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/skillGradeRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getSkillGradeRemark(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#skillRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `skillGrade`, concat(concat(`edu_grade`.`grade_name`),' ',if(`sevak_evaluation`.`abhyas_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/educationRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getEducationRemark(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#educationRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `education_action`, concat(concat(`family_ecostatus_grade_master`.`grade_name`),' ',if(`sevak_evaluation`.`family_ecostatus_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/ecostatusGradeRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getEcostatusRemark(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#ecostatusRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `familyEcostatusGrade`, concat(concat(`family_satsang_grade_master`.`grade_name`),' ',if(`sevak_evaluation`.`family_satsang_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/familySatsangGradeRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getFamilySatsangRemark(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#familySatsangRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `familySatsangGrade`, concat(concat(`overall_grade_master`.`grade_name`),' ',if(`sevak_evaluation`.`overall_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/overAllGradeRemark/',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="modal" onclick="getOverAllRemark(',`sevak_evaluation`.`sevak_evaluation_id`,')" data-target="#overAllRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `overall_grade`, concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/edit?id=',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning">','<i class="fa fa-pencil"></i>','</a>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/delete?id=',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `action_delete`, concat('<a href="',(select `config`.`base_url` from `config`),'SevakEvaluation/printSevakEvaluation?id=',`sevak_evaluation`.`sevak_evaluation_id`,'" data-toggle="tooltip" target="_blank" title="Print" class="btn btn-sm btn-success">','<i class="fa fa-print"></i>','</a>') AS `print` FROM (((((((((((`sevak_evaluation` join `talim_batch_master` on(`talim_batch_master`.`talim_batch_id` = `sevak_evaluation`.`talim_batch_id`)) join `sevak_master` on(`sevak_master`.`sevak_id` = `sevak_evaluation`.`sevak_id`)) join `grade_master` `satsa_grade` on(`satsa_grade`.`grade_id` = `sevak_evaluation`.`satsang_grade_id`)) join `grade_master` `edu_grade` on(`edu_grade`.`grade_id` = `sevak_evaluation`.`abhyas_grade_id`)) join `grade_master` `seva_grade_master` on(`seva_grade_master`.`grade_id` = `sevak_evaluation`.`seva_grade_id`)) join `grade_master` `human_relations_grade_master` on(`human_relations_grade_master`.`grade_id` = `sevak_evaluation`.`human_relations_grade_id`)) join `grade_master` `skill_grade_master` on(`skill_grade_master`.`grade_id` = `sevak_evaluation`.`skill_grade_id`)) join `grade_master` `family_ecostatus_grade_master` on(`family_ecostatus_grade_master`.`grade_id` = `sevak_evaluation`.`family_ecostatus_grade_id`)) join `grade_master` `family_satsang_grade_master` on(`family_satsang_grade_master`.`grade_id` = `sevak_evaluation`.`family_satsang_grade_id`)) join `grade_master` `overall_grade_master` on(`overall_grade_master`.`grade_id` = `sevak_evaluation`.`overall_grade_id`)) left join `city_master` on(`city_master`.`city_id` = `sevak_master`.`city_id`)) WHERE `sevak_evaluation`.`is_deleted` = 'N' ORDER BY concat(`talim_batch_master`.`talim_year`,'-',`talim_batch_master`.`talim_batch`) ASC, `sevak_master`.`ytk_id` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `sevak_registered_view`
--
DROP TABLE IF EXISTS `sevak_registered_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sevak_registered_view`  AS SELECT `sevak_master`.`sevak_id` AS `sevak_id`, `sevak_master`.`ytk_id` AS `ytk_id`, if(`sevak_master`.`login_active` = 'Y','Active','In Active') AS `statusRegister`, concat(`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`) AS `sevak_name`, `city_master`.`city_name` AS `city_name`, group_concat(distinct `user_role`.`role` separator ', ') AS `role`, concat(if(`sevak_master`.`certified_status` = 'Y','Certified',''),if(`sevak_master`.`not_complete_status` = 'Y',',Not Complete',''),if(`sevak_master`.`temporary_status` = 'Y',',Temporary',''),if(`sevak_master`.`expired_status` = 'Y','Expired',''),if(`sevak_master`.`sant_in_baps_status` = 'Y',',Sant in Baps','')) AS `status` FROM (((`sevak_master` join `sevak_role` on(`sevak_role`.`sevak_id` = `sevak_master`.`sevak_id`)) join `user_role` on(`user_role`.`role_id` = `sevak_role`.`role_id`)) left join `city_master` on(`city_master`.`city_id` = `sevak_master`.`city_id`)) WHERE `sevak_master`.`is_deleted` = 'N' AND `sevak_master`.`login_active` = 'Y' GROUP BY `sevak_master`.`sevak_id` ORDER BY `sevak_master`.`ytk_id` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `sevak_view`
--
DROP TABLE IF EXISTS `sevak_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `sevak_view`  AS SELECT `sevak_master`.`sevak_id` AS `sevak_id`, `sevak_master`.`ytk_id` AS `ytk_id`, concat('<a href="','" data-toggle="modal" style="text-decoration: underline;" title="Sevak Detail" data-target="#CurrentSevakModel" onclick="getCurrentSevakDetail(',`sevak_master`.`sevak_id`,')">',concat(`sevak_master`.`first_name`,' ',`sevak_master`.`middle_name`,' ',`sevak_master`.`last_name`),'</a>') AS `sevak_name`, `city_master`.`city_name` AS `city_name`, `kshetra_master`.`kshetra_name` AS `kshetra_name`, `kshetra_master`.`kshetra_code` AS `kshetra_code`, `sevak_master`.`current_mandir` AS `mandir`, `city_area`.`area_name` AS `area_name`, `taluka_master`.`taluka_name` AS `taluka_name`, `district_master`.`district_name` AS `district_name`, `state_master`.`state_name` AS `state_name`, `country_master`.`country_name` AS `country_name`, `sevak_master`.`current_sant_nirdeshak` AS `sant_nirdeshak`, replace(`sevak_master`.`contact_mobile1`,' ','') AS `contact_mobile1`, if(`sevak_master`.`login_active` = 'Y','Active','In Active') AS `statusRegister`, replace(`sevak_master`.`contact_mobile2`,' ','') AS `contact_mobile2`, `sevak_master`.`contact_phone_1` AS `contact_phone_1`, `sevak_master`.`contact_phone_2` AS `contact_phone_2`, `sevak_master`.`contact_res_phone1` AS `contact_res_phone1`, `sevak_master`.`contact_res_phone2` AS `contact_res_phone2`, replace(`sevak_master`.`contact_whatsapp_no`,' ','') AS `contact_whatsapp_no`, date_format(`sevak_master`.`birth_date`,'%d-%m-%Y') AS `birth_date`, `caste_master`.`caste_name` AS `caste_name`, if(`sevak_master`.`marital_status_id` = '3',convert(date_format(`sevak_master`.`marital_date`,'%d-%m-%Y') using utf8mb4),'') AS `marriage_date`, `sevak_master`.`contact_per_mail` AS `contact_per_mail`, `sevak_master`.`contact_bus_mail` AS `contact_bus_mail`, `zone_master`.`zone_name` AS `zone_name`, `group_member_mapping`.`group_id` AS `group_id`, group_concat(distinct `employment_master`.`employment_name` separator ', ') AS `employment_name`, group_concat(distinct `sevak_employment`.`emp_detail` separator ', ') AS `employment_detail`, group_concat(distinct `sevak_employment`.`post_designation` separator ', ') AS `post_designation`, concat(`group_master`.`group_code`,' - ',`group_master`.`group_name`) AS `group_name`, group_concat(distinct `satsang_activity_master`.`satsang_activity_name` separator ', ') AS `satsang_activity_name`, group_concat(distinct `satsang_designation_master`.`satsang_designation_name` separator ', ') AS `satsang_designation_name`, group_concat(distinct `degree_master`.`degree` separator ', ') AS `sevak_education`, concat(`sevak_master`.`contact_mobile1`,',',`sevak_master`.`contact_mobile2`,',',`sevak_master`.`contact_phone_1`,',',`sevak_master`.`contact_phone_2`,',',`sevak_master`.`contact_res_phone1`,',',`sevak_master`.`contact_res_phone2`,',',`sevak_master`.`contact_whatsapp_no`) AS `all_contact_no`, group_concat(distinct `specialization_master`.`specialization` separator ', ') AS `specialization`, concat(concat(`grade_master`.`grade_name`),' ',if(`sevak_evaluation`.`overall_notes` = '','',concat('<a href="',(select `config`.`base_url` from `config`),'SevakRegistration/OverAllRemark/',`sevak_master`.`sevak_id`,'" data-toggle="modal" onclick="getSevakId(',`sevak_master`.`sevak_id`,')" data-target="#overAllRemarkModel">',' ','<i class="fa fa-info-circle"></i>','</a>'))) AS `grade_action`, concat(`sevak_master`.`address1`,if(`sevak_master`.`city_area_id` is null or `sevak_master`.`city_area_id` = 0,'',concat(',',`city_area`.`area_name`)),if(`sevak_master`.`city_id` is null or `sevak_master`.`city_id` = 0,'',concat(',',`city_master`.`city_name`)),if(`sevak_master`.`pincode` is null or `sevak_master`.`pincode` = 0,'',concat('-',`sevak_master`.`pincode`)),if(`sevak_master`.`taluka_id` is null or `sevak_master`.`taluka_id` = 0,'',concat(',',`taluka_master`.`taluka_name`)),if(`sevak_master`.`district_id` is null or `sevak_master`.`district_id` = 0,'',concat(',',`district_master`.`district_name`)),if(`sevak_master`.`state_id` is null or `sevak_master`.`state_id` = 0,'',concat(',',`state_master`.`state_name`)),if(`sevak_master`.`country_id` is null or `sevak_master`.`country_id` = 0,'',concat('-',`country_master`.`country_name`))) AS `address`, concat(`talim_batch_master`.`talim_year`,'-',if(`talim_batch_master`.`talim_batch` = 'F','First','Second')) AS `batch`, concat('<form action="',(select `config`.`base_url` from `config`),'SevakRegistration/edit" method="post"><input type="hidden" value="',`sevak_master`.`sevak_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'SevakRegistration/getSevakPassword/',`sevak_master`.`sevak_id`,'" data-toggle="modal" onclick="getSevakPassword(',`sevak_master`.`sevak_id`,')" class="btn btn-sm btn-danger" data-target="#sevakPasswordModel">',' ','<i class="fa fa-trash"></i>','</a>') AS `delete`, concat('<a href="',(select `config`.`base_url` from `config`),'user-profile/',`sevak_master`.`sevak_id`,'" class="btn btn-success btn-sm">','<i class="fa fa-user"></i>',' Submit Profile Change Request</a>') AS `edit_profile` FROM ((((((((((((((((((((((`sevak_master` left join `talim_batch_master` on(`talim_batch_master`.`talim_batch_id` = `sevak_master`.`talim_batch_id`)) left join `city_master` on(`city_master`.`city_id` = `sevak_master`.`city_id`)) left join `kshetra_master` on(`kshetra_master`.`kshetra_id` = `sevak_master`.`current_kshetra_id`)) left join `zone_master` on(`zone_master`.`zone_id` = `kshetra_master`.`zone_id`)) left join `caste_master` on(`caste_master`.`caste_id` = `sevak_master`.`caste_id`)) left join `city_area` on(`city_area`.`city_area_id` = `sevak_master`.`city_area_id`)) left join `taluka_master` on(`taluka_master`.`taluka_id` = `sevak_master`.`taluka_id`)) left join `district_master` on(`district_master`.`district_id` = `sevak_master`.`district_id`)) left join `state_master` on(`state_master`.`state_id` = `sevak_master`.`state_id`)) left join `country_master` on(`country_master`.`country_id` = `sevak_master`.`country_id`)) left join `sevak_satsang` on(`sevak_satsang`.`sevak_id` = `sevak_master`.`sevak_id`)) left join `satsang_activity_master` on(`satsang_activity_master`.`satsang_activity_id` = `sevak_satsang`.`satsang_activity_id`)) left join `satsang_designation_master` on(`satsang_designation_master`.`satsang_designation_id` = `sevak_satsang`.`satsang_designation_id`)) left join `sevak_education` on(`sevak_education`.`sevak_id` = `sevak_master`.`sevak_id`)) left join `degree_master` on(`degree_master`.`degree_id` = `sevak_education`.`degree_id`)) left join `specialization_master` on(`specialization_master`.`specialization_id` = `sevak_education`.`specialization_id`)) left join `sevak_evaluation` on(`sevak_evaluation`.`sevak_id` = `sevak_master`.`sevak_id`)) left join `grade_master` on(`grade_master`.`grade_id` = `sevak_evaluation`.`overall_grade_id`)) left join `group_member_mapping` on(`group_member_mapping`.`sevak_id` = `sevak_master`.`sevak_id`)) left join `group_master` on(`group_master`.`group_id` = `group_member_mapping`.`group_id`)) left join `sevak_employment` on(`sevak_employment`.`sevak_id` = `sevak_master`.`sevak_id`)) left join `employment_master` on(`employment_master`.`employment_id` = `sevak_employment`.`employment_id`)) WHERE `sevak_master`.`is_deleted` = 'N' AND `sevak_master`.`sevak_type` = 'S' GROUP BY `sevak_master`.`sevak_id` ORDER BY `sevak_master`.`talim_batch_id` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `specialization_view`
--
DROP TABLE IF EXISTS `specialization_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `specialization_view`  AS SELECT `specialization_master`.`specialization_id` AS `specialization_id`, `specialization_master`.`specialization` AS `specialization`, `degree_master`.`degree` AS `degree`, concat('<form action="',(select `config`.`base_url` from `config`),'Specialization/edit" method="post"><input type="hidden" value="',`specialization_master`.`specialization_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Specialization/delete?id=',`specialization_master`.`specialization_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (`specialization_master` join `degree_master` on(`degree_master`.`degree_id` = `specialization_master`.`degree_id`)) WHERE `specialization_master`.`is_deleted` = 'N' ORDER BY `specialization_master`.`specialization` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `state_view`
--
DROP TABLE IF EXISTS `state_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `state_view`  AS SELECT `state_master`.`state_id` AS `state_id`, `state_master`.`state_name` AS `state_name`, `country_master`.`country_name` AS `country_name`, concat('<form action="',(select `config`.`base_url` from `config`),'State/edit" method="post"><input type="hidden" value="',`state_master`.`state_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'State/delete?id=',`state_master`.`state_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (`state_master` join `country_master` on(`country_master`.`country_id` = `state_master`.`country_id`)) WHERE `state_master`.`is_deleted` = 'N' ORDER BY `state_master`.`state_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `talent_view`
--
DROP TABLE IF EXISTS `talent_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `talent_view`  AS SELECT `talent_master`.`talent_id` AS `talent_id`, `talent_master`.`talent_name` AS `talent_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Talent/edit" method="post"><input type="hidden" value="',`talent_master`.`talent_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Talent/delete?id=',`talent_master`.`talent_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `talent_master` WHERE `talent_master`.`is_deleted` = 'N' ORDER BY `talent_master`.`talent_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `talim_batch_view`
--
DROP TABLE IF EXISTS `talim_batch_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `talim_batch_view`  AS SELECT `talim_batch_master`.`talim_batch_id` AS `talim_batch_id`, `talim_batch_master`.`talim_year` AS `talim_year`, if(`talim_batch_master`.`talim_batch` = 'F','First','Second') AS `talim_batch`, if(`talim_batch_master`.`is_active` = 'Y','<span class="badge badge-pill badge-default badge-success badge-default"><i class="fa fa-check"></i> Activated</span>','') AS `is_active`, concat('<form action="',(select `config`.`base_url` from `config`),'TalimBatch/edit" method="post"><input type="hidden" value="',`talim_batch_master`.`talim_batch_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'TalimBatch/delete?id=',`talim_batch_master`.`talim_batch_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `talim_batch_master` WHERE `talim_batch_master`.`is_deleted` = 'N' ORDER BY `talim_batch_master`.`talim_year` DESC, `talim_batch_master`.`talim_batch` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `taluka_view`
--
DROP TABLE IF EXISTS `taluka_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `taluka_view`  AS SELECT `taluka_master`.`taluka_id` AS `taluka_id`, `taluka_master`.`taluka_name` AS `taluka_name`, `district_master`.`district_name` AS `district_name`, `state_master`.`state_name` AS `state_name`, `country_master`.`country_name` AS `country_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Taluka/edit" method="post"><input type="hidden" value="',`taluka_master`.`taluka_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Taluka/delete?id=',`taluka_master`.`taluka_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM (((`taluka_master` join `country_master` on(`country_master`.`country_id` = `taluka_master`.`country_id`)) join `state_master` on(`state_master`.`state_id` = `taluka_master`.`state_id`)) join `district_master` on(`district_master`.`district_id` = `taluka_master`.`district_id`)) WHERE `taluka_master`.`is_deleted` = 'N' ORDER BY `taluka_master`.`taluka_name` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `user_role_view`
--
DROP TABLE IF EXISTS `user_role_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_role_view`  AS SELECT `user_role`.`role_id` AS `role_id`, `user_role`.`role` AS `role`, `user_role`.`is_default` AS `is_default`, if(`user_role`.`is_default` = 'N',concat('<form action="',(select `config`.`base_url` from `config`),'Country/edit" method="post"><input type="hidden" value="',`user_role`.`role_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>'),'') AS `edit`, if(`user_role`.`is_default` = 'N',concat('<a href="',(select `config`.`base_url` from `config`),'Country/delete?id=',`user_role`.`role_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure want to delete?\')">','<i class="fa fa-trash"></i>','</a>'),'') AS `delete` FROM `user_role` WHERE `user_role`.`is_deleted` = 'N' ORDER BY `user_role`.`role_id` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `zone_view`
--
DROP TABLE IF EXISTS `zone_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `zone_view`  AS SELECT `zone_master`.`zone_id` AS `zone_id`, `zone_master`.`zone_name` AS `zone_name`, concat('<form action="',(select `config`.`base_url` from `config`),'Zone/edit" method="post"><input type="hidden" value="',`zone_master`.`zone_id`,'" name="id"> <button type="submit" data-toggle="tooltip" title="Edit" class="btn btn-sm btn-warning"><i class="fa fa-pencil"></i> </button></form>') AS `edit`, concat('<a href="',(select `config`.`base_url` from `config`),'Zone/delete?id=',`zone_master`.`zone_id`,'" data-toggle="tooltip" title="Delete" class="btn btn-sm btn-danger"',' ','onclick="return confirm(\'Are you sure  want to delete?\')">','<i class="fa fa-trash"></i>','</a>') AS `delete` FROM `zone_master` WHERE `zone_master`.`is_deleted` = 'N' ORDER BY `zone_master`.`zone_name` ASC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absent_reason_master`
--
ALTER TABLE `absent_reason_master`
  ADD PRIMARY KEY (`absent_reason_id`);

--
-- Indexes for table `batch_code_master`
--
ALTER TABLE `batch_code_master`
  ADD PRIMARY KEY (`batch_id`) USING BTREE;

--
-- Indexes for table `blood_group_master`
--
ALTER TABLE `blood_group_master`
  ADD PRIMARY KEY (`blood_group_id`) USING BTREE;

--
-- Indexes for table `caste_master`
--
ALTER TABLE `caste_master`
  ADD PRIMARY KEY (`caste_id`) USING BTREE;

--
-- Indexes for table `category_master`
--
ALTER TABLE `category_master`
  ADD PRIMARY KEY (`category_id`) USING BTREE;

--
-- Indexes for table `city_area`
--
ALTER TABLE `city_area`
  ADD PRIMARY KEY (`city_area_id`) USING BTREE,
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `city_master`
--
ALTER TABLE `city_master`
  ADD PRIMARY KEY (`city_id`) USING BTREE,
  ADD KEY `city_master_ibfk_2` (`country_id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`config_id`) USING BTREE;

--
-- Indexes for table `country_master`
--
ALTER TABLE `country_master`
  ADD PRIMARY KEY (`country_id`) USING BTREE;

--
-- Indexes for table `degree_master`
--
ALTER TABLE `degree_master`
  ADD PRIMARY KEY (`degree_id`) USING BTREE;

--
-- Indexes for table `district_master`
--
ALTER TABLE `district_master`
  ADD PRIMARY KEY (`district_id`) USING BTREE,
  ADD KEY `country_id` (`country_id`),
  ADD KEY `state_id` (`state_id`);

--
-- Indexes for table `employment_master`
--
ALTER TABLE `employment_master`
  ADD PRIMARY KEY (`employment_id`) USING BTREE;

--
-- Indexes for table `exam_mark_entry_master`
--
ALTER TABLE `exam_mark_entry_master`
  ADD PRIMARY KEY (`mark_entry_id`) USING BTREE,
  ADD KEY `talim_batch_id` (`talim_batch_id`,`examtype_id`,`exam_id`),
  ADD KEY `examtype_id` (`examtype_id`),
  ADD KEY `exam_id` (`exam_id`),
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `exam_master`
--
ALTER TABLE `exam_master`
  ADD PRIMARY KEY (`exam_id`) USING BTREE,
  ADD KEY `examtype_id` (`examtype_id`);

--
-- Indexes for table `exam_schedule_master`
--
ALTER TABLE `exam_schedule_master`
  ADD PRIMARY KEY (`exam_schedule_id`) USING BTREE,
  ADD KEY `talim_batch_id` (`talim_batch_id`),
  ADD KEY `examtype_id` (`examtype_id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `exam_type_master`
--
ALTER TABLE `exam_type_master`
  ADD PRIMARY KEY (`examtype_id`) USING BTREE;

--
-- Indexes for table `followup_entry`
--
ALTER TABLE `followup_entry`
  ADD PRIMARY KEY (`followup_entry_id`),
  ADD KEY `followup_setting_id` (`followup_setting_id`),
  ADD KEY `absent_reason_id` (`absent_reason_id`);

--
-- Indexes for table `followup_sahayak`
--
ALTER TABLE `followup_sahayak`
  ADD PRIMARY KEY (`followup_sahayak_id`) USING BTREE,
  ADD KEY `talim_batch_id` (`talim_batch_id`,`sevak_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `followup_sahayak_group`
--
ALTER TABLE `followup_sahayak_group`
  ADD PRIMARY KEY (`followup_sahayak_group_id`) USING BTREE,
  ADD KEY `followup_sahayak_id` (`followup_sahayak_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `followup_setting`
--
ALTER TABLE `followup_setting`
  ADD PRIMARY KEY (`followup_setting_id`),
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `gosthi_id` (`gosthi_id`);

--
-- Indexes for table `gosthi_absent_group_member`
--
ALTER TABLE `gosthi_absent_group_member`
  ADD PRIMARY KEY (`gosthi_absent_id`) USING BTREE;

--
-- Indexes for table `gosthi_activity_detail`
--
ALTER TABLE `gosthi_activity_detail`
  ADD PRIMARY KEY (`gosthi_activity_detail_id`) USING BTREE,
  ADD KEY `gosthi_report_submission_id` (`gosthi_report_submission_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `gosthi_schedule_detail_id` (`gosthi_schedule_detail_id`),
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `gosthi_topic_type_id` (`gosthi_topic_type_id`);

--
-- Indexes for table `gosthi_date_requested_log`
--
ALTER TABLE `gosthi_date_requested_log`
  ADD PRIMARY KEY (`gosthi_requested_id`),
  ADD KEY `gosthi_id` (`gosthi_id`);

--
-- Indexes for table `gosthi_evaluation_criteria`
--
ALTER TABLE `gosthi_evaluation_criteria`
  ADD PRIMARY KEY (`gosthi_evaluation_criteria_id`) USING BTREE;

--
-- Indexes for table `gosthi_master`
--
ALTER TABLE `gosthi_master`
  ADD PRIMARY KEY (`gosthi_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `gosthi_other_group_member`
--
ALTER TABLE `gosthi_other_group_member`
  ADD PRIMARY KEY (`other_gosthi_group_detail_id`) USING BTREE;

--
-- Indexes for table `gosthi_photos`
--
ALTER TABLE `gosthi_photos`
  ADD PRIMARY KEY (`gosthi_photos_id`) USING BTREE,
  ADD KEY `gosthi_report_submission_id` (`gosthi_report_submission_id`),
  ADD KEY `gosthi_id` (`gosthi_id`);

--
-- Indexes for table `gosthi_pravachan_detail`
--
ALTER TABLE `gosthi_pravachan_detail`
  ADD PRIMARY KEY (`gosthi_pravachan_detail_id`) USING BTREE,
  ADD KEY `gosthi_report_submission_id` (`gosthi_report_submission_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `gosthi_report_submission`
--
ALTER TABLE `gosthi_report_submission`
  ADD PRIMARY KEY (`gosthi_report_submission_id`) USING BTREE,
  ADD KEY `gosthi_id` (`gosthi_id`),
  ADD KEY `sant_designation_id` (`sant_designation_id`),
  ADD KEY `karyakar_designation_id` (`karyakar_designation_id`);

--
-- Indexes for table `gosthi_schedule`
--
ALTER TABLE `gosthi_schedule`
  ADD PRIMARY KEY (`gosthi_schedule_id`) USING BTREE;

--
-- Indexes for table `gosthi_schedule_detail`
--
ALTER TABLE `gosthi_schedule_detail`
  ADD PRIMARY KEY (`gosthi_schedule_detail_id`) USING BTREE,
  ADD KEY `gosthi_schedule_id` (`gosthi_schedule_id`),
  ADD KEY `gosthi_topic_type_id` (`gosthi_topic_type_id`);

--
-- Indexes for table `gosthi_topic_type_master`
--
ALTER TABLE `gosthi_topic_type_master`
  ADD PRIMARY KEY (`gosthi_topic_type_id`) USING BTREE;

--
-- Indexes for table `grade_master`
--
ALTER TABLE `grade_master`
  ADD PRIMARY KEY (`grade_id`) USING BTREE;

--
-- Indexes for table `group_master`
--
ALTER TABLE `group_master`
  ADD PRIMARY KEY (`group_id`) USING BTREE,
  ADD KEY `zone_id` (`zone_id`),
  ADD KEY `mandir_id` (`mandir_id`,`kshetra_id`);

--
-- Indexes for table `group_member_mapping`
--
ALTER TABLE `group_member_mapping`
  ADD PRIMARY KEY (`group_member_mapping_id`) USING BTREE,
  ADD KEY `group_id` (`group_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `is_sanchalak` (`is_sanchalak`) USING BTREE;

--
-- Indexes for table `kshetra_master`
--
ALTER TABLE `kshetra_master`
  ADD PRIMARY KEY (`kshetra_id`) USING BTREE,
  ADD KEY `zone_id` (`zone_id`),
  ADD KEY `mandir_id` (`mandir_id`),
  ADD KEY `sant_nirdeshak_id` (`sant_nirdeshak_id`),
  ADD KEY `nirdeshak_id` (`nirdeshak_id`);

--
-- Indexes for table `mandir_master`
--
ALTER TABLE `mandir_master`
  ADD PRIMARY KEY (`mandir_id`) USING BTREE;

--
-- Indexes for table `marital_status_master`
--
ALTER TABLE `marital_status_master`
  ADD PRIMARY KEY (`marital_status_id`) USING BTREE;

--
-- Indexes for table `nirdeshak_master`
--
ALTER TABLE `nirdeshak_master`
  ADD PRIMARY KEY (`nirdeshak_id`) USING BTREE;

--
-- Indexes for table `nirikshak_group`
--
ALTER TABLE `nirikshak_group`
  ADD PRIMARY KEY (`nirikshak_group_id`) USING BTREE,
  ADD KEY `nirikshak_id` (`nirikshak_id`),
  ADD KEY `zone_id` (`zone_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `nirikshak_master`
--
ALTER TABLE `nirikshak_master`
  ADD PRIMARY KEY (`nirikshak_id`) USING BTREE,
  ADD KEY `zone_id` (`zone_id`),
  ADD KEY `talim_batch_id` (`talim_batch_id`),
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `other_gosthi_group_detail`
--
ALTER TABLE `other_gosthi_group_detail`
  ADD PRIMARY KEY (`other_gosthi_group_detail_id`) USING BTREE,
  ADD KEY `gosthi_report_submission_id` (`gosthi_report_submission_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `pincode_master`
--
ALTER TABLE `pincode_master`
  ADD PRIMARY KEY (`pin_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `prasang_documents`
--
ALTER TABLE `prasang_documents`
  ADD PRIMARY KEY (`prasang_document_id`),
  ADD KEY `prasang_id` (`prasang_id`);

--
-- Indexes for table `prasang_master`
--
ALTER TABLE `prasang_master`
  ADD PRIMARY KEY (`prasang_id`) USING BTREE,
  ADD KEY `talim_batch_id` (`talim_batch_id`),
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `grade_id` (`grade_id`);

--
-- Indexes for table `profile_update_request`
--
ALTER TABLE `profile_update_request`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `relationship_master`
--
ALTER TABLE `relationship_master`
  ADD PRIMARY KEY (`relationship_id`) USING BTREE;

--
-- Indexes for table `reset_password`
--
ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `room_allocation`
--
ALTER TABLE `room_allocation`
  ADD PRIMARY KEY (`room_allcoation_id`);

--
-- Indexes for table `room_allocation_log`
--
ALTER TABLE `room_allocation_log`
  ADD PRIMARY KEY (`room_allcoation_log_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `room_allocation_shuffle_log`
--
ALTER TABLE `room_allocation_shuffle_log`
  ADD PRIMARY KEY (`room_allocation_shuffle_log_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `room_allocation_temp`
--
ALTER TABLE `room_allocation_temp`
  ADD PRIMARY KEY (`room_allcoation_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `room_master`
--
ALTER TABLE `room_master`
  ADD PRIMARY KEY (`room_id`) USING BTREE;

--
-- Indexes for table `sant_karyakar_designation_master`
--
ALTER TABLE `sant_karyakar_designation_master`
  ADD PRIMARY KEY (`sant_karyakar_designation_id`) USING BTREE;

--
-- Indexes for table `sant_nirdeshak_master`
--
ALTER TABLE `sant_nirdeshak_master`
  ADD PRIMARY KEY (`sant_nirdeshak_id`) USING BTREE;

--
-- Indexes for table `satsang_activity_master`
--
ALTER TABLE `satsang_activity_master`
  ADD PRIMARY KEY (`satsang_activity_id`) USING BTREE;

--
-- Indexes for table `satsang_designation_master`
--
ALTER TABLE `satsang_designation_master`
  ADD PRIMARY KEY (`satsang_designation_id`) USING BTREE,
  ADD KEY `satsang_activity_id` (`satsang_activity_id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`setting_id`);

--
-- Indexes for table `sevak_education`
--
ALTER TABLE `sevak_education`
  ADD PRIMARY KEY (`education_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `degree_id` (`degree_id`),
  ADD KEY `specialization_id` (`specialization_id`);

--
-- Indexes for table `sevak_employment`
--
ALTER TABLE `sevak_employment`
  ADD PRIMARY KEY (`sevak_employment_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `employment_id` (`employment_id`);

--
-- Indexes for table `sevak_evaluation`
--
ALTER TABLE `sevak_evaluation`
  ADD PRIMARY KEY (`sevak_evaluation_id`) USING BTREE,
  ADD KEY `talim_batch_id` (`talim_batch_id`),
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `overall_grade_id` (`overall_grade_id`);

--
-- Indexes for table `sevak_family`
--
ALTER TABLE `sevak_family`
  ADD PRIMARY KEY (`sevak_family_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `relationship_id` (`relationship_id`);

--
-- Indexes for table `sevak_master`
--
ALTER TABLE `sevak_master`
  ADD PRIMARY KEY (`sevak_id`) USING BTREE,
  ADD KEY `role_id` (`role_id`),
  ADD KEY `talim_batch_id` (`talim_batch_id`),
  ADD KEY `batch_id` (`batch_id`),
  ADD KEY `caste_id` (`caste_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `blood_group_id` (`blood_group_id`),
  ADD KEY `marital_status_id` (`marital_status_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `state_id` (`state_id`),
  ADD KEY `district_id` (`district_id`),
  ADD KEY `taluka_id` (`taluka_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `city_area_id` (`city_area_id`),
  ADD KEY `per_country_id` (`per_country_id`),
  ADD KEY `per_state_id` (`per_state_id`),
  ADD KEY `per_district_id` (`per_district_id`),
  ADD KEY `per_taluka_id` (`per_taluka_id`),
  ADD KEY `per_city_id` (`per_city_id`),
  ADD KEY `per_city_area_id` (`per_city_area_id`),
  ADD KEY `talim_country_id` (`talim_country_id`),
  ADD KEY `talim_state_id` (`talim_state_id`),
  ADD KEY `talim_district_id` (`talim_district_id`),
  ADD KEY `talim_taluka_id` (`talim_taluka_id`),
  ADD KEY `talim_city_id` (`talim_city_id`),
  ADD KEY `talim_city_area_id` (`talim_city_area_id`),
  ADD KEY `sat_ref_city_id` (`sat_ref_city_id`),
  ADD KEY `ins_by_city_id` (`ins_by_city_id`),
  ADD KEY `kshetra_id` (`kshetra_id`),
  ADD KEY `talim_kshetra_id` (`talim_kshetra_id`),
  ADD KEY `current_kshetra_id` (`current_kshetra_id`),
  ADD KEY `satsangi_batch_id` (`satsangi_batch_id`),
  ADD KEY `satsangi_sevak_id` (`satsangi_sevak_id`),
  ADD KEY `inpired_batch_id` (`inpired_batch_id`),
  ADD KEY `inspired_sevak_id` (`inspired_sevak_id`),
  ADD KEY `shikhar_mandir_id` (`shikhar_mandir_id`),
  ADD KEY `hari_mandir_id` (`hari_mandir_id`);

--
-- Indexes for table `sevak_role`
--
ALTER TABLE `sevak_role`
  ADD PRIMARY KEY (`sevak_role_id`) USING BTREE,
  ADD KEY `role_id` (`role_id`),
  ADD KEY `sevak_id` (`sevak_id`);

--
-- Indexes for table `sevak_satsang`
--
ALTER TABLE `sevak_satsang`
  ADD PRIMARY KEY (`sevak_satsang_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `satsang_activity_id` (`satsang_activity_id`),
  ADD KEY `satsang_designation_id` (`satsang_designation_id`);

--
-- Indexes for table `sevak_talent`
--
ALTER TABLE `sevak_talent`
  ADD PRIMARY KEY (`sevak_talent_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `talent_id` (`talent_id`),
  ADD KEY `grade_id` (`grade_id`);

--
-- Indexes for table `specialization_master`
--
ALTER TABLE `specialization_master`
  ADD PRIMARY KEY (`specialization_id`) USING BTREE,
  ADD KEY `degree_id` (`degree_id`);

--
-- Indexes for table `state_master`
--
ALTER TABLE `state_master`
  ADD PRIMARY KEY (`state_id`) USING BTREE,
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `talent_master`
--
ALTER TABLE `talent_master`
  ADD PRIMARY KEY (`talent_id`) USING BTREE;

--
-- Indexes for table `talim_batch_master`
--
ALTER TABLE `talim_batch_master`
  ADD PRIMARY KEY (`talim_batch_id`) USING BTREE;

--
-- Indexes for table `taluka_master`
--
ALTER TABLE `taluka_master`
  ADD PRIMARY KEY (`taluka_id`) USING BTREE,
  ADD KEY `country_id` (`country_id`),
  ADD KEY `state_id` (`state_id`),
  ADD KEY `district_id` (`district_id`);

--
-- Indexes for table `user_master`
--
ALTER TABLE `user_master`
  ADD PRIMARY KEY (`user_id`) USING BTREE,
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_rights`
--
ALTER TABLE `user_rights`
  ADD PRIMARY KEY (`user_rights_id`) USING BTREE,
  ADD KEY `sevak_id` (`sevak_id`),
  ADD KEY `talim_batch_id` (`talim_batch_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`role_id`) USING BTREE;

--
-- Indexes for table `zone_master`
--
ALTER TABLE `zone_master`
  ADD PRIMARY KEY (`zone_id`) USING BTREE,
  ADD KEY `zone_id` (`zone_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absent_reason_master`
--
ALTER TABLE `absent_reason_master`
  MODIFY `absent_reason_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `batch_code_master`
--
ALTER TABLE `batch_code_master`
  MODIFY `batch_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blood_group_master`
--
ALTER TABLE `blood_group_master`
  MODIFY `blood_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `caste_master`
--
ALTER TABLE `caste_master`
  MODIFY `caste_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `category_master`
--
ALTER TABLE `category_master`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `city_area`
--
ALTER TABLE `city_area`
  MODIFY `city_area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `city_master`
--
ALTER TABLE `city_master`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `country_master`
--
ALTER TABLE `country_master`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `degree_master`
--
ALTER TABLE `degree_master`
  MODIFY `degree_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `district_master`
--
ALTER TABLE `district_master`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employment_master`
--
ALTER TABLE `employment_master`
  MODIFY `employment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `exam_mark_entry_master`
--
ALTER TABLE `exam_mark_entry_master`
  MODIFY `mark_entry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `exam_master`
--
ALTER TABLE `exam_master`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `exam_schedule_master`
--
ALTER TABLE `exam_schedule_master`
  MODIFY `exam_schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `exam_type_master`
--
ALTER TABLE `exam_type_master`
  MODIFY `examtype_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `followup_entry`
--
ALTER TABLE `followup_entry`
  MODIFY `followup_entry_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `followup_sahayak`
--
ALTER TABLE `followup_sahayak`
  MODIFY `followup_sahayak_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `followup_sahayak_group`
--
ALTER TABLE `followup_sahayak_group`
  MODIFY `followup_sahayak_group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `followup_setting`
--
ALTER TABLE `followup_setting`
  MODIFY `followup_setting_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_absent_group_member`
--
ALTER TABLE `gosthi_absent_group_member`
  MODIFY `gosthi_absent_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_activity_detail`
--
ALTER TABLE `gosthi_activity_detail`
  MODIFY `gosthi_activity_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_date_requested_log`
--
ALTER TABLE `gosthi_date_requested_log`
  MODIFY `gosthi_requested_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_evaluation_criteria`
--
ALTER TABLE `gosthi_evaluation_criteria`
  MODIFY `gosthi_evaluation_criteria_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_master`
--
ALTER TABLE `gosthi_master`
  MODIFY `gosthi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gosthi_other_group_member`
--
ALTER TABLE `gosthi_other_group_member`
  MODIFY `other_gosthi_group_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_photos`
--
ALTER TABLE `gosthi_photos`
  MODIFY `gosthi_photos_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_pravachan_detail`
--
ALTER TABLE `gosthi_pravachan_detail`
  MODIFY `gosthi_pravachan_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_report_submission`
--
ALTER TABLE `gosthi_report_submission`
  MODIFY `gosthi_report_submission_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gosthi_schedule`
--
ALTER TABLE `gosthi_schedule`
  MODIFY `gosthi_schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gosthi_schedule_detail`
--
ALTER TABLE `gosthi_schedule_detail`
  MODIFY `gosthi_schedule_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `gosthi_topic_type_master`
--
ALTER TABLE `gosthi_topic_type_master`
  MODIFY `gosthi_topic_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `grade_master`
--
ALTER TABLE `grade_master`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `group_master`
--
ALTER TABLE `group_master`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `group_member_mapping`
--
ALTER TABLE `group_member_mapping`
  MODIFY `group_member_mapping_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `kshetra_master`
--
ALTER TABLE `kshetra_master`
  MODIFY `kshetra_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mandir_master`
--
ALTER TABLE `mandir_master`
  MODIFY `mandir_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `marital_status_master`
--
ALTER TABLE `marital_status_master`
  MODIFY `marital_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `nirdeshak_master`
--
ALTER TABLE `nirdeshak_master`
  MODIFY `nirdeshak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nirikshak_group`
--
ALTER TABLE `nirikshak_group`
  MODIFY `nirikshak_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `nirikshak_master`
--
ALTER TABLE `nirikshak_master`
  MODIFY `nirikshak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `other_gosthi_group_detail`
--
ALTER TABLE `other_gosthi_group_detail`
  MODIFY `other_gosthi_group_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pincode_master`
--
ALTER TABLE `pincode_master`
  MODIFY `pin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prasang_documents`
--
ALTER TABLE `prasang_documents`
  MODIFY `prasang_document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prasang_master`
--
ALTER TABLE `prasang_master`
  MODIFY `prasang_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profile_update_request`
--
ALTER TABLE `profile_update_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `relationship_master`
--
ALTER TABLE `relationship_master`
  MODIFY `relationship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reset_password`
--
ALTER TABLE `reset_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_allocation`
--
ALTER TABLE `room_allocation`
  MODIFY `room_allcoation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_allocation_log`
--
ALTER TABLE `room_allocation_log`
  MODIFY `room_allcoation_log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_allocation_shuffle_log`
--
ALTER TABLE `room_allocation_shuffle_log`
  MODIFY `room_allocation_shuffle_log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_allocation_temp`
--
ALTER TABLE `room_allocation_temp`
  MODIFY `room_allcoation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_master`
--
ALTER TABLE `room_master`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sant_karyakar_designation_master`
--
ALTER TABLE `sant_karyakar_designation_master`
  MODIFY `sant_karyakar_designation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sant_nirdeshak_master`
--
ALTER TABLE `sant_nirdeshak_master`
  MODIFY `sant_nirdeshak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `satsang_activity_master`
--
ALTER TABLE `satsang_activity_master`
  MODIFY `satsang_activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `satsang_designation_master`
--
ALTER TABLE `satsang_designation_master`
  MODIFY `satsang_designation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `setting_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sevak_education`
--
ALTER TABLE `sevak_education`
  MODIFY `education_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sevak_employment`
--
ALTER TABLE `sevak_employment`
  MODIFY `sevak_employment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sevak_evaluation`
--
ALTER TABLE `sevak_evaluation`
  MODIFY `sevak_evaluation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sevak_family`
--
ALTER TABLE `sevak_family`
  MODIFY `sevak_family_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `sevak_master`
--
ALTER TABLE `sevak_master`
  MODIFY `sevak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sevak_role`
--
ALTER TABLE `sevak_role`
  MODIFY `sevak_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `sevak_satsang`
--
ALTER TABLE `sevak_satsang`
  MODIFY `sevak_satsang_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sevak_talent`
--
ALTER TABLE `sevak_talent`
  MODIFY `sevak_talent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `specialization_master`
--
ALTER TABLE `specialization_master`
  MODIFY `specialization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `state_master`
--
ALTER TABLE `state_master`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `talent_master`
--
ALTER TABLE `talent_master`
  MODIFY `talent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `talim_batch_master`
--
ALTER TABLE `talim_batch_master`
  MODIFY `talim_batch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `taluka_master`
--
ALTER TABLE `taluka_master`
  MODIFY `taluka_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_master`
--
ALTER TABLE `user_master`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_rights`
--
ALTER TABLE `user_rights`
  MODIFY `user_rights_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `zone_master`
--
ALTER TABLE `zone_master`
  MODIFY `zone_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `city_area`
--
ALTER TABLE `city_area`
  ADD CONSTRAINT `city_area_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city_master` (`city_id`);

--
-- Constraints for table `city_master`
--
ALTER TABLE `city_master`
  ADD CONSTRAINT `city_master_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country_master` (`country_id`);

--
-- Constraints for table `district_master`
--
ALTER TABLE `district_master`
  ADD CONSTRAINT `district_master_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country_master` (`country_id`),
  ADD CONSTRAINT `district_master_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `state_master` (`state_id`);

--
-- Constraints for table `exam_mark_entry_master`
--
ALTER TABLE `exam_mark_entry_master`
  ADD CONSTRAINT `exam_mark_entry_master_ibfk_1` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `exam_mark_entry_master_ibfk_2` FOREIGN KEY (`examtype_id`) REFERENCES `exam_type_master` (`examtype_id`),
  ADD CONSTRAINT `exam_mark_entry_master_ibfk_3` FOREIGN KEY (`exam_id`) REFERENCES `exam_master` (`exam_id`),
  ADD CONSTRAINT `exam_mark_entry_master_ibfk_4` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `exam_master`
--
ALTER TABLE `exam_master`
  ADD CONSTRAINT `exam_master_ibfk_2` FOREIGN KEY (`examtype_id`) REFERENCES `exam_type_master` (`examtype_id`);

--
-- Constraints for table `exam_schedule_master`
--
ALTER TABLE `exam_schedule_master`
  ADD CONSTRAINT `exam_schedule_master_ibfk_1` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `exam_schedule_master_ibfk_3` FOREIGN KEY (`examtype_id`) REFERENCES `exam_type_master` (`examtype_id`),
  ADD CONSTRAINT `exam_schedule_master_ibfk_4` FOREIGN KEY (`exam_id`) REFERENCES `exam_master` (`exam_id`);

--
-- Constraints for table `followup_entry`
--
ALTER TABLE `followup_entry`
  ADD CONSTRAINT `followup_entry_ibfk_1` FOREIGN KEY (`followup_setting_id`) REFERENCES `followup_setting` (`followup_setting_id`),
  ADD CONSTRAINT `followup_entry_ibfk_2` FOREIGN KEY (`absent_reason_id`) REFERENCES `absent_reason_master` (`absent_reason_id`);

--
-- Constraints for table `followup_sahayak`
--
ALTER TABLE `followup_sahayak`
  ADD CONSTRAINT `followup_sahayak_ibfk_1` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `followup_sahayak_ibfk_2` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `followup_sahayak_group`
--
ALTER TABLE `followup_sahayak_group`
  ADD CONSTRAINT `followup_sahayak_group_ibfk_1` FOREIGN KEY (`followup_sahayak_id`) REFERENCES `followup_sahayak` (`followup_sahayak_id`),
  ADD CONSTRAINT `followup_sahayak_group_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `gosthi_master` (`group_id`);

--
-- Constraints for table `followup_setting`
--
ALTER TABLE `followup_setting`
  ADD CONSTRAINT `followup_setting_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `followup_setting_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group_master` (`group_id`),
  ADD CONSTRAINT `followup_setting_ibfk_3` FOREIGN KEY (`gosthi_id`) REFERENCES `gosthi_master` (`gosthi_id`);

--
-- Constraints for table `gosthi_activity_detail`
--
ALTER TABLE `gosthi_activity_detail`
  ADD CONSTRAINT `gosthi_activity_detail_ibfk_1` FOREIGN KEY (`gosthi_report_submission_id`) REFERENCES `gosthi_report_submission` (`gosthi_report_submission_id`),
  ADD CONSTRAINT `gosthi_activity_detail_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group_master` (`group_id`),
  ADD CONSTRAINT `gosthi_activity_detail_ibfk_3` FOREIGN KEY (`gosthi_schedule_detail_id`) REFERENCES `gosthi_schedule_detail` (`gosthi_schedule_detail_id`),
  ADD CONSTRAINT `gosthi_activity_detail_ibfk_4` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `gosthi_activity_detail_ibfk_5` FOREIGN KEY (`gosthi_topic_type_id`) REFERENCES `gosthi_topic_type_master` (`gosthi_topic_type_id`);

--
-- Constraints for table `gosthi_date_requested_log`
--
ALTER TABLE `gosthi_date_requested_log`
  ADD CONSTRAINT `gosthi_date_requested_log_ibfk_1` FOREIGN KEY (`gosthi_id`) REFERENCES `gosthi_master` (`gosthi_id`);

--
-- Constraints for table `gosthi_master`
--
ALTER TABLE `gosthi_master`
  ADD CONSTRAINT `gosthi_master_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `gosthi_master_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group_master` (`group_id`);

--
-- Constraints for table `gosthi_photos`
--
ALTER TABLE `gosthi_photos`
  ADD CONSTRAINT `gosthi_photos_ibfk_1` FOREIGN KEY (`gosthi_report_submission_id`) REFERENCES `gosthi_report_submission` (`gosthi_report_submission_id`),
  ADD CONSTRAINT `gosthi_photos_ibfk_2` FOREIGN KEY (`gosthi_id`) REFERENCES `gosthi_master` (`gosthi_id`);

--
-- Constraints for table `gosthi_pravachan_detail`
--
ALTER TABLE `gosthi_pravachan_detail`
  ADD CONSTRAINT `gosthi_pravachan_detail_ibfk_1` FOREIGN KEY (`gosthi_report_submission_id`) REFERENCES `gosthi_report_submission` (`gosthi_report_submission_id`),
  ADD CONSTRAINT `gosthi_pravachan_detail_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group_master` (`group_id`);

--
-- Constraints for table `gosthi_report_submission`
--
ALTER TABLE `gosthi_report_submission`
  ADD CONSTRAINT `gosthi_report_submission_ibfk_1` FOREIGN KEY (`gosthi_id`) REFERENCES `gosthi_master` (`gosthi_id`),
  ADD CONSTRAINT `gosthi_report_submission_ibfk_2` FOREIGN KEY (`sant_designation_id`) REFERENCES `sant_karyakar_designation_master` (`sant_karyakar_designation_id`),
  ADD CONSTRAINT `gosthi_report_submission_ibfk_3` FOREIGN KEY (`karyakar_designation_id`) REFERENCES `sant_karyakar_designation_master` (`sant_karyakar_designation_id`);

--
-- Constraints for table `gosthi_schedule_detail`
--
ALTER TABLE `gosthi_schedule_detail`
  ADD CONSTRAINT `gosthi_schedule_detail_ibfk_1` FOREIGN KEY (`gosthi_schedule_id`) REFERENCES `gosthi_schedule` (`gosthi_schedule_id`),
  ADD CONSTRAINT `gosthi_schedule_detail_ibfk_2` FOREIGN KEY (`gosthi_topic_type_id`) REFERENCES `gosthi_topic_type_master` (`gosthi_topic_type_id`);

--
-- Constraints for table `group_member_mapping`
--
ALTER TABLE `group_member_mapping`
  ADD CONSTRAINT `group_member_mapping_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_master` (`group_id`),
  ADD CONSTRAINT `group_member_mapping_ibfk_2` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `nirikshak_group`
--
ALTER TABLE `nirikshak_group`
  ADD CONSTRAINT `nirikshak_group_ibfk_1` FOREIGN KEY (`nirikshak_id`) REFERENCES `nirikshak_master` (`nirikshak_id`),
  ADD CONSTRAINT `nirikshak_group_ibfk_2` FOREIGN KEY (`zone_id`) REFERENCES `zone_master` (`zone_id`),
  ADD CONSTRAINT `nirikshak_group_ibfk_3` FOREIGN KEY (`group_id`) REFERENCES `group_master` (`group_id`);

--
-- Constraints for table `nirikshak_master`
--
ALTER TABLE `nirikshak_master`
  ADD CONSTRAINT `nirikshak_master_ibfk_1` FOREIGN KEY (`zone_id`) REFERENCES `zone_master` (`zone_id`),
  ADD CONSTRAINT `nirikshak_master_ibfk_2` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `nirikshak_master_ibfk_3` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `nirikshak_master_ibfk_4` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `other_gosthi_group_detail`
--
ALTER TABLE `other_gosthi_group_detail`
  ADD CONSTRAINT `other_gosthi_group_detail_ibfk_1` FOREIGN KEY (`gosthi_report_submission_id`) REFERENCES `gosthi_report_submission` (`gosthi_report_submission_id`),
  ADD CONSTRAINT `other_gosthi_group_detail_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group_master` (`group_id`),
  ADD CONSTRAINT `other_gosthi_group_detail_ibfk_3` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `prasang_documents`
--
ALTER TABLE `prasang_documents`
  ADD CONSTRAINT `prasang_documents_ibfk_1` FOREIGN KEY (`prasang_id`) REFERENCES `prasang_master` (`prasang_id`),
  ADD CONSTRAINT `prasang_documents_ibfk_2` FOREIGN KEY (`prasang_id`) REFERENCES `prasang_master` (`prasang_id`);

--
-- Constraints for table `prasang_master`
--
ALTER TABLE `prasang_master`
  ADD CONSTRAINT `prasang_master_ibfk_1` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `prasang_master_ibfk_2` FOREIGN KEY (`grade_id`) REFERENCES `grade_master` (`grade_id`),
  ADD CONSTRAINT `prasang_master_ibfk_3` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `prasang_master_ibfk_4` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `prasang_master_ibfk_5` FOREIGN KEY (`grade_id`) REFERENCES `grade_master` (`grade_id`);

--
-- Constraints for table `reset_password`
--
ALTER TABLE `reset_password`
  ADD CONSTRAINT `reset_password_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `room_allocation_log`
--
ALTER TABLE `room_allocation_log`
  ADD CONSTRAINT `room_allocation_log_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room_master` (`room_id`),
  ADD CONSTRAINT `room_allocation_log_ibfk_2` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `room_allocation_shuffle_log`
--
ALTER TABLE `room_allocation_shuffle_log`
  ADD CONSTRAINT `room_allocation_shuffle_log_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room_master` (`room_id`),
  ADD CONSTRAINT `room_allocation_shuffle_log_ibfk_2` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `room_allocation_temp`
--
ALTER TABLE `room_allocation_temp`
  ADD CONSTRAINT `room_allocation_temp_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room_master` (`room_id`),
  ADD CONSTRAINT `room_allocation_temp_ibfk_2` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `satsang_designation_master`
--
ALTER TABLE `satsang_designation_master`
  ADD CONSTRAINT `satsang_designation_master_ibfk_1` FOREIGN KEY (`satsang_activity_id`) REFERENCES `satsang_activity_master` (`satsang_activity_id`);

--
-- Constraints for table `sevak_education`
--
ALTER TABLE `sevak_education`
  ADD CONSTRAINT `sevak_education_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `sevak_education_ibfk_2` FOREIGN KEY (`degree_id`) REFERENCES `degree_master` (`degree_id`),
  ADD CONSTRAINT `sevak_education_ibfk_3` FOREIGN KEY (`specialization_id`) REFERENCES `specialization_master` (`specialization_id`);

--
-- Constraints for table `sevak_family`
--
ALTER TABLE `sevak_family`
  ADD CONSTRAINT `sevak_family_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `sevak_family_ibfk_2` FOREIGN KEY (`relationship_id`) REFERENCES `relationship_master` (`relationship_id`);

--
-- Constraints for table `sevak_master`
--
ALTER TABLE `sevak_master`
  ADD CONSTRAINT `sevak_master_ibfk_10` FOREIGN KEY (`district_id`) REFERENCES `district_master` (`district_id`),
  ADD CONSTRAINT `sevak_master_ibfk_11` FOREIGN KEY (`taluka_id`) REFERENCES `taluka_master` (`taluka_id`),
  ADD CONSTRAINT `sevak_master_ibfk_12` FOREIGN KEY (`city_id`) REFERENCES `city_master` (`city_id`),
  ADD CONSTRAINT `sevak_master_ibfk_13` FOREIGN KEY (`city_area_id`) REFERENCES `city_area` (`city_area_id`),
  ADD CONSTRAINT `sevak_master_ibfk_14` FOREIGN KEY (`per_country_id`) REFERENCES `country_master` (`country_id`),
  ADD CONSTRAINT `sevak_master_ibfk_15` FOREIGN KEY (`per_state_id`) REFERENCES `state_master` (`state_id`),
  ADD CONSTRAINT `sevak_master_ibfk_16` FOREIGN KEY (`per_district_id`) REFERENCES `district_master` (`district_id`),
  ADD CONSTRAINT `sevak_master_ibfk_17` FOREIGN KEY (`per_taluka_id`) REFERENCES `taluka_master` (`taluka_id`),
  ADD CONSTRAINT `sevak_master_ibfk_18` FOREIGN KEY (`per_city_id`) REFERENCES `city_master` (`city_id`),
  ADD CONSTRAINT `sevak_master_ibfk_19` FOREIGN KEY (`per_city_area_id`) REFERENCES `city_area` (`city_area_id`),
  ADD CONSTRAINT `sevak_master_ibfk_2` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `sevak_master_ibfk_20` FOREIGN KEY (`talim_country_id`) REFERENCES `country_master` (`country_id`),
  ADD CONSTRAINT `sevak_master_ibfk_21` FOREIGN KEY (`talim_state_id`) REFERENCES `state_master` (`state_id`),
  ADD CONSTRAINT `sevak_master_ibfk_22` FOREIGN KEY (`talim_district_id`) REFERENCES `district_master` (`district_id`),
  ADD CONSTRAINT `sevak_master_ibfk_23` FOREIGN KEY (`talim_taluka_id`) REFERENCES `taluka_master` (`taluka_id`),
  ADD CONSTRAINT `sevak_master_ibfk_24` FOREIGN KEY (`talim_city_id`) REFERENCES `city_master` (`city_id`),
  ADD CONSTRAINT `sevak_master_ibfk_25` FOREIGN KEY (`talim_city_area_id`) REFERENCES `city_area` (`city_area_id`),
  ADD CONSTRAINT `sevak_master_ibfk_26` FOREIGN KEY (`sat_ref_city_id`) REFERENCES `city_master` (`city_id`),
  ADD CONSTRAINT `sevak_master_ibfk_27` FOREIGN KEY (`ins_by_city_id`) REFERENCES `city_master` (`city_id`),
  ADD CONSTRAINT `sevak_master_ibfk_28` FOREIGN KEY (`kshetra_id`) REFERENCES `kshetra_master` (`kshetra_id`),
  ADD CONSTRAINT `sevak_master_ibfk_29` FOREIGN KEY (`talim_kshetra_id`) REFERENCES `kshetra_master` (`kshetra_id`),
  ADD CONSTRAINT `sevak_master_ibfk_3` FOREIGN KEY (`batch_id`) REFERENCES `batch_code_master` (`batch_id`),
  ADD CONSTRAINT `sevak_master_ibfk_30` FOREIGN KEY (`current_kshetra_id`) REFERENCES `kshetra_master` (`kshetra_id`),
  ADD CONSTRAINT `sevak_master_ibfk_31` FOREIGN KEY (`satsangi_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `sevak_master_ibfk_32` FOREIGN KEY (`satsangi_sevak_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `sevak_master_ibfk_33` FOREIGN KEY (`inpired_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `sevak_master_ibfk_34` FOREIGN KEY (`inspired_sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `sevak_master_ibfk_35` FOREIGN KEY (`shikhar_mandir_id`) REFERENCES `mandir_master` (`mandir_id`),
  ADD CONSTRAINT `sevak_master_ibfk_36` FOREIGN KEY (`hari_mandir_id`) REFERENCES `mandir_master` (`mandir_id`),
  ADD CONSTRAINT `sevak_master_ibfk_4` FOREIGN KEY (`caste_id`) REFERENCES `caste_master` (`caste_id`),
  ADD CONSTRAINT `sevak_master_ibfk_5` FOREIGN KEY (`category_id`) REFERENCES `category_master` (`category_id`),
  ADD CONSTRAINT `sevak_master_ibfk_6` FOREIGN KEY (`blood_group_id`) REFERENCES `blood_group_master` (`blood_group_id`),
  ADD CONSTRAINT `sevak_master_ibfk_7` FOREIGN KEY (`marital_status_id`) REFERENCES `marital_status_master` (`marital_status_id`),
  ADD CONSTRAINT `sevak_master_ibfk_8` FOREIGN KEY (`country_id`) REFERENCES `country_master` (`country_id`),
  ADD CONSTRAINT `sevak_master_ibfk_9` FOREIGN KEY (`state_id`) REFERENCES `state_master` (`state_id`);

--
-- Constraints for table `sevak_role`
--
ALTER TABLE `sevak_role`
  ADD CONSTRAINT `sevak_role_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `sevak_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`role_id`),
  ADD CONSTRAINT `sevak_role_ibfk_3` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`);

--
-- Constraints for table `sevak_satsang`
--
ALTER TABLE `sevak_satsang`
  ADD CONSTRAINT `sevak_satsang_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `sevak_satsang_ibfk_2` FOREIGN KEY (`satsang_activity_id`) REFERENCES `satsang_designation_master` (`satsang_activity_id`),
  ADD CONSTRAINT `sevak_satsang_ibfk_3` FOREIGN KEY (`satsang_designation_id`) REFERENCES `satsang_designation_master` (`satsang_designation_id`);

--
-- Constraints for table `sevak_talent`
--
ALTER TABLE `sevak_talent`
  ADD CONSTRAINT `sevak_talent_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `sevak_talent_ibfk_2` FOREIGN KEY (`talent_id`) REFERENCES `talent_master` (`talent_id`),
  ADD CONSTRAINT `sevak_talent_ibfk_3` FOREIGN KEY (`grade_id`) REFERENCES `grade_master` (`grade_id`);

--
-- Constraints for table `specialization_master`
--
ALTER TABLE `specialization_master`
  ADD CONSTRAINT `specialization_master_ibfk_1` FOREIGN KEY (`degree_id`) REFERENCES `degree_master` (`degree_id`);

--
-- Constraints for table `state_master`
--
ALTER TABLE `state_master`
  ADD CONSTRAINT `state_master_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country_master` (`country_id`);

--
-- Constraints for table `taluka_master`
--
ALTER TABLE `taluka_master`
  ADD CONSTRAINT `taluka_master_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country_master` (`country_id`),
  ADD CONSTRAINT `taluka_master_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `state_master` (`state_id`),
  ADD CONSTRAINT `taluka_master_ibfk_3` FOREIGN KEY (`district_id`) REFERENCES `district_master` (`district_id`);

--
-- Constraints for table `user_master`
--
ALTER TABLE `user_master`
  ADD CONSTRAINT `user_master_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`role_id`);

--
-- Constraints for table `user_rights`
--
ALTER TABLE `user_rights`
  ADD CONSTRAINT `user_rights_ibfk_1` FOREIGN KEY (`sevak_id`) REFERENCES `sevak_master` (`sevak_id`),
  ADD CONSTRAINT `user_rights_ibfk_2` FOREIGN KEY (`talim_batch_id`) REFERENCES `talim_batch_master` (`talim_batch_id`),
  ADD CONSTRAINT `user_rights_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
