-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2022 a las 22:29:41
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
(1, 'Rojo'),
(2, 'Rosado'),
(3, 'Negro'),
(4, 'Blanco'),
(5, 'Dorado'),
(6, 'Plateado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `paymentMethod` varchar(25) NOT NULL,
  `shippingMethod` varchar(25) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(10) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL,
  `type` varchar(25) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
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

INSERT INTO `products` (`id`, `name`, `type`, `price`, `description`, `alcohol`, `sale`, `discount`, `size`, `image`, `id_cellar`, `id_color`) VALUES
(12, 'Sergio', 'Tinto', 5000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.5', 1, '10', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '1'),
(13, 'Santa Malena', 'Blanco', 9000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.3', 0, '15', '750ml', 'Santa-Malena-Rosado.png', '1', '2'),
(14, 'Malbec', 'Rosado', 6000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '3', '3'),
(15, 'Santa Julia', 'Tinto', 6000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '15', 0, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '1'),
(16, 'Malbec', 'Tinto', 4600, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.5', 0, '10', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '2', '2'),
(17, 'Alma Negra', 'Tinto', 7000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '4'),
(18, 'Malbec', 'Blanco', 6000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '1'),
(19, 'Santa Julia', 'Blanco', 4500, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '13.5', 1, '14', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '2'),
(20, 'Malbec Rosado', 'Rosado', 6000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.3', 0, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '4'),
(21, 'Alma blanca', 'Blanco', 3000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '15.3', 0, '5', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '3'),
(22, 'Alma Rosada', 'Rosado', 6000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.3', 0, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '2'),
(23, 'Santa Julia', 'Rosado', 6000, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', '14.3', 1, '15', '750ml', 'CADUS-SINGLE-VINEYARD.jpg', '1', '4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users2`
--

CREATE TABLE `users2` (
  `id` int(20) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `direction` varchar(50) NOT NULL,
  `password` varchar(25) NOT NULL,
  `image` varchar(50) NOT NULL,
  `id_categories` int(11) NOT NULL DEFAULT 2,
  `id_cart` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users2`
--

INSERT INTO `users2` (`id`, `name`, `surname`, `email`, `direction`, `password`, `image`, `id_categories`, `id_cart`) VALUES
(4, 'pepe', 'pepino', 'pep@gmail.com', 'pepino 123', '$2a$12$ZrfjGAvEV8YDO/IsP7', '1668652148311_img.webp', 2, ''),
(6, 'esteban', 'porpo', 'esteban@gmail.com', 'esteban 123', '$2a$12$w.Pb75kejePwf.YHgL', '1668828262806_img.webp', 2, ''),
(45, 'sergio', 'picard', 'sergio@gmail.com', 'aragon 305', '$2a$12$yQyr/YfJ4wacBVeYBb', '1668651288298_img.webp', 1, ''),
(97781781, 'martin', 'maine', 'mm123@gmail.com', 'avenida mitre 939', '$2a$12$CufnM0D4Xg99G4Ywn5', '1668628244581_img.png', 1, '');

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
-- Indices de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
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
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `orderitems`
--
ALTER TABLE `orderitems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `users2`
--
ALTER TABLE `users2`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97781782;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;