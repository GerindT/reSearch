-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 11:58 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `battles`
--

CREATE TABLE `battles` (
  `battleId` varchar(255) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `playerCount` int(11) NOT NULL,
  `teamSize` int(11) NOT NULL,
  `joinPrice` int(11) NOT NULL,
  `cases` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cases`)),
  `createdById` varchar(255) NOT NULL,
  `minLevel` int(11) NOT NULL,
  `isPrivate` tinyint(1) NOT NULL,
  `isAffiliateOnly` tinyint(1) NOT NULL,
  `players` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`players`)),
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `battles`
--

INSERT INTO `battles` (`battleId`, `mode`, `state`, `playerCount`, `teamSize`, `joinPrice`, `cases`, `createdById`, `minLevel`, `isPrivate`, `isAffiliateOnly`, `players`, `createdAt`, `updatedAt`) VALUES
('5df6ee92-17ec-4120-8484-daddaf96eddf', 'normal', 'starting', 1, 2, 300, '[{\"id\":1,\"guid\":\"idk\",\"caseType\":\"\",\"caseRarity\":\"\",\"caseName\":\"test1\",\"caseAmount\":\"100\",\"caseImg\":\"/case1.png\",\"created_at\":\"2021-06-25T13:58:37.000Z\",\"updated_at\":null,\"caseNumber\":1,\"show\":1},{\"id\":2,\"guid\":\"idk\",\"caseType\":\"\",\"caseRarity\":\"\",\"caseName\":\"test2\",\"caseAmount\":\"100\",\"caseImg\":\"/case2.png\",\"created_at\":\"2021-06-25T13:58:37.000Z\",\"updated_at\":null,\"caseNumber\":1,\"show\":1},{\"id\":3,\"guid\":\"idk\",\"caseType\":\"\",\"caseRarity\":\"\",\"caseName\":\"idk\",\"caseAmount\":\"100\",\"caseImg\":\"/case1.png\",\"created_at\":\"2021-06-25T13:58:37.000Z\",\"updated_at\":null,\"caseNumber\":1,\"show\":1}]', '15e82248-121c-46cd-9f04-1c968d33b4bc', 1, 0, 0, '[{\"team\":1,\"botId\":null,\"user\":{\"displayName\":\"eOR\",\"avatar\":\"https://avatars.akamai.steamstatic.com/e0f4caaeed684d0502f5c68781038c89fd7a59ca.jpg\",\"totalWagered\":0,\"exp\":7690,\"level\":11,\"id\":\"15e82248-121c-46cd-9f04-1c968d33b4bc\"},\"currency\":\"FIAT\"},{\"team\":2,\"botId\":null,\"user\":{\"avatar\":\"https://lh3.googleusercontent.com/a/AEdFTp7ebgAYq_yyrLB3Ah3iqkg5NjtLvVeHERmnBtow=s96-c\",\"displayName\":\"Geri Tershana\",\"id\":\"7e2a5746-cfcb-4e69-a685-7bd140d2e993\",\"totalWager\":0,\"exp\":15080,\"level\":13},\"currency\":null},{\"team\":3,\"botId\":2,\"user\":null,\"currency\":null},{\"team\":4,\"botId\":3,\"user\":null,\"currency\":null}]', '2023-07-08', '2023-07-08');

-- --------------------------------------------------------

--
-- Table structure for table `caseitem`
--

CREATE TABLE `caseitem` (
  `CaseId` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `itemRarity` varchar(255) NOT NULL,
  `itemProb` varchar(255) NOT NULL,
  `caseName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `caseitem`
--

INSERT INTO `caseitem` (`CaseId`, `ItemId`, `itemRarity`, `itemProb`, `caseName`) VALUES
(1, 1, 'rare', '0.50', 'test1'),
(1, 2, 'epic', '0.10', 'test1'),
(1, 3, 'epic', '0.10', 'test1'),
(1, 4, 'epic', '0.10', 'test1'),
(1, 5, 'epic', '0.20', 'test1'),
(2, 3, 'rare', '0.75', 'test2'),
(2, 4, 'legendary', '0.05', 'test2'),
(2, 6, 'epic', '0.10', 'test2'),
(2, 7, 'epic', '0.10', 'test2');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `guid` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `caseType` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `caseRarity` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `caseName` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `caseAmount` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `caseImg` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `guid`, `caseType`, `caseRarity`, `caseName`, `caseAmount`, `caseImg`, `created_at`, `updated_at`) VALUES
(1, 'idk', '', '', 'test1', '100', '/case1.png', '2021-06-25 13:58:37', NULL),
(2, 'idk', '', '', 'test2', '100', '/case2.png', '2021-06-25 13:58:37', NULL),
(3, 'idk', '', '', 'idk', '100', '/case1.png', '2021-06-25 13:58:37', NULL),
(4, 'idk', '', '', 'idk', '100', '/case1.png', '2021-06-25 13:58:37', NULL),
(5, 'idk', '', '', 'idk', '100', '/case1.png', '2021-06-25 13:58:37', NULL),
(6, 'hello', '', '', 'hello', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(7, 'Habibi', '', '', 'Habibi', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(8, 'Nica', '', '', 'Nica', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(9, 'Lezdoit', '', '', 'Lezdoit', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(10, 'Omajgado', '', '', 'Omajgado', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(11, 'Never', '', '', 'Never', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(12, 'Gonna', '', '', 'Gonna', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(13, 'Give', '', '', 'Give', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(14, 'You up', '', '', 'You up', '5000', '/case1.png', '2021-06-25 13:58:37', NULL),
(15, 'Biggo', '', '', 'Biggo', '5000', '/case1.png', '2021-06-25 13:58:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `guid` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `text` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_by` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `created_by_name` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `guid`, `text`, `created_by`, `created_by_name`, `created_at`, `updated_at`) VALUES
(162, '8e9d869e-49fa-42fd-bc21-552c5dfe502c', 'test', '78', 'Daniel Taga', '2021-06-25 13:58:37', NULL),
(163, '64f7a549-3caf-4246-ba8d-57cb171d80be', 'sdfsdf', '78', 'Daniel Taga', '2021-06-25 14:13:33', NULL),
(164, '7dc3b15d-fdca-471e-af96-87393fa541aa', 'fdgdfg', '78', 'Daniel Taga', '2021-06-25 14:15:03', NULL),
(165, '6b05233a-abae-4a3f-a93c-01ecb5a3c6fe', 'kjfsdhfkjh', '78', 'Daniel Taga', '2021-06-25 14:15:20', NULL),
(168, '738951ec-0c73-46de-b157-26109f6275da', 'fdgdf', '78', 'Daniel Taga', '2021-06-25 14:17:02', NULL),
(169, 'e6f4b0ae-2412-4303-896f-32ce381353c4', 'rtesds', '78', 'Daniel Taga', '2021-06-25 14:24:59', NULL),
(170, 'dd42e935-f1e7-4132-82f4-18432d52dedb', 'hey', '78', 'Daniel Taga', '2021-06-29 10:22:39', NULL),
(171, '195ba794-4fc0-4b17-bf23-668ee51cfc72', 'heyffgf', '78', 'Daniel Taga', '2021-06-29 10:22:48', NULL),
(172, '83ae8c41-6868-4318-99cf-72669954faac', 'This is a test comment', '78', 'Daniel Taga', '2021-08-16 20:33:55', NULL),
(174, '2811e11e-f899-4121-abca-34c550a27cbd', 'test comment', '78', 'Daniel Taga', '2021-08-19 09:48:12', NULL),
(175, 'be867975-46c5-4594-856d-1c4bbfe91af1', 'lksdhjf', '78', 'Daniel Taga', '2021-08-25 15:51:25', NULL),
(176, '191eb83d-9acb-481a-8740-3a1e52fadd8c', 'New comment', '78', 'Daniel Taga', '2021-08-25 15:55:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dailycaseitem`
--

CREATE TABLE `dailycaseitem` (
  `CaseId` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `itemRarity` varchar(255) NOT NULL,
  `itemProb` varchar(255) NOT NULL,
  `caseName` varchar(255) NOT NULL,
  `caseImg` varchar(255) NOT NULL,
  `caseAmount` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dailycaseitem`
--

INSERT INTO `dailycaseitem` (`CaseId`, `ItemId`, `itemRarity`, `itemProb`, `caseName`, `caseImg`, `caseAmount`) VALUES
(1, 1, 'Common', '0.70', 'Level 5', '/case1.png', ''),
(1, 2, 'Common', '0.15', 'Level 5', '/case1.png', ''),
(1, 3, 'Common', '0.15', 'Level 5', '/case1.png', ''),
(2, 2, 'Common', '0.40', 'Level 10', '/case1.png', ''),
(2, 4, 'Common', '0.30', 'Level 10', '/case1.png', ''),
(2, 6, 'Common', '0.30', 'Level 10', '/case1.png', ''),
(3, 5, 'Common', '0.10', 'Level 15', '/case1.png', ''),
(3, 6, 'Common', '0.10', 'Level 15', '/case1.png', ''),
(3, 7, 'Common', '0.30', 'Level 15', '/case1.png', ''),
(3, 8, 'Common', '0.25', 'Level 15', '/case1.png', ''),
(3, 9, 'Common', '0.25', 'Level 15', '/case1.png', '');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `ItemId` int(11) NOT NULL,
  `displayName` varchar(64) COLLATE utf8_bin NOT NULL,
  `image` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`ItemId`, `displayName`, `image`, `price`) VALUES
(1, 'firstItem', 'https://cdn.vox-cdn.com/thumbor/z06LjfN-PRdZTwDnfZLBZLgH_kc=/278x0:1898x1080/1200x800/filters:focal(278x0:1898x1080)/cdn.vox-cdn.com/uploads/chorus_image/image/48918181/DJSona-Wallpaper-Kinetic.0.0.jpg', 300),
(2, 'secondItem', 'https://prod.assets.earlygamecdn.com/images/mythmaker-sivir.jpg?mtime=1672664044', 200),
(3, 'thirdItem', '/itemToWin.svg', 200),
(4, 'fourthItem', '/itemToWin.svg', 200),
(5, 'fifthItem', '/itemToWin.svg', 200),
(6, 'sixItem', '/itemToWin.svg', 200),
(7, 'sevenItem', '/itemToWin.svg', 200),
(8, 'eightItem', '/itemToWin.svg', 200),
(9, 'nineItem', '/itemToWin.svg', 200),
(10, 'tenItem', '/itemToWin.svg', 200);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `steamId` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userId`, `steamId`, `googleId`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(28, '15e82248-121c-46cd-9f04-1c968d33b4bc', '76561198421592461', NULL, 'eOR', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNWU4MjI0OC0xMjFjLTQ2Y2QtOWYwNC0xYzk2OGQzM2I0YmMiLCJzdGVhbUlkIjoiNzY1NjExOTg0MjE1OTI0NjEiLCJuYW1lIjoiZU9SIiwiaWF0IjoxNjg5NTA0MzM0LCJleHAiOjE2ODk1OTA3MzR9.OHzZiFJv87EqjRcH42Nm_BS-C3-M-cd8dQ4F6Smnbec', '2023-01-28 10:54:26', '2023-07-16 10:45:34'),
(34, '7e2a5746-cfcb-4e69-a685-7bd140d2e993', NULL, '105277544674471803938', 'Geri Tershana', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZTJhNTc0Ni1jZmNiLTRlNjktYTY4NS03YmQxNDBkMmU5OTMiLCJnb29nbGVJZCI6IjEwNTI3NzU0NDY3NDQ3MTgwMzkzOCIsIm5hbWUiOiJHZXJpIFRlcnNoYW5hIiwiaWF0IjoxNjg5NTAzODkxLCJleHAiOjE2ODk1OTAyOTF9.RhCQ_cBZ5P20YXEyhFMXRxKzlvIuzPnOTf8yeRTtyVA', '2023-02-23 17:24:23', '2023-07-16 10:38:11'),
(35, '9308038a-82fe-47a8-b680-5a5607778b54', NULL, '114263025267055635370', 'Dario Tershana', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MzA4MDM4YS04MmZlLTQ3YTgtYjY4MC01YTU2MDc3NzhiNTQiLCJnb29nbGVJZCI6IjExNDI2MzAyNTI2NzA1NTYzNTM3MCIsIm5hbWUiOiJEYXJpbyBUZXJzaGFuYSIsImlhdCI6MTY4NTk1ODc4OSwiZXhwIjoxNjg2MDQ1MTg5fQ.E17d6w82PPfXnsljGAnig56OXeBvpIF7M8yspo4ZKB4', '2023-02-23 17:31:47', '2023-06-05 09:53:09'),
(36, '4fc9b8a4-2431-4a43-9c2b-7e58c8aa2e65', NULL, '103011002729311635790', 'Gerind Tershana', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZmM5YjhhNC0yNDMxLTRhNDMtOWMyYi03ZTU4YzhhYTJlNjUiLCJnb29nbGVJZCI6IjEwMzAxMTAwMjcyOTMxMTYzNTc5MCIsIm5hbWUiOiJHZXJpbmQgVGVyc2hhbmEiLCJpYXQiOjE2ODYwMzE0ODcsImV4cCI6MTY4NjExNzg4N30.0_fq62rLY4WeOEuo1ZCaq8DG7k4mE7s6zyUbuUE-Nf4', '2023-03-30 19:49:05', '2023-06-06 06:04:47'),
(37, '5e7a72b0-e053-4643-98f4-98bca12157bd', NULL, '107553283912862081884', 'Gerind Tershana', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTdhNzJiMC1lMDUzLTQ2NDMtOThmNC05OGJjYTEyMTU3YmQiLCJnb29nbGVJZCI6IjEwNzU1MzI4MzkxMjg2MjA4MTg4NCIsIm5hbWUiOiJHZXJpbmQgVGVyc2hhbmEiLCJpYXQiOjE2ODQxMzYzNTMsImV4cCI6MTY4NDIyMjc1M30.4uL7z90BfjeO8hsOg4-LaIFTOs3ycedjqe-fJ5h95Sg', '2023-03-31 11:22:25', '2023-05-15 07:39:13'),
(38, '004834d6-52ad-466c-a242-16f7d6d81e49', NULL, NULL, 'geri@gmail.com', 'geri@gmail.com', '$2b$10$1wcmY6ewXu08MQIjnICWbO1j2.dtjilpJBUrObjhEYx.8zZ.8I36G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDQ4MzRkNi01MmFkLTQ2NmMtYTI0Mi0xNmY3ZDZkODFlNDkiLCJuYW1lIjoiZ2VyaUBnbWFpbC5jb20iLCJlbWFpbCI6ImdlcmlAZ21haWwuY29tIiwiaWF0IjoxNjg0MzA4NDk1LCJleHAiOjE2ODQzOTQ4OTV9.e7erlrsdp38W8wVl2i1BO3IG6seLXoi1jc8cTQzTUoo', '2023-05-15 13:09:09', '2023-05-17 07:28:15'),
(39, '4936ec74-500f-4616-919d-c4755f9bd04a', NULL, NULL, 'gerri', 'gerri@gmail.com', '$2b$10$Wf2h46gwfq3/wnCnCKevJumavYdTQPOeSO5Q1xpRjW6m7HrqmJZmG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OTM2ZWM3NC01MDBmLTQ2MTYtOTE5ZC1jNDc1NWY5YmQwNGEiLCJuYW1lIjoiZ2VycmkiLCJlbWFpbCI6ImdlcnJpQGdtYWlsLmNvbSIsImlhdCI6MTY4NjAzMTU5NiwiZXhwIjoxNjg2MTE3OTk2fQ.DYuRypieQTBE41pquPk_LfgWC81IR2IcvWum5MdxzZs', '2023-06-06 06:06:21', '2023-06-06 06:06:36');

-- --------------------------------------------------------

--
-- Table structure for table `user_data_common`
--

CREATE TABLE `user_data_common` (
  `userId` varchar(255) CHARACTER SET latin1 NOT NULL,
  `displayName` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `avatar` varchar(192) COLLATE utf8_bin DEFAULT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `investBalance` int(11) NOT NULL DEFAULT 0,
  `withdrawWagerNeed` int(11) NOT NULL DEFAULT 0,
  `exp` int(11) NOT NULL DEFAULT 0,
  `muteEndsAt` int(11) NOT NULL DEFAULT 0,
  `isBanned` tinyint(1) NOT NULL DEFAULT 0,
  `DailyCases` longtext COLLATE utf8_bin NOT NULL DEFAULT '[1, 1, 1]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_data_common`
--

INSERT INTO `user_data_common` (`userId`, `displayName`, `avatar`, `balance`, `investBalance`, `withdrawWagerNeed`, `exp`, `muteEndsAt`, `isBanned`, `DailyCases`) VALUES
('004834d6-52ad-466c-a242-16f7d6d81e49', NULL, NULL, 5700, 0, 0, 11080, 0, 0, '[1,1,1]'),
('15e82248-121c-46cd-9f04-1c968d33b4bc', 'eOR', 'https://avatars.akamai.steamstatic.com/e0f4caaeed684d0502f5c68781038c89fd7a59ca.jpg', 62500, 0, 0, 18400, 0, 0, '[1,1,1]'),
('4936ec74-500f-4616-919d-c4755f9bd04a', NULL, NULL, -800, 0, 0, 340, 0, 0, '[1,1,1]'),
('4fc9b8a4-2431-4a43-9c2b-7e58c8aa2e65', 'Gerind Tershana', 'https://lh3.googleusercontent.com/a/AGNmyxagC-ikg7NbGZ73YRivmPNK4JiFvZ_eEzbyL5Gu=s96-c', 6200, 0, 0, 370, 0, 0, '[1,1,1]'),
('5e7a72b0-e053-4643-98f4-98bca12157bd', 'Gerind Tershana', 'https://lh3.googleusercontent.com/a/AGNmyxYuyemMKrFIvW4ShXYU4xDdl3hpTp0Z3sOOn24V=s96-c', 49240, 0, 0, 160, 0, 0, '[1,1,1]'),
('7e2a5746-cfcb-4e69-a685-7bd140d2e993', 'Geri Tershana', 'https://lh3.googleusercontent.com/a/AEdFTp7ebgAYq_yyrLB3Ah3iqkg5NjtLvVeHERmnBtow=s96-c', 87540, 0, 0, 17840, 0, 0, '[1,1,1]'),
('9308038a-82fe-47a8-b680-5a5607778b54', 'Dario Tershana', 'https://lh3.googleusercontent.com/a/AEdFTp4Pq5K8Ep_m1EgPdfaqIHjnYxV-vSsQLH09fQOc=s96-c', 13000, 0, 0, 8260, 0, 0, '[1,1,1]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `battles`
--
ALTER TABLE `battles`
  ADD PRIMARY KEY (`battleId`);

--
-- Indexes for table `caseitem`
--
ALTER TABLE `caseitem`
  ADD PRIMARY KEY (`CaseId`,`ItemId`),
  ADD KEY `case_fk` (`CaseId`),
  ADD KEY `item_fk` (`ItemId`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dailycaseitem`
--
ALTER TABLE `dailycaseitem`
  ADD PRIMARY KEY (`CaseId`,`ItemId`),
  ADD KEY `itemdaily_fka` (`ItemId`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`ItemId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_userID` (`userId`);

--
-- Indexes for table `user_data_common`
--
ALTER TABLE `user_data_common`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `caseitem`
--
ALTER TABLE `caseitem`
  ADD CONSTRAINT `case_fk` FOREIGN KEY (`CaseId`) REFERENCES `cases` (`id`),
  ADD CONSTRAINT `item_fk` FOREIGN KEY (`ItemId`) REFERENCES `items` (`ItemId`);

--
-- Constraints for table `dailycaseitem`
--
ALTER TABLE `dailycaseitem`
  ADD CONSTRAINT `itemdaily_fk` FOREIGN KEY (`ItemId`) REFERENCES `items` (`ItemId`),
  ADD CONSTRAINT `itemdaily_fka` FOREIGN KEY (`ItemId`) REFERENCES `items` (`ItemId`);

--
-- Constraints for table `user_data_common`
--
ALTER TABLE `user_data_common`
  ADD CONSTRAINT `FK_userID` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
