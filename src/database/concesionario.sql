-- Borrar tablas si existen
DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS fabricantes;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS usuarios;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `concesionario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre_cli` varchar(100) NOT NULL,
  `direccion_cli` varchar(200) NOT NULL,
  `telefono_cli` varchar(12) NOT NULL,
  `fechanac_cli` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_cliente` int(11) NOT NULL,
  `id_vehiculo` int(11) NOT NULL,
  `fecha_compra` datetime NOT NULL,
  `precio_compra` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fabricantes`
--

CREATE TABLE `fabricantes` (
  `id_fabricante` int(11) NOT NULL,
  `nombre_fab` varchar(100) NOT NULL,
  `direccion_fab` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `password_user` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id_vehiculo` int(11) NOT NULL,
  `nombre_veh` varchar(100) NOT NULL,
  `unidades_veh` int(11) NOT NULL,
  `precio_veh` decimal(10,2) NOT NULL,
  `id_fabricante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_cliente`,`id_vehiculo`,`fecha_compra`),
  ADD KEY `id_vehiculo` (`id_vehiculo`);

--
-- Indices de la tabla `fabricantes`
--
ALTER TABLE `fabricantes`
  ADD PRIMARY KEY (`id_fabricante`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `usuarios_email_user_unique` (`email_user`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id_vehiculo`),
  ADD KEY `id_fabricante` (`id_fabricante`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fabricantes`
--
ALTER TABLE `fabricantes`
  MODIFY `id_fabricante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id_vehiculo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculos` (`id_vehiculo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`id_fabricante`) REFERENCES `fabricantes` (`id_fabricante`) ON DELETE CASCADE ON UPDATE CASCADE;


-- Volcado de datos para la tabla `usuarios`
--
-- La contraseña de todos los usuarios es 'Password_123' hasheada con bcrypt
INSERT INTO `usuarios` (`id_user`, `email_user`, `password_user`) VALUES
(1, 'ana@email.com', '$2b$10$mSODO56ckl.K1p9sJxYg8Opty7.KRKluVzUpHywKcAeL7DArN3UMm'),
(2, 'luis@email.com', '$2b$10$mSODO56ckl.K1p9sJxYg8Opty7.KRKluVzUpHywKcAeL7DArN3UMm'),
(3, 'marta@email.com', '$2b$10$mSODO56ckl.K1p9sJxYg8Opty7.KRKluVzUpHywKcAeL7DArN3UMm'),
(4, 'carlos@email.com', '$2b$10$mSODO56ckl.K1p9sJxYg8Opty7.KRKluVzUpHywKcAeL7DArN3UMm'),
(5, 'elena@email.com', '$2b$10$mSODO56ckl.K1p9sJxYg8Opty7.KRKluVzUpHywKcAeL7DArN3UMm');
--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre_cli`, `direccion_cli`, `telefono_cli`, `fechanac_cli`) VALUES
(1, 'Ana López', 'Calle Sol 1', '612345678', '1990-05-10'),
(2, 'Luis Pérez', 'Av. Luna 2', '622345679', '1985-03-15'),
(3, 'Marta Ruiz', 'Calle Mar 3', '632345680', '1978-11-22'),
(4, 'Carlos Gómez', 'Av. Río 4', '642345681', '2000-07-30'),
(5, 'Elena Torres', 'Av. Castilla 8', '699999999', '1995-09-18'),
(6, 'Elena Torres', 'Plaza Mayor 12', '688888888', '1992-04-22');

--
-- Volcado de datos para la tabla `fabricantes`
--

INSERT INTO `fabricantes` (`id_fabricante`, `nombre_fab`, `direccion_fab`) VALUES
(1, 'Toyota', 'Av. Japón 123'),
(2, 'Renault', 'Calle Francia 45'),
(3, 'Ford', 'Av. América 67'),
(4, 'Volkswagen', 'Calle Alemania 89'),
(5, 'Seat', 'Av. España 10');

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id_vehiculo`, `nombre_veh`, `unidades_veh`, `precio_veh`, `id_fabricante`) VALUES
(1, 'Corolla', 10, 18000.00, 1),
(2, 'Clio', 15, 12000.00, 2),
(3, 'Focus', 8, 17000.00, 3),
(4, 'Golf', 12, 21000.00, 4),
(5, 'Ibiza', 20, 13000.00, 5),
(6, 'Yaris', 8, 16000.00, 1),
(7, 'RAV4', 5, 32000.00, 1),
(8, 'Megane', 10, 18000.00, 2),
(9, 'Kangoo', 7, 14000.00, 2),
(10, 'Mondeo', 6, 25000.00, 3),
(11, 'Puma', 9, 22000.00, 3),
(12, 'Polo', 11, 17000.00, 4),
(13, 'Passat', 4, 28000.00, 4),
(14, 'Leon', 13, 19000.00, 5),
(15, 'Ateca', 6, 24000.00, 5),
(16, 'Supra', 3, 45000.00, 1),
(17, 'Twingo', 5, 11000.00, 2);

-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id_cliente`, `id_vehiculo`, `fecha_compra`, `precio_compra`) VALUES
(1, 1, '2026-01-15', 18540.00),
(1, 2, '2026-02-07', 12360.00),
(1, 2, '2026-02-20', 12360.00),
(1, 8, '2026-01-29', 18540.00),
(1, 10, '2026-01-25', 25750.00),
(1, 12, '2026-01-21', 17510.00),
(1, 14, '2026-01-17', 19570.00),
(2, 1, '2026-02-06', 18540.00),
(2, 1, '2026-03-10', 18540.00),
(2, 2, '2026-02-05', 12360.00),
(2, 2, '2026-05-05', 12360.00),
(2, 3, '2026-02-04', 17510.00),
(2, 6, '2026-02-01', 16480.00),
(2, 8, '2026-01-28', 18540.00),
(2, 10, '2026-01-24', 25750.00),
(2, 12, '2026-01-20', 17510.00),
(2, 14, '2026-01-16', 19570.00),
(3, 3, '2026-01-19', 28840.00),
(3, 3, '2026-02-03', 17510.00),
(3, 7, '2026-01-31', 32960.00),
(3, 9, '2026-01-27', 14420.00),
(3, 11, '2026-01-23', 22660.00),
(3, 13, '2026-01-19', 28840.00),
(3, 15, '2026-01-15', 24720.00),
(4, 4, '2026-02-02', 21630.00),
(4, 7, '2026-01-30', 32960.00),
(4, 9, '2026-01-26', 14420.00),
(4, 11, '2026-01-22', 22660.00),
(4, 13, '2026-01-18', 28840.00),
(4, 15, '2026-01-14', 24720.00),
(5, 4, '2026-01-13', 21630.00),
(5, 5, '2026-01-12', 13390.00),
(5, 6, '2026-01-11', 16480.00),
(5, 7, '2026-01-10', 32960.00),
(5, 13, '2026-01-09', 28840.00),
(6, 5, '2026-01-08', 13390.00),
(6, 8, '2026-01-07', 18540.00),
(6, 9, '2026-01-06', 14420.00),
(6, 11, '2026-01-05', 22660.00),
(6, 15, '2026-01-04', 24720.00),
(6, 16, '2026-01-03', 45200.00),
(5, 16, '2026-01-02', 45100.00),
(4, 17, '2026-01-01', 11200.00),
(3, 17, '2026-01-02', 11100.00),
(2, 12, '2026-01-03', 17500.00),
(1, 12, '2026-01-04', 17400.00),
(5, 6, '2026-01-03', 16500.00),
(3, 6, '2026-01-04', 16400.00),
(4, 5, '2026-01-05', 13400.00),
(2, 5, '2026-01-06', 13300.00),
(1, 7, '2026-01-07', 33000.00),
(6, 7, '2026-01-08', 32900.00),
(2, 8, '2026-01-09', 18600.00),
(3, 8, '2026-01-10', 18500.00),
(4, 9, '2026-01-11', 14500.00),
(5, 9, '2026-01-12', 14400.00),
(1, 10, '2026-01-13', 25100.00),
(2, 10, '2026-01-14', 25000.00),
(3, 11, '2026-01-15', 22700.00),
(4, 11, '2026-01-16', 22600.00),
(5, 13, '2026-01-17', 28900.00),
(6, 13, '2026-01-18', 28800.00),
(1, 14, '2026-01-19', 19600.00),
(2, 14, '2026-01-20', 19500.00),
(3, 15, '2026-01-21', 24800.00),
(4, 15, '2026-01-22', 24700.00);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
