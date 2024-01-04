-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2024 at 02:35 PM
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
-- Database: `researchdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(255) NOT NULL,
  `CategoryColor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CategoryID`, `CategoryName`, `CategoryColor`) VALUES
(1, 'NLP', 'info'),
(2, 'AI', 'failure'),
(3, 'ML', 'gray'),
(4, 'WEB SCRAPING', 'success'),
(5, 'CNN', 'indigo'),
(6, 'ROBOTICS', 'warning'),
(7, 'IOT', 'pink'),
(8, 'BIG DATA', 'purple');

-- --------------------------------------------------------

--
-- Table structure for table `categorytopaper`
--

CREATE TABLE `categorytopaper` (
  `PaperID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorytopaper`
--

INSERT INTO `categorytopaper` (`PaperID`, `CategoryID`) VALUES
(1, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(27, 1),
(28, 1),
(29, 1),
(1, 2),
(19, 2),
(20, 2),
(22, 2),
(23, 2),
(26, 2),
(27, 2),
(31, 2),
(3, 3),
(4, 3),
(20, 3),
(22, 3),
(30, 3),
(20, 4),
(22, 4),
(25, 4),
(30, 4),
(22, 5),
(25, 5),
(26, 5),
(21, 6),
(22, 6),
(24, 6),
(26, 6),
(28, 6),
(22, 7),
(24, 7),
(28, 7),
(22, 8),
(25, 8),
(29, 8);

-- --------------------------------------------------------

--
-- Table structure for table `categorytouser`
--

CREATE TABLE `categorytouser` (
  `UserID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorytouser`
--

INSERT INTO `categorytouser` (`UserID`, `CategoryID`) VALUES
(15, 1),
(15, 2),
(15, 3),
(15, 4);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `CommentID` int(11) NOT NULL,
  `CommentText` varchar(255) NOT NULL,
  `PaperID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `CreatedAt` date NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`CommentID`, `CommentText`, `PaperID`, `UserID`, `CreatedAt`, `UpdatedAt`) VALUES
(15, 'DSADADS', 1, 13, '2024-01-03', NULL),
(16, 'ADSAD', 1, 13, '2024-01-03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `UserID` int(11) NOT NULL,
  `PaperID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`UserID`, `PaperID`) VALUES
(1, 1),
(1, 2),
(2, 2),
(13, 1),
(13, 3),
(13, 4),
(13, 15),
(13, 18),
(13, 20),
(13, 27),
(13, 30),
(14, 29),
(15, 31);

-- --------------------------------------------------------

--
-- Table structure for table `papers`
--

CREATE TABLE `papers` (
  `PaperID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Authors` varchar(255) NOT NULL,
  `Content` longtext NOT NULL,
  `Abstract` longtext NOT NULL,
  `IsVerified` tinyint(1) NOT NULL DEFAULT 0,
  `VerifiedDate` date DEFAULT NULL,
  `PaperFile` varchar(255) NOT NULL,
  `CreatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `papers`
--

INSERT INTO `papers` (`PaperID`, `UserID`, `Title`, `Authors`, `Content`, `Abstract`, `IsVerified`, `VerifiedDate`, `PaperFile`, `CreatedAt`) VALUES
(1, 1, 'ResearchGay', 'Test1,Test2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id fuga repudiandae ullam aperiam eos maxime aliquam quibusdam soluta explicabo rerum accusantium non, vitae expedita deleniti nesciunt nisi, asperiores nobis quaerat labore? Veniam dolore deleniti maxime? Totam quam minus quasi, eaque, labore iusto quae ullam voluptas architecto perferendis sit similique quidem maxime doloremque officiis dolorum cum asperiores, magni incidunt. Numquam aperiam voluptate ad reiciendis? Voluptatibus veritatis, voluptate quaerat numquam dolores incidunt ullam voluptates, eius debitis consectetur vero nam id quidem, sit magnam? Eveniet laboriosam reprehenderit, suscipit minima voluptas quia quae fugiat, voluptatem similique atque voluptates, itaque eum autem deleniti expedita obcaecati asperiores cum! Dolorum molestias dignissimos, beatae in, alias fuga aliquam quos sed tempora nulla impedit reprehenderit! Mollitia commodi suscipit harum debitis, autem magni assumenda dolores aperiam aspernatur excepturi esse enim dolorum quidem nam illo cupiditate? Autem, impedit. Veritatis commodi iure nisi eaque quam omnis dolor, odit, nemo a quidem impedit doloribus? Error expedita eveniet earum dolores ullam fuga doloribus explicabo, illo amet illum nesciunt voluptatem accusantium corrupti sed eius soluta esse impedit deleniti optio quia blanditiis. Voluptates doloribus quas possimus, nesciunt accusantium laudantium impedit ad aliquam distinctio? Quod ipsa, obcaecati sit magnam optio veritatis ex itaque. Labore vitae, veritatis adipisci deleniti ullam iusto at, quod aspernatur, tempore ipsam ea iste aliquid voluptas eaque. Quidem facilis sit, dolore assumenda, repellendus expedita aliquam doloribus deleniti dolorem cumque quia et alias, commodi explicabo. Eius alias odit necessitatibus eos facere exercitationem ullam! Eos ipsum, nesciunt atque at, quaerat corporis accusantium libero alias, enim modi magnam repellendus. Voluptas maxime, minus modi quos consectetur voluptatibus provident, quam eligendi enim libero eos consequuntur impedit! Saepe soluta repudiandae at sapiente? Beatae deleniti officiis quibusdam aliquam magnam. Minus dolor doloribus cupiditate eum animi, iste delectus nisi, officiis vitae sunt fuga, quidem accusamus in accusantium vero atque maxime corporis excepturi numquam ea recusandae magnam reiciendis suscipit. Itaque ipsum blanditiis, debitis, quod repudiandae architecto commodi omnis nesciunt veniam molestiae totam! Odio, fugiat amet explicabo sapiente dolore corrupti quia ex voluptas beatae, architecto deleniti est numquam, blanditiis aperiam voluptatibus doloribus magnam delectus sint ratione aut error quo obcaecati quod? Dolor ducimus laboriosam quo non minus voluptate vitae, repellat similique magni placeat adipisci quaerat? Eveniet voluptatibus provident laboriosam at porro ex voluptatum, numquam velit ullam magnam? Voluptate nihil provident quisquam tempora, earum dignissimos neque officiis culpa recusandae nisi libero doloremque modi fuga rem magnam qui eum nulla asperiores tenetur quas optio nam. Magni, omnis unde dolorem minus, fugit voluptatum, itaque culpa consectetur quaerat animi dolore explicabo corrupti totam eveniet quisquam nulla! Maiores necessitatibus, amet illo impedit, dolorem velit, odit neque nihil quo tempore pariatur. Dignissimos, veniam? Suscipit quasi minus atque odio itaque. Aliquid ullam incidunt dolorum fuga numquam quo animi accusamus architecto cumque molestias hic voluptatibus culpa illum laborum earum laboriosam eaque, vero dicta sunt itaque neque voluptates vitae dignissimos eligendi! Facilis corporis cum quisquam dignissimos a quis blanditiis natus, assumenda obcaecati, dolorum nostrum accusamus pariatur molestias aperiam reiciendis culpa repudiandae facere, hic voluptate consectetur inventore expedita nam quae eum. Facilis tempore quo voluptatibus beatae? Non accusamus numquam maiores inventore cumque voluptatum. Facilis culpa explicabo accusamus officia nulla ad est eligendi necessitatibus ea recusandae quisquam assumenda veritatis voluptatibus libero, quis ab alias repudiandae autem et ducimus unde soluta officiis reiciendis! Quo tempora a consequuntur, repellat dignissimos quaerat. Inventore exercitationem perspiciatis quas animi voluptas minima asperiores corporis, eos blanditiis officia reprehenderit atque est modi et consequuntur quasi iure dolorem culpa neque ab rem qui debitis, delectus voluptatibus? Recusandae mollitia doloremque earum quis quasi eligendi distinctio tempora architecto pariatur dolore voluptas sint corrupti perferendis, rem placeat! Dignissimos placeat facilis quidem ea delectus cupiditate laudantium!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper arcu sed malesuada vestibulum. Sed tristique facilisis lacinia. Ut aliquet lectus justo, ut pulvinar diam sagittis sed. Proin massa ante, congue in sem ac, fermentum dignissim mauri', 1, '2023-12-31', 'papers/CV-Gerind Tershana-Albanian.pdf', '2023-11-06'),
(2, 1, 'ResearchGay', 'Test1,Test2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id fuga repudiandae ullam aperiam eos maxime aliquam quibusdam soluta explicabo rerum accusantium non, vitae expedita deleniti nesciunt nisi, asperiores nobis quaerat labore? Veniam dolore deleniti maxime? Totam quam minus quasi, eaque, labore iusto quae ullam voluptas architecto perferendis sit similique quidem maxime doloremque officiis dolorum cum asperiores, magni incidunt. Numquam aperiam voluptate ad reiciendis? Voluptatibus veritatis, voluptate quaerat numquam dolores incidunt ullam voluptates, eius debitis consectetur vero nam id quidem, sit magnam? Eveniet laboriosam reprehenderit, suscipit minima voluptas quia quae fugiat, voluptatem similique atque voluptates, itaque eum autem deleniti expedita obcaecati asperiores cum! Dolorum molestias dignissimos, beatae in, alias fuga aliquam quos sed tempora nulla impedit reprehenderit! Mollitia commodi suscipit harum debitis, autem magni assumenda dolores aperiam aspernatur excepturi esse enim dolorum quidem nam illo cupiditate? Autem, impedit. Veritatis commodi iure nisi eaque quam omnis dolor, odit, nemo a quidem impedit doloribus? Error expedita eveniet earum dolores ullam fuga doloribus explicabo, illo amet illum nesciunt voluptatem accusantium corrupti sed eius soluta esse impedit deleniti optio quia blanditiis. Voluptates doloribus quas possimus, nesciunt accusantium laudantium impedit ad aliquam distinctio? Quod ipsa, obcaecati sit magnam optio veritatis ex itaque. Labore vitae, veritatis adipisci deleniti ullam iusto at, quod aspernatur, tempore ipsam ea iste aliquid voluptas eaque. Quidem facilis sit, dolore assumenda, repellendus expedita aliquam doloribus deleniti dolorem cumque quia et alias, commodi explicabo. Eius alias odit necessitatibus eos facere exercitationem ullam! Eos ipsum, nesciunt atque at, quaerat corporis accusantium libero alias, enim modi magnam repellendus. Voluptas maxime, minus modi quos consectetur voluptatibus provident, quam eligendi enim libero eos consequuntur impedit! Saepe soluta repudiandae at sapiente? Beatae deleniti officiis quibusdam aliquam magnam. Minus dolor doloribus cupiditate eum animi, iste delectus nisi, officiis vitae sunt fuga, quidem accusamus in accusantium vero atque maxime corporis excepturi numquam ea recusandae magnam reiciendis suscipit. Itaque ipsum blanditiis, debitis, quod repudiandae architecto commodi omnis nesciunt veniam molestiae totam! Odio, fugiat amet explicabo sapiente dolore corrupti quia ex voluptas beatae, architecto deleniti est numquam, blanditiis aperiam voluptatibus doloribus magnam delectus sint ratione aut error quo obcaecati quod? Dolor ducimus laboriosam quo non minus voluptate vitae, repellat similique magni placeat adipisci quaerat? Eveniet voluptatibus provident laboriosam at porro ex voluptatum, numquam velit ullam magnam? Voluptate nihil provident quisquam tempora, earum dignissimos neque officiis culpa recusandae nisi libero doloremque modi fuga rem magnam qui eum nulla asperiores tenetur quas optio nam. Magni, omnis unde dolorem minus, fugit voluptatum, itaque culpa consectetur quaerat animi dolore explicabo corrupti totam eveniet quisquam nulla! Maiores necessitatibus, amet illo impedit, dolorem velit, odit neque nihil quo tempore pariatur. Dignissimos, veniam? Suscipit quasi minus atque odio itaque. Aliquid ullam incidunt dolorum fuga numquam quo animi accusamus architecto cumque molestias hic voluptatibus culpa illum laborum earum laboriosam eaque, vero dicta sunt itaque neque voluptates vitae dignissimos eligendi! Facilis corporis cum quisquam dignissimos a quis blanditiis natus, assumenda obcaecati, dolorum nostrum accusamus pariatur molestias aperiam reiciendis culpa repudiandae facere, hic voluptate consectetur inventore expedita nam quae eum. Facilis tempore quo voluptatibus beatae? Non accusamus numquam maiores inventore cumque voluptatum. Facilis culpa explicabo accusamus officia nulla ad est eligendi necessitatibus ea recusandae quisquam assumenda veritatis voluptatibus libero, quis ab alias repudiandae autem et ducimus unde soluta officiis reiciendis! Quo tempora a consequuntur, repellat dignissimos quaerat. Inventore exercitationem perspiciatis quas animi voluptas minima asperiores corporis, eos blanditiis officia reprehenderit atque est modi et consequuntur quasi iure dolorem culpa neque ab rem qui debitis, delectus voluptatibus? Recusandae mollitia doloremque earum quis quasi eligendi distinctio tempora architecto pariatur dolore voluptas sint corrupti perferendis, rem placeat! Dignissimos placeat facilis quidem ea delectus cupiditate laudantium!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper arcu sed malesuada vestibulum. Sed tristique facilisis lacinia. Ut aliquet lectus justo, ut pulvinar diam sagittis sed. Proin massa ante, congue in sem ac, fermentum dignissim mauri', 1, '2023-12-31', 'papers/CV-Gerind Tershana-Albanian.pdf', '2023-12-28'),
(3, 2, 'ResearchGay3', 'Test1,Test2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id fuga repudiandae ullam aperiam eos maxime aliquam quibusdam soluta explicabo rerum accusantium non, vitae expedita deleniti nesciunt nisi, asperiores nobis quaerat labore? Veniam dolore deleniti maxime? Totam quam minus quasi, eaque, labore iusto quae ullam voluptas architecto perferendis sit similique quidem maxime doloremque officiis dolorum cum asperiores, magni incidunt. Numquam aperiam voluptate ad reiciendis? Voluptatibus veritatis, voluptate quaerat numquam dolores incidunt ullam voluptates, eius debitis consectetur vero nam id quidem, sit magnam? Eveniet laboriosam reprehenderit, suscipit minima voluptas quia quae fugiat, voluptatem similique atque voluptates, itaque eum autem deleniti expedita obcaecati asperiores cum! Dolorum molestias dignissimos, beatae in, alias fuga aliquam quos sed tempora nulla impedit reprehenderit! Mollitia commodi suscipit harum debitis, autem magni assumenda dolores aperiam aspernatur excepturi esse enim dolorum quidem nam illo cupiditate? Autem, impedit. Veritatis commodi iure nisi eaque quam omnis dolor, odit, nemo a quidem impedit doloribus? Error expedita eveniet earum dolores ullam fuga doloribus explicabo, illo amet illum nesciunt voluptatem accusantium corrupti sed eius soluta esse impedit deleniti optio quia blanditiis. Voluptates doloribus quas possimus, nesciunt accusantium laudantium impedit ad aliquam distinctio? Quod ipsa, obcaecati sit magnam optio veritatis ex itaque. Labore vitae, veritatis adipisci deleniti ullam iusto at, quod aspernatur, tempore ipsam ea iste aliquid voluptas eaque. Quidem facilis sit, dolore assumenda, repellendus expedita aliquam doloribus deleniti dolorem cumque quia et alias, commodi explicabo. Eius alias odit necessitatibus eos facere exercitationem ullam! Eos ipsum, nesciunt atque at, quaerat corporis accusantium libero alias, enim modi magnam repellendus. Voluptas maxime, minus modi quos consectetur voluptatibus provident, quam eligendi enim libero eos consequuntur impedit! Saepe soluta repudiandae at sapiente? Beatae deleniti officiis quibusdam aliquam magnam. Minus dolor doloribus cupiditate eum animi, iste delectus nisi, officiis vitae sunt fuga, quidem accusamus in accusantium vero atque maxime corporis excepturi numquam ea recusandae magnam reiciendis suscipit. Itaque ipsum blanditiis, debitis, quod repudiandae architecto commodi omnis nesciunt veniam molestiae totam! Odio, fugiat amet explicabo sapiente dolore corrupti quia ex voluptas beatae, architecto deleniti est numquam, blanditiis aperiam voluptatibus doloribus magnam delectus sint ratione aut error quo obcaecati quod? Dolor ducimus laboriosam quo non minus voluptate vitae, repellat similique magni placeat adipisci quaerat? Eveniet voluptatibus provident laboriosam at porro ex voluptatum, numquam velit ullam magnam? Voluptate nihil provident quisquam tempora, earum dignissimos neque officiis culpa recusandae nisi libero doloremque modi fuga rem magnam qui eum nulla asperiores tenetur quas optio nam. Magni, omnis unde dolorem minus, fugit voluptatum, itaque culpa consectetur quaerat animi dolore explicabo corrupti totam eveniet quisquam nulla! Maiores necessitatibus, amet illo impedit, dolorem velit, odit neque nihil quo tempore pariatur. Dignissimos, veniam? Suscipit quasi minus atque odio itaque. Aliquid ullam incidunt dolorum fuga numquam quo animi accusamus architecto cumque molestias hic voluptatibus culpa illum laborum earum laboriosam eaque, vero dicta sunt itaque neque voluptates vitae dignissimos eligendi! Facilis corporis cum quisquam dignissimos a quis blanditiis natus, assumenda obcaecati, dolorum nostrum accusamus pariatur molestias aperiam reiciendis culpa repudiandae facere, hic voluptate consectetur inventore expedita nam quae eum. Facilis tempore quo voluptatibus beatae? Non accusamus numquam maiores inventore cumque voluptatum. Facilis culpa explicabo accusamus officia nulla ad est eligendi necessitatibus ea recusandae quisquam assumenda veritatis voluptatibus libero, quis ab alias repudiandae autem et ducimus unde soluta officiis reiciendis! Quo tempora a consequuntur, repellat dignissimos quaerat. Inventore exercitationem perspiciatis quas animi voluptas minima asperiores corporis, eos blanditiis officia reprehenderit atque est modi et consequuntur quasi iure dolorem culpa neque ab rem qui debitis, delectus voluptatibus? Recusandae mollitia doloremque earum quis quasi eligendi distinctio tempora architecto pariatur dolore voluptas sint corrupti perferendis, rem placeat! Dignissimos placeat facilis quidem ea delectus cupiditate laudantium!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper arcu sed malesuada vestibulum. Sed tristique facilisis lacinia. Ut aliquet lectus justo, ut pulvinar diam sagittis sed. Proin massa ante, congue in sem ac, fermentum dignissim mauri', 1, '2024-01-03', 'papers/CV-Gerind Tershana-Albanian.pdf', '2023-12-28'),
(4, 2, 'test', 'Test1,Test2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id fuga repudiandae ullam aperiam eos maxime aliquam quibusdam soluta explicabo rerum accusantium non, vitae expedita deleniti nesciunt nisi, asperiores nobis quaerat labore? Veniam dolore deleniti maxime? Totam quam minus quasi, eaque, labore iusto quae ullam voluptas architecto perferendis sit similique quidem maxime doloremque officiis dolorum cum asperiores, magni incidunt. Numquam aperiam voluptate ad reiciendis? Voluptatibus veritatis, voluptate quaerat numquam dolores incidunt ullam voluptates, eius debitis consectetur vero nam id quidem, sit magnam? Eveniet laboriosam reprehenderit, suscipit minima voluptas quia quae fugiat, voluptatem similique atque voluptates, itaque eum autem deleniti expedita obcaecati asperiores cum! Dolorum molestias dignissimos, beatae in, alias fuga aliquam quos sed tempora nulla impedit reprehenderit! Mollitia commodi suscipit harum debitis, autem magni assumenda dolores aperiam aspernatur excepturi esse enim dolorum quidem nam illo cupiditate? Autem, impedit. Veritatis commodi iure nisi eaque quam omnis dolor, odit, nemo a quidem impedit doloribus? Error expedita eveniet earum dolores ullam fuga doloribus explicabo, illo amet illum nesciunt voluptatem accusantium corrupti sed eius soluta esse impedit deleniti optio quia blanditiis. Voluptates doloribus quas possimus, nesciunt accusantium laudantium impedit ad aliquam distinctio? Quod ipsa, obcaecati sit magnam optio veritatis ex itaque. Labore vitae, veritatis adipisci deleniti ullam iusto at, quod aspernatur, tempore ipsam ea iste aliquid voluptas eaque. Quidem facilis sit, dolore assumenda, repellendus expedita aliquam doloribus deleniti dolorem cumque quia et alias, commodi explicabo. Eius alias odit necessitatibus eos facere exercitationem ullam! Eos ipsum, nesciunt atque at, quaerat corporis accusantium libero alias, enim modi magnam repellendus. Voluptas maxime, minus modi quos consectetur voluptatibus provident, quam eligendi enim libero eos consequuntur impedit! Saepe soluta repudiandae at sapiente? Beatae deleniti officiis quibusdam aliquam magnam. Minus dolor doloribus cupiditate eum animi, iste delectus nisi, officiis vitae sunt fuga, quidem accusamus in accusantium vero atque maxime corporis excepturi numquam ea recusandae magnam reiciendis suscipit. Itaque ipsum blanditiis, debitis, quod repudiandae architecto commodi omnis nesciunt veniam molestiae totam! Odio, fugiat amet explicabo sapiente dolore corrupti quia ex voluptas beatae, architecto deleniti est numquam, blanditiis aperiam voluptatibus doloribus magnam delectus sint ratione aut error quo obcaecati quod? Dolor ducimus laboriosam quo non minus voluptate vitae, repellat similique magni placeat adipisci quaerat? Eveniet voluptatibus provident laboriosam at porro ex voluptatum, numquam velit ullam magnam? Voluptate nihil provident quisquam tempora, earum dignissimos neque officiis culpa recusandae nisi libero doloremque modi fuga rem magnam qui eum nulla asperiores tenetur quas optio nam. Magni, omnis unde dolorem minus, fugit voluptatum, itaque culpa consectetur quaerat animi dolore explicabo corrupti totam eveniet quisquam nulla! Maiores necessitatibus, amet illo impedit, dolorem velit, odit neque nihil quo tempore pariatur. Dignissimos, veniam? Suscipit quasi minus atque odio itaque. Aliquid ullam incidunt dolorum fuga numquam quo animi accusamus architecto cumque molestias hic voluptatibus culpa illum laborum earum laboriosam eaque, vero dicta sunt itaque neque voluptates vitae dignissimos eligendi! Facilis corporis cum quisquam dignissimos a quis blanditiis natus, assumenda obcaecati, dolorum nostrum accusamus pariatur molestias aperiam reiciendis culpa repudiandae facere, hic voluptate consectetur inventore expedita nam quae eum. Facilis tempore quo voluptatibus beatae? Non accusamus numquam maiores inventore cumque voluptatum. Facilis culpa explicabo accusamus officia nulla ad est eligendi necessitatibus ea recusandae quisquam assumenda veritatis voluptatibus libero, quis ab alias repudiandae autem et ducimus unde soluta officiis reiciendis! Quo tempora a consequuntur, repellat dignissimos quaerat. Inventore exercitationem perspiciatis quas animi voluptas minima asperiores corporis, eos blanditiis officia reprehenderit atque est modi et consequuntur quasi iure dolorem culpa neque ab rem qui debitis, delectus voluptatibus? Recusandae mollitia doloremque earum quis quasi eligendi distinctio tempora architecto pariatur dolore voluptas sint corrupti perferendis, rem placeat! Dignissimos placeat facilis quidem ea delectus cupiditate laudantium!', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper arcu sed malesuada vestibulum. Sed tristique facilisis lacinia. Ut aliquet lectus justo, ut pulvinar diam sagittis sed. Proin massa ante, congue in sem ac, fermentum dignissim mauri', 1, '2023-12-11', 'papers/CV-Gerind Tershana-Albanian.pdf', '2023-12-01'),
(31, 13, 'Test Title Test Title Test Title Test Title', 'Test User', '\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum mollis tellus in feugiat. Proin lacinia facilisis metus, ut tempus massa lobortis sit amet. Fusce a mollis dui. Etiam at ante quis nisl finibus pharetra pellentesque feugiat lorem. In mauris eros, consectetur ut tellus in, rutrum consectetur sapien. Quisque a congue massa. Ut vel nulla malesuada, ultricies tellus vitae, vestibulum ligula. Pellentesque at molestie diam. Etiam vulputate nibh sed elementum viverra. Nulla facilisi. Pellentesque condimentum luctus aliquet. Donec at pretium orci, ut cursus justo. Suspendisse facilisis nisi libero, at scelerisque neque fringilla vel.\r\n\r\nPraesent vel ante leo. Fusce tincidunt felis eget dictum mattis. Nam lobortis dui id sem posuere bibendum. Sed dignissim magna bibendum condimentum tempus. Vestibulum sodales orci eget sollicitudin aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam iaculis dapibus dictum. Nunc aliquet tellus ut nunc posuere feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam neque lacus, mollis quis bibendum et, commodo et ipsum. Nunc commodo, ex ut porta finibus, eros ex porta tellus, sed sodales orci neque quis ipsum.\r\n\r\nInteger consectetur lobortis risus quis convallis. Praesent sit amet sagittis est, at imperdiet augue. Maecenas lacus turpis, euismod sed vulputate sit amet, fermentum maximus nisi. Maecenas sollicitudin mollis est, at faucibus sapien consequat at. Curabitur eget convallis dui, non pellentesque dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce et tincidunt leo. Curabitur ornare mattis turpis feugiat gravida. Maecenas id vestibulum urna. Donec molestie, augue et facilisis convallis, sapien ex tempor augue, eu dictum justo tellus id nibh. Suspendisse ut augue vestibulum, accumsan ipsum vitae, condimentum purus.\r\n\r\nDonec ut sagittis est. Maecenas justo massa, efficitur et pretium ac, efficitur sed leo. Donec eget pellentesque metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget ultricies ligula, a semper justo. Cras metus libero, scelerisque vitae ex eu, fringilla consequat erat. Aliquam erat volutpat. Pellentesque eu dolor iaculis, posuere lacus ut, dignissim elit.\r\n\r\nMauris in consectetur lacus. Cras sit amet mollis sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras non quam nulla. Morbi lacinia sapien vel mi scelerisque, non consectetur massa tempus. Quisque egestas orci sit amet neque luctus efficitur. Aliquam semper, nisl vitae dignissim pharetra, nibh augue viverra velit, non ornare mauris sapien non nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In tristique quam eget velit maximus tristique. Vivamus efficitur neque nulla, sed malesuada magna imperdiet a. Mauris et ligula vestibulum, tincidunt tellus nec, blandit neque. Morbi venenatis orci eu nisi tempor, sed blandit eros lobortis. Maecenas accumsan in sem a finibus. Nunc sed mattis ipsum. Donec in pharetra purus, ac maximus risus. Cras vulputate, est id commodo tempus, orci ex maximus lectus, nec semper libero ipsum eget lorem. ', '\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum mollis tellus in feugiat. Proin lacinia facilisis metus, ut tempus massa lobortis sit amet. Fusce a mollis dui. Etiam at ante quis nisl finibus pharetra pellentesque feugiat lorem. In mauris eros, consectetur ut tellus in, rutr...', 1, '2024-01-04', 'papers/CV-Gerind Tershana-Albanian.pdf', '2024-01-04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Avatar` varchar(255) NOT NULL DEFAULT 'img/test.png',
  `IsAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `IsSuperuser` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Email`, `Password`, `Avatar`, `IsAdmin`, `IsSuperuser`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin1234', 'https://flowbite.com/docs/images/people/profile-picture-5.jpg', 1, 0),
(2, 'superuser', 'superuser@gmail.com', 'superuser1234', '/logo.png', 0, 0),
(13, 'adminAcc', 'adminAcc@gmail.com', '$2y$10$leabMsDcJYKxqTwCo2RWf.2OQnNXL0bElGT9k8KazUNh27P553HVS', 'img/admin.png', 1, 0),
(14, 'normalAcc', 'normalAcc@gmail.com', '$2y$10$SLI/0038vPZOivOChSz78O.ogUn.Gy6YINBOyQ11xloedDjo.qZ76', 'img/test.png', 0, 0),
(15, 'test', 'test@gmail.com', '$2y$10$7H/6LfqNJVDIobopCduTpei4ByxPN/S/7I/Fwm/FITfXluXYcpPQy', 'img/test.png', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `categorytopaper`
--
ALTER TABLE `categorytopaper`
  ADD PRIMARY KEY (`CategoryID`,`PaperID`),
  ADD KEY `category_fk` (`CategoryID`),
  ADD KEY `paper_fk` (`PaperID`);

--
-- Indexes for table `categorytouser`
--
ALTER TABLE `categorytouser`
  ADD PRIMARY KEY (`CategoryID`,`UserID`),
  ADD KEY `category_fk` (`CategoryID`),
  ADD KEY `user_fk` (`UserID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`CommentID`),
  ADD KEY `fk_comments_user` (`UserID`),
  ADD KEY `fk_comments_paper` (`PaperID`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`UserID`,`PaperID`),
  ADD KEY `user_fk` (`UserID`),
  ADD KEY `paper_fk` (`PaperID`);

--
-- Indexes for table `papers`
--
ALTER TABLE `papers`
  ADD PRIMARY KEY (`PaperID`),
  ADD KEY `fk_papers_user` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `CommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `papers`
--
ALTER TABLE `papers`
  MODIFY `PaperID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_paper` FOREIGN KEY (`PaperID`) REFERENCES `papers` (`PaperID`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `fk_favorite_user` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `papers`
--
ALTER TABLE `papers`
  ADD CONSTRAINT `fk_papers_user` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
