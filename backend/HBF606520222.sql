-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 20, 2020 at 12:31 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HBF606520222`
--

-- --------------------------------------------------------

--
-- Table structure for table `AttendanceTable`
--

CREATE SCHEMA HBF606520222;

USE HBF606520222;

CREATE TABLE `AttendanceTable` (
  `AttendanceID` bigint(20) UNSIGNED NOT NULL,
  `StudentID` int(10) UNSIGNED NOT NULL,
  `LectureID` bigint(20) UNSIGNED NOT NULL,
  `AttendanceDate` datetime DEFAULT current_timestamp(),
  `Confirmation` tinyint(1) DEFAULT 0,
  `ReasonIfAbsent` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `AttendanceTable`
--

INSERT INTO `AttendanceTable` (`AttendanceID`, `StudentID`, `LectureID`, `AttendanceDate`, `Confirmation`, `ReasonIfAbsent`) VALUES
(1, 60652022, 1, '2020-12-19 14:43:30', 0, 0),
(2, 60652022, 3, '2020-12-19 14:43:30', 0, 0),
(3, 60652022, 4, '2020-12-19 14:43:30', 0, 0),
(4, 18992022, 1, '2020-12-19 14:43:30', 1, 0),
(5, 18992022, 3, '2020-12-19 14:43:30', 0, 0),
(6, 18992022, 4, '2020-12-19 14:43:30', 0, 0),
(7, 98742022, 3, '2020-12-19 14:43:30', 0, 0),
(8, 98742022, 3, '2020-12-19 14:43:30', 0, 0),
(9, 98742022, 2, '2020-12-19 14:43:30', 0, 0),
(10, 78942022, 3, '2020-12-19 14:43:30', 0, 0),
(11, 78942022, 4, '2020-12-19 14:43:30', 0, 0),
(12, 78942022, 1, '2020-12-19 14:43:30', 0, 0),
(13, 14632022, 3, '2020-12-19 14:43:30', 0, 0),
(14, 14632022, 4, '2020-12-19 14:43:30', 0, 0),
(15, 14632022, 5, '2020-12-19 14:43:30', 0, 0),
(16, 98652022, 4, '2020-12-19 14:43:30', 0, 0),
(17, 98652022, 5, '2020-12-19 14:43:30', 0, 0),
(18, 60652022, 22, '2020-12-20 08:24:29', 0, 0),
(19, 60652022, 22, '2020-12-20 08:32:03', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

CREATE TABLE `Courses` (
  `CourseID` varchar(10) NOT NULL,
  `DepartmentCode` varchar(10) NOT NULL,
  `CourseName` varchar(50) NOT NULL,
  `Credit` enum('Full','Half') DEFAULT NULL,
  `CreditHours` decimal(5,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Courses`
--

INSERT INTO `Courses` (`CourseID`, `DepartmentCode`, `CourseName`, `Credit`, `CreditHours`) VALUES
('BUSA 222', 'BA', 'Intro to Finance', 'Full', '4.0'),
('CS 221', 'CSIS', 'Discrete Structures', 'Full', '4.0'),
('CS 222', 'CSIS', 'Data Structures', 'Full', '4.0'),
('ECON 102', 'BA', 'Microeconomics', 'Full', '4.0'),
('ENG 221', 'ENG', 'Physics I: Mechanic', 'Full', '4.0'),
('MATH 221', 'CSIS', 'Statistics with probability', 'Full', '4.0'),
('SOAN 221', 'HSS', 'Leadership II', 'Half', '1.5');

-- --------------------------------------------------------

--
-- Table structure for table `Departments`
--

CREATE TABLE `Departments` (
  `DepartmentCode` varchar(10) NOT NULL,
  `DepartmentName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Departments`
--

INSERT INTO `Departments` (`DepartmentCode`, `DepartmentName`) VALUES
('BA', 'Business Administration'),
('CSIS', 'Computer Science and Information System'),
('ENG', 'Engineering'),
('HSS', 'Humanities and Social Sciences');

-- --------------------------------------------------------

--
-- Table structure for table `Department_HOD`
--

CREATE TABLE `Department_HOD` (
  `HOD_Date` datetime DEFAULT current_timestamp(),
  `DepartmentCode` varchar(10) NOT NULL,
  `FacultyID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Department_HOD`
--

INSERT INTO `Department_HOD` (`HOD_Date`, `DepartmentCode`, `FacultyID`) VALUES
('2020-12-19 14:43:29', 'ENG', 'ASF95631'),
('2020-12-19 14:43:29', 'CSIS', 'ASF96351'),
('2020-12-19 14:43:29', 'BA', 'ASF88925'),
('2020-12-19 14:43:29', 'HSS', 'ASF80631');

-- --------------------------------------------------------

--
-- Table structure for table `Faculty`
--

CREATE TABLE `Faculty` (
  `FacultyID` varchar(10) NOT NULL,
  `SSN` varchar(20) DEFAULT NULL,
  `DepartmentCode` varchar(10) NOT NULL,
  `FName` varchar(50) NOT NULL,
  `LName` varchar(50) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Gender` enum('M','F','O') DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `Level_of_Education` varchar(50) DEFAULT NULL,
  `Speciality` varchar(70) DEFAULT NULL,
  `Role` enum('FULLTIME','ADJUNCT') DEFAULT NULL,
  `AshesiEmail` varchar(70) NOT NULL,
  `nonAshesiEmail` varchar(70) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `FacialData` varchar(100) DEFAULT NULL,
  `PasswordC` varchar(100) DEFAULT NULL,
  `Registered` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Faculty`
--

INSERT INTO `Faculty` (`FacultyID`, `SSN`, `DepartmentCode`, `FName`, `LName`, `DOB`, `Gender`, `Nationality`, `Level_of_Education`, `Speciality`, `Role`, `AshesiEmail`, `nonAshesiEmail`, `PhoneNumber`, `FacialData`, `PasswordC`, `Registered`) VALUES
('ASF80631', 'GH78995631', 'HSS', 'Pashington', 'Obeng', '1965-05-23', 'M', 'Ghanaian', 'Doctorate', 'Anthropology of Religion & Cultural Communication', 'FULLTIME', 'pobeng@ashesi.edu.gh', NULL, '0578915985', 'images/ASF80631f.jpg', NULL, 0),
('ASF88925', 'GH78889212', 'BA', 'Stephen', 'Armah', '1970-12-13', 'M', 'Ghanaian', 'Doctorate', ' Agricultural Economics', 'FULLTIME', 'searmah@ashesi.edu.gh', NULL, '0205689741', 'images/ASF88925f.jpg', NULL, 0),
('ASF95631', 'GH78945612', 'ENG', 'Nathan', 'Amanquah', '1974-06-13', 'M', 'Ghanaian', 'Doctorate', 'Electrical and Electronic Engineering', 'FULLTIME', 'namanquah@ashesi.edu.gh', NULL, '0248974563', 'images/ASF95631f.jpg', NULL, 0),
('ASF96351', 'GH78980212', 'CSIS', 'Ayorkor', 'Korsah', '1978-02-23', 'F', 'Ghanaian', 'Doctorate', 'Robotics and Artificial Intelligence', 'FULLTIME', 'akorsah@ashesi.edu.gh', NULL, '0245698569', 'images/ASF96351f.jpg', NULL, 0),
('ASF97003', 'GH78005612', 'CSIS', 'Stephane', 'Nwolley', '1985-05-23', 'M', 'Togolese', 'Doctorate', 'ICT Management (Big Data)', 'FULLTIME', 'snwolley@ashesi.edu.gh', NULL, '0244074563', 'images/ASF97003f.jpg', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `FacultyIntern`
--

CREATE TABLE `FacultyIntern` (
  `FacultyIntern_ID` varchar(10) NOT NULL,
  `FName` varchar(50) NOT NULL,
  `LName` varchar(50) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Gender` enum('M','F','O') DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `Level_of_Education` varchar(50) DEFAULT NULL,
  `Speciality` varchar(70) DEFAULT NULL,
  `AshesiEmail` varchar(70) NOT NULL,
  `nonAshesiEmail` varchar(70) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `FacialData` varchar(100) NOT NULL,
  `PasswordC` varchar(100) DEFAULT NULL,
  `Registered` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `FacultyIntern`
--

INSERT INTO `FacultyIntern` (`FacultyIntern_ID`, `FName`, `LName`, `DOB`, `Gender`, `Nationality`, `Level_of_Education`, `Speciality`, `AshesiEmail`, `nonAshesiEmail`, `PhoneNumber`, `FacialData`, `PasswordC`, `Registered`) VALUES
('ASFI2013', 'Elvis', 'Okoh-Asirifi', '1992-10-11', 'M', 'Ghanaian', 'Degree', 'Computer Science', 'e@ashesi.edu.gh', NULL, '0248974563', 'images/ASFI2013f.jpg', NULL, 0),
('ASFI5631', 'Araba', 'Toffah', '1995-10-13', 'F', 'Ghanaian', 'Degree', 'Management Information Systems', 'atoffah@ashesi.edu.gh', NULL, '0558974563', 'images/ASFI5631f.jpg', NULL, 0),
('ASFI5681', 'Emmanuel', 'Jojo', '1996-06-05', 'M', 'Ghanaian', 'Degree', 'Computer Science', 'jemma@ashesi.edu.gh', NULL, '0248974563', 'images/ASFI5681f.jpg', NULL, 0),
('ASFI5861', 'Emmanuel', 'Agamah', '1996-11-01', 'M', 'Ghanaian', 'Degree', 'Business Administration', 'eagamah@ashesi.edu.gh', NULL, '0275974563', 'images/ASFI5861f.jpg', NULL, 0),
('ASFI5890', 'Prince', 'Aduama', '1993-10-13', 'M', 'Ghanaian', 'Degree', 'Electrical and Electronic Engineering', 'namanquah@ashesi.edu.gh', NULL, '0248974563', 'images/ASFI5890f.jpg', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Lectures`
--

CREATE TABLE `Lectures` (
  `Id` bigint(20) UNSIGNED NOT NULL,
  `Lecture` varchar(100) DEFAULT NULL,
  `LectureDate` datetime DEFAULT NULL,
  `LectureTime` int(11) DEFAULT NULL,
  `CourseID` varchar(10) NOT NULL,
  `FacultyID` varchar(10) NOT NULL,
  `FacultyIntern_ID` varchar(10) NOT NULL,
  `NumWeek` varchar(10) DEFAULT NULL,
  `ZoomLink` varchar(100) DEFAULT NULL,
  `ZoomMeetingId` int(10) UNSIGNED DEFAULT NULL,
  `ZoomPassword` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Lectures`
--

INSERT INTO `Lectures` (`Id`, `Lecture`, `LectureDate`, `LectureTime`, `CourseID`, `FacultyID`, `FacultyIntern_ID`, `NumWeek`, `ZoomLink`, `ZoomMeetingId`, `ZoomPassword`) VALUES
(1, 'Lecture Nine', '1753-01-01 00:00:00', 1608847080, 'CS 222', 'ASF95631', 'ASFI5681', '9', 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(2, 'Lecture Ten', '1753-01-01 00:00:00', 1608847080, 'CS 222', 'ASF95631', 'ASFI5681', '10', 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(3, NULL, '1753-01-01 00:00:00', 1608847080, 'SOAN 221', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(4, NULL, '1753-01-01 00:00:00', 1608847080, 'MATH 221', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(5, NULL, '1753-01-01 00:00:00', 1608847080, 'MATH 221', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(6, NULL, '1753-01-01 00:00:00', 1608847080, 'ECON 102', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(7, NULL, '1753-01-01 00:00:00', 1608847080, 'ECON 102', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(8, NULL, '1753-01-01 00:00:00', 1608847080, 'BUSA 222', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(9, NULL, '1753-01-01 00:00:00', 1608847080, 'BUSA 222', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(10, NULL, '1753-01-01 00:00:00', 1608847080, 'CS 221', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(11, NULL, '1753-01-01 00:00:00', 1608847080, 'CS 221', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(12, NULL, '1753-01-01 00:00:00', 1608847080, 'ENG 221', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(13, NULL, '1753-01-01 00:00:00', 1608847080, 'ENG 221', 'ASF95631', 'ASFI5681', NULL, 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(14, 'Lecture Intro', NULL, 1608847080, 'CS 222', 'ASF95631', 'ASFI5681', '0', 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(15, 'Lecture One', NULL, 1608847080, 'CS 222', 'ASF95631', 'ASFI5681', '1', 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(16, 'Lecture Two', NULL, 1608847080, 'CS 222', 'ASF95631', 'ASFI5681', '2', 'https://ashesi.zoom.us/j/5775287068', NULL, NULL),
(22, 'Lecture Eight', NULL, 1608847080, 'CS 222', 'ASF95631', 'ASFI5681', '8', 'https://ashesi.zoom.us/j/5775287068', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Registered_Courses`
--

CREATE TABLE `Registered_Courses` (
  `RegistrationID` bigint(20) UNSIGNED NOT NULL,
  `StudentID` int(10) UNSIGNED NOT NULL,
  `CourseID` varchar(10) NOT NULL,
  `FacultyID` varchar(10) NOT NULL,
  `FacultyIntern_ID` varchar(10) NOT NULL,
  `Registered_Date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Registered_Courses`
--

INSERT INTO `Registered_Courses` (`RegistrationID`, `StudentID`, `CourseID`, `FacultyID`, `FacultyIntern_ID`, `Registered_Date`) VALUES
(1, 60652022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(2, 60652022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(3, 60652022, 'ECON 102', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(4, 18992022, 'ENG 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(5, 18992022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(6, 18992022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(7, 98742022, 'ENG 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(8, 98742022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(9, 98742022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(10, 78942022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(11, 78942022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(12, 78942022, 'ECON 102', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(13, 14632022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(14, 14632022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(15, 14632022, 'ECON 102', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(16, 98652022, 'ENG 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(17, 98652022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(18, 98652022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(19, 78212022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(20, 78212022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(21, 78212022, 'ECON 102', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(22, 89322022, 'SOAN 221', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(23, 89322022, 'CS 222', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29'),
(24, 89322022, 'ECON 102', 'ASF95631', 'ASFI5681', '2020-12-19 14:43:29');

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `StudentID` int(10) UNSIGNED NOT NULL,
  `FName` varchar(50) NOT NULL,
  `LName` varchar(50) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Gender` enum('M','F','O') DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `Major` varchar(50) NOT NULL,
  `YearGroup` year(4) NOT NULL,
  `AshesiEmail` varchar(100) NOT NULL,
  `nonAshesiEmail` varchar(70) DEFAULT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `FacialData` varchar(100) DEFAULT NULL,
  `PasswordC` varchar(100) DEFAULT NULL,
  `Registered` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`StudentID`, `FName`, `LName`, `DOB`, `Gender`, `Nationality`, `Major`, `YearGroup`, `AshesiEmail`, `nonAshesiEmail`, `PhoneNumber`, `FacialData`, `PasswordC`, `Registered`) VALUES
(14632022, 'Agyemang', 'Kweku', '1999-12-06', 'M', 'Ghanaian', 'Management Information Systems', 2022, 'Agyemang.Kweku@ashesi.edu.gh', 'Agyemangk@gmail.com', '233508523697', 'images/14632022f.jpg', NULL, 0),
(17452022, 'James', 'Konney', '1999-11-06', 'M', 'Nigerian', 'Business Administration', 2022, 'James.Konney@ashesi.edu.gh', 'Jamesk@gmail.com', '233570008098', 'images/17452022f.jpg', NULL, 0),
(18992022, 'Akwesi', 'Kynx', '2000-08-05', 'M', 'Ghanaian', 'Computer Engineering', 2022, 'akwesi.Kynx@ashesi.edu.gh', 'AKynx@gmail.com', '233248808098', 'images/18992022f.jpg', NULL, 0),
(60652022, 'Hussein', 'Fuseini', '1998-09-06', 'M', 'Ghanaian', 'Computer Science', 2022, 'hussein.fuseini@ashesi.edu.gh', 'fuseinial@gmail.com', '233508808098', 'images/60652022f.jpg', NULL, 0),
(78212022, 'Philip', 'James', '1998-01-16', 'M', 'Ghanaian', 'Computer Science', 2022, 'Philip.James@ashesi.edu.gh', 'JPhilip@gmail.com', '23357895621', 'images/78212022f.jpg', NULL, 0),
(78942022, 'Kelvin', 'Akoffu', '1998-11-11', 'M', 'Ghanaian', 'Computer Science', 2022, 'Kelvin.Akoffu@ashesi.edu.gh', 'AkKel@gmail.com', '233509632741', 'images/78942022f.jpg', NULL, 0),
(89322022, 'Umar', 'Sanda', '1996-06-06', 'M', 'Ghanaian', 'Computer Science', 2022, 'Umar.Sanda@ashesi.edu.gh', 'UmarSanda@gmail.com', '233557891235', 'images/89322022f.jpg', NULL, 0),
(96322022, 'Osman', 'Ali', '1994-07-06', 'M', 'Ghanaian', 'Computer Science', 2022, 'Osman.Ali@ashesi.edu.gh', 'AliO@gmail.com', '233247845121', 'images/96322022f.jpg', NULL, 0),
(98652022, 'Abena', 'Ofosu', '1998-01-01', 'F', 'Ghanaian', 'Electrical Engineering', 2022, 'Abena.Ofosu@ashesi.edu.gh', 'AbenaO@gmail.com', '233201108098', 'images/98652022f.jpg', NULL, 0),
(98742022, 'Kevin', 'Hynnes', '2001-05-06', 'M', 'Ghanaian', 'Mechanical Engineering', 2022, 'Kevin.Hynnes@ashesi.edu.gh', 'KevinHy@gmail.com', '233268462571', 'images/98742022f.jpg', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `access_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AttendanceTable`
--
ALTER TABLE `AttendanceTable`
  ADD PRIMARY KEY (`AttendanceID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `LectureID` (`LectureID`);

--
-- Indexes for table `Courses`
--
ALTER TABLE `Courses`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `DepartmentCode` (`DepartmentCode`);

--
-- Indexes for table `Departments`
--
ALTER TABLE `Departments`
  ADD PRIMARY KEY (`DepartmentCode`);

--
-- Indexes for table `Department_HOD`
--
ALTER TABLE `Department_HOD`
  ADD KEY `DepartmentCode` (`DepartmentCode`),
  ADD KEY `FacultyID` (`FacultyID`);

--
-- Indexes for table `Faculty`
--
ALTER TABLE `Faculty`
  ADD PRIMARY KEY (`FacultyID`),
  ADD UNIQUE KEY `AshesiEmail` (`AshesiEmail`),
  ADD UNIQUE KEY `SSN` (`SSN`),
  ADD UNIQUE KEY `nonAshesiEmail` (`nonAshesiEmail`),
  ADD UNIQUE KEY `FacialData` (`FacialData`),
  ADD KEY `DepartmentCode` (`DepartmentCode`);

--
-- Indexes for table `FacultyIntern`
--
ALTER TABLE `FacultyIntern`
  ADD PRIMARY KEY (`FacultyIntern_ID`),
  ADD UNIQUE KEY `AshesiEmail` (`AshesiEmail`),
  ADD UNIQUE KEY `FacialData` (`FacialData`),
  ADD UNIQUE KEY `nonAshesiEmail` (`nonAshesiEmail`);

--
-- Indexes for table `Lectures`
--
ALTER TABLE `Lectures`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `FacultyID` (`FacultyID`),
  ADD KEY `FacultyIntern_ID` (`FacultyIntern_ID`);

--
-- Indexes for table `Registered_Courses`
--
ALTER TABLE `Registered_Courses`
  ADD PRIMARY KEY (`RegistrationID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `FacultyID` (`FacultyID`),
  ADD KEY `FacultyIntern_ID` (`FacultyIntern_ID`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`StudentID`),
  ADD UNIQUE KEY `AshesiEmail` (`AshesiEmail`),
  ADD UNIQUE KEY `nonAshesiEmail` (`nonAshesiEmail`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AttendanceTable`
--
ALTER TABLE `AttendanceTable`
  MODIFY `AttendanceID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `Lectures`
--
ALTER TABLE `Lectures`
  MODIFY `Id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Registered_Courses`
--
ALTER TABLE `Registered_Courses`
  MODIFY `RegistrationID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AttendanceTable`
--
ALTER TABLE `AttendanceTable`
  ADD CONSTRAINT `AttendanceTable_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`),
  ADD CONSTRAINT `AttendanceTable_ibfk_2` FOREIGN KEY (`LectureID`) REFERENCES `Lectures` (`Id`);

--
-- Constraints for table `Courses`
--
ALTER TABLE `Courses`
  ADD CONSTRAINT `Courses_ibfk_1` FOREIGN KEY (`DepartmentCode`) REFERENCES `Departments` (`DepartmentCode`);

--
-- Constraints for table `Department_HOD`
--
ALTER TABLE `Department_HOD`
  ADD CONSTRAINT `Department_HOD_ibfk_1` FOREIGN KEY (`DepartmentCode`) REFERENCES `Departments` (`DepartmentCode`),
  ADD CONSTRAINT `Department_HOD_ibfk_2` FOREIGN KEY (`FacultyID`) REFERENCES `Faculty` (`FacultyID`);

--
-- Constraints for table `Faculty`
--
ALTER TABLE `Faculty`
  ADD CONSTRAINT `Faculty_ibfk_1` FOREIGN KEY (`DepartmentCode`) REFERENCES `Departments` (`DepartmentCode`);

--
-- Constraints for table `Lectures`
--
ALTER TABLE `Lectures`
  ADD CONSTRAINT `Lectures_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Courses` (`CourseID`),
  ADD CONSTRAINT `Lectures_ibfk_2` FOREIGN KEY (`FacultyID`) REFERENCES `Faculty` (`FacultyID`),
  ADD CONSTRAINT `Lectures_ibfk_3` FOREIGN KEY (`FacultyIntern_ID`) REFERENCES `FacultyIntern` (`FacultyIntern_ID`);

--
-- Constraints for table `Registered_Courses`
--
ALTER TABLE `Registered_Courses`
  ADD CONSTRAINT `Registered_Courses_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`),
  ADD CONSTRAINT `Registered_Courses_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Courses` (`CourseID`),
  ADD CONSTRAINT `Registered_Courses_ibfk_3` FOREIGN KEY (`FacultyID`) REFERENCES `Faculty` (`FacultyID`),
  ADD CONSTRAINT `Registered_Courses_ibfk_4` FOREIGN KEY (`FacultyIntern_ID`) REFERENCES `FacultyIntern` (`FacultyIntern_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
