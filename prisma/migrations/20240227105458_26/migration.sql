-- AlterTable
ALTER TABLE `discount` ADD COLUMN `status` ENUM('Berlaku', 'Expired') NOT NULL DEFAULT 'Berlaku';
