-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2022 a las 23:50:55
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `la_bodeguita`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL,
  `id_user` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_products`
--

CREATE TABLE `cart_products` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_product` int(11) NOT NULL,
  `id_cart` varchar(25) NOT NULL,
  `id_product` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cellars`
--

CREATE TABLE `cellars` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cellars`
--

INSERT INTO `cellars` (`id`, `name`) VALUES
(1, 'Malbec'),
(2, 'Santa julia'),
(3, 'Norton');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `id` bigint(10) NOT NULL,
  `name` varchar(25) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(1, 'red'),
(2, 'pink'),
(3, 'black'),
(4, 'white'),
(5, 'green');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL,
  `type` varchar(25) NOT NULL,
  `price` int(11) NOT NULL,
  `alcohol` varchar(20) NOT NULL,
  `sale` tinyint(1) NOT NULL,
  `discount` varchar(20) NOT NULL,
  `size` varchar(8) NOT NULL,
  `image` varchar(50) NOT NULL,
  `id_cellar` varchar(25) NOT NULL,
  `id_color` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `type`, `price`, `alcohol`, `sale`, `discount`, `size`, `image`, `id_cellar`, `id_color`) VALUES
(12, 'Sergio', 'Tinto', 5000, '14.5', 1, '10', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(13, 'Santa Malena', 'Blanco', 9000, '14.3', 0, '15', '750ml', 'Santa-Malena-Rosado.png', '1', ''),
(14, 'Malbec', 'Rosado', 6000, '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '3', ''),
(15, 'Santa Julia', 'Tinto', 6000, '15', 0, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(16, 'Malbec', 'Tinto', 4600, '14.5', 0, '10', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '2', ''),
(17, 'Alma Negra', 'Tinto', 7000, '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(18, 'Malbec', 'Blanco', 6000, '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(19, 'Santa Julia', 'Blanco', 4500, '13.5', 1, '14', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(20, 'Malbec Rosado', 'Rosado', 6000, '14.3', 0, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(21, 'Alma blanca', 'Blanco', 3000, '15.3', 0, '5', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(22, 'Alma Rosada', 'Rosado', 6000, '14.3', 0, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', ''),
(23, 'Santa Julia', 'Rosado', 6000, '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users2`
--

CREATE TABLE `users2` (
  `id` int(20) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `category` varchar(25) NOT NULL DEFAULT 'usuario',
  `image` varchar(50) NOT NULL,
  `id_categories` varchar(25) NOT NULL,
  `id_cart` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cart` (`id_cart`,`id_product`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cellars`
--
ALTER TABLE `cellars`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cellar` (`id_cellar`),
  ADD KEY `id_color` (`id_color`);

--
-- Indices de la tabla `users2`
--
ALTER TABLE `users2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categories` (`id_categories`,`id_cart`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cellars`
--
ALTER TABLE `cellars`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `colors`
--
ALTER TABLE `colors`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `users2`
--
ALTER TABLE `users2`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
