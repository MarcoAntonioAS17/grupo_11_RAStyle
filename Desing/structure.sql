-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Rastyle
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Rastyle
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Rastyle` DEFAULT CHARACTER SET utf8 ;
USE `Rastyle` ;

-- -----------------------------------------------------
-- Table `Rastyle`.`Colores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Colores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`Tallas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Tallas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`Colecciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Colecciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NULL,
  `CreateAt` DATETIME NULL,
  `UpdateAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`Subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Subcategoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `CreateAt` DATETIME NULL,
  `UpdateAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Productos` (
  `id` VARCHAR(6) NOT NULL,
  `Nombre` VARCHAR(60) NULL,
  `Cantidad` INT NULL,
  `precio` DOUBLE NULL,
  `enOferta` TINYINT(2) NULL,
  `precioOferta` DOUBLE NULL,
  `hotSale` TINYINT(2) NULL,
  `id_Colecciones` INT NOT NULL,
  `id_Categoria` INT NOT NULL,
  `id_Subcategoria` INT NOT NULL,
  `Descripcion` LONGTEXT NULL,
  `CreateAt` DATETIME NULL,
  `UpdateAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Productos_Colecciones1_idx` (`id_Colecciones` ASC),
  INDEX `fk_Productos_Categoria1_idx` (`id_Categoria` ASC),
  INDEX `fk_Productos_Subcategoria1_idx` (`id_Subcategoria` ASC),
  CONSTRAINT `fk_Productos_Colecciones1`
    FOREIGN KEY (`id_Colecciones`)
    REFERENCES `Rastyle`.`Colecciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_Categoria1`
    FOREIGN KEY (`id_Categoria`)
    REFERENCES `Rastyle`.`Categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Productos_Subcategoria1`
    FOREIGN KEY (`id_Subcategoria`)
    REFERENCES `Rastyle`.`Subcategoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`CategoriaUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`CategoriaUsuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`Clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Clientes` (
  `id` VARCHAR(6) NOT NULL,
  `firstName` VARCHAR(60) NOT NULL,
  `lastName` VARCHAR(60) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `id_CategoriaUsuario` INT NOT NULL,
  `image` VARCHAR(100) NULL,
  `cp` INT NULL,
  `calle` VARCHAR(60) NULL,
  `num` VARCHAR(15) NULL,
  `num_inter` VARCHAR(10) NULL,
  `ref` VARCHAR(100) NULL,
  `ciudad` VARCHAR(50) NULL,
  `estado` VARCHAR(50) NULL,
  `pais` VARCHAR(50) NULL,
  `tel` VARCHAR(15) NULL,
  `CreateAt` DATETIME NULL,
  `UpdateAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Clientes_CategoriaUsuario1_idx` (`id_CategoriaUsuario` ASC),
  CONSTRAINT `fk_Clientes_CategoriaUsuario1`
    FOREIGN KEY (`id_CategoriaUsuario`)
    REFERENCES `Rastyle`.`CategoriaUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`Ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`Ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_Clientes` VARCHAR(6) NOT NULL,
  `enCarrito` TINYINT(2) UNSIGNED NULL,
  `CreateAt` DATETIME NULL,
  `UpdateAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Ventas_Clientes1_idx` (`id_Clientes` ASC),
  CONSTRAINT `fk_Ventas_Clientes1`
    FOREIGN KEY (`id_Clientes`)
    REFERENCES `Rastyle`.`Clientes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`DetalleVentas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`DetalleVentas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_Ventas` INT NOT NULL,
  `id_Productos` VARCHAR(6) NOT NULL,
  `cantidad` INT NOT NULL,
  `precio` DOUBLE NOT NULL,
  `CreateAt` DATETIME NULL,
  `UpdateAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_DetalleVentas_Productos1_idx` (`id_Productos` ASC),
  INDEX `fk_DetalleVentas_Ventas1_idx` (`id_Ventas` ASC),
  CONSTRAINT `fk_DetalleVentas_Productos1`
    FOREIGN KEY (`id_Productos`)
    REFERENCES `Rastyle`.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_DetalleVentas_Ventas1`
    FOREIGN KEY (`id_Ventas`)
    REFERENCES `Rastyle`.`Ventas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`FotosProductos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`FotosProductos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_Productos` VARCHAR(6) NOT NULL,
  `path` VARCHAR(100) NOT NULL,
  `CreateAt` DATETIME NULL,
  `UpdateAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_FotosProductos_Productos1_idx` (`id_Productos` ASC),
  CONSTRAINT `fk_FotosProductos_Productos1`
    FOREIGN KEY (`id_Productos`)
    REFERENCES `Rastyle`.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`ColoresProductos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`ColoresProductos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Colores_id` INT NOT NULL,
  `Productos_id` VARCHAR(6) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ColoresProductos_Colores_idx` (`Colores_id` ASC),
  INDEX `fk_ColoresProductos_Productos1_idx` (`Productos_id` ASC),
  CONSTRAINT `fk_ColoresProductos_Colores`
    FOREIGN KEY (`Colores_id`)
    REFERENCES `Rastyle`.`Colores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ColoresProductos_Productos1`
    FOREIGN KEY (`Productos_id`)
    REFERENCES `Rastyle`.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Rastyle`.`TallasProductos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rastyle`.`TallasProductos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Tallas_id` INT NOT NULL,
  `Productos_id` VARCHAR(6) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_TallasProductos_Tallas1_idx` (`Tallas_id` ASC),
  INDEX `fk_TallasProductos_Productos1_idx` (`Productos_id` ASC),
  CONSTRAINT `fk_TallasProductos_Tallas1`
    FOREIGN KEY (`Tallas_id`)
    REFERENCES `Rastyle`.`Tallas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TallasProductos_Productos1`
    FOREIGN KEY (`Productos_id`)
    REFERENCES `Rastyle`.`Productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
