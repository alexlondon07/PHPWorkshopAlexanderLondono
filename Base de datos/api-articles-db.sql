-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Mar 27, 2017 at 07:26 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `api-articles-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `img_route` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `description`, `img_route`, `date`) VALUES
(1, 'Articulo # 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sodales elementum tincidunt. Curabitur varius vitae elit at porttitor. Aliquam ultrices tortor quis varius sodales. Nulla mollis dolor nec ex consectetur egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam  blandit egestas condimentum. ok', '', '2017-03-26 05:00:00'),
(3, 'Articulo # 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sodales elementum tincidunt. Curabitur varius vitae elit at porttitor. Aliquam ultrices tortor quis varius sodales. Nulla mollis dolor nec ex consectetur egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam blandit egestas condimentum.', '', '2017-03-26 05:00:00'),
(4, 'Articulo # 4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sodales elementum tincidunt. Curabitur varius vitae elit at porttitor. Aliquam ultrices tortor quis varius sodales. Nulla mollis dolor nec ex consectetur egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam blandit egestas condimentum.', '', '2017-03-26 05:00:00'),
(5, 'Articulo # 5', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sodales elementum tincidunt. Curabitur varius vitae elit at porttitor. Aliquam ultrices tortor quis varius sodales. Nulla mollis dolor nec ex consectetur egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam blandit egestas condimentum.', '', '2017-03-26 05:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;