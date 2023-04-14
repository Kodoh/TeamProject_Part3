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
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`group` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Private` TINYINT NOT NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL DEFAULT NULL,
  `Password` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`membership` (
  `User_idUser` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`User_idUser`, `Group_idGroup`),
  INDEX `fk_Membership_User1_idx` (`User_idUser` ASC) VISIBLE,
  INDEX `fk_Messages_Group_idx` (`Group_idGroup` ASC) VISIBLE,
  INDEX `fk_Membership_Group_idx` (`Group_idGroup` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`messages` (
  `idMessages` INT NOT NULL AUTO_INCREMENT,
  `Contents` LONGTEXT NULL DEFAULT NULL,
  `Sender` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`idMessages`, `Sender`, `Group_idGroup`),
  INDEX `fk_Messages_User1_idx` (`Sender` ASC) VISIBLE,
  INDEX `fk_Messages_Group1_idx` (`Group_idGroup` ASC) VISIBLE,
  CONSTRAINT `fk_Messages_Group`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `mydb`.`group` (`idGroup`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Messages_User1`
    FOREIGN KEY (`Sender`)
    REFERENCES `mydb`.`user` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
