-- MySQL Script generated by MySQL Workbench
-- Sat May 13 00:29:57 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NULL,
  `email` VARCHAR(50) NULL,
  `joindate` DATE NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`group` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Private` TINYINT NOT NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`membership` (
  `User_idUser` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  INDEX `fk_Membership_Group_idx` (`Group_idGroup` ASC) VISIBLE,
  PRIMARY KEY (`User_idUser`, `Group_idGroup`),
  CONSTRAINT `fk_Membership_Group`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `mydb`.`group` (`idGroup`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Membership_User`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`messages` (
  `idMessages` INT NOT NULL AUTO_INCREMENT,
  `Contents` LONGTEXT NULL,
  `Sender` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`idMessages`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Project` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(50) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  PRIMARY KEY (`project_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Task` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `task_name` CHAR(50) NOT NULL,
  `hoursCompleted` INT NULL,
  `totalManhours` INT NULL,
  `task_status` CHAR(20) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  PRIMARY KEY (`task_id`),
  INDEX `Project_projectid_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `Project_projectid`
    FOREIGN KEY (`project_id`)
    REFERENCES `mydb`.`Project` (`project_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Task_Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Task_Employee` (
  `task_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`task_id`, `employee_id`),
  INDEX `Task_Employee_id_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `Task_Employee_id`
    FOREIGN KEY (`employee_id`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Task_Task_id`
    FOREIGN KEY (`task_id`)
    REFERENCES `mydb`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Team` (
  `team_id` INT NOT NULL AUTO_INCREMENT,
  `team_name` CHAR(50) NOT NULL,
  PRIMARY KEY (`team_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Team_Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Team_Employee` (
  `team_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`team_id`, `employee_id`),
  INDEX `Team_Employee_id_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `Team_Team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `mydb`.`Team` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Team_Employee_id`
    FOREIGN KEY (`employee_id`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Task_Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Task_Team` (
  `task_id` INT NOT NULL,
  `team_id` INT NOT NULL,
  PRIMARY KEY (`task_id`, `team_id`),
  INDEX `Task_Team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `Task_Task_id`
    FOREIGN KEY (`task_id`)
    REFERENCES `mydb`.`Task` (`task_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Task_Team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `mydb`.`Team` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
