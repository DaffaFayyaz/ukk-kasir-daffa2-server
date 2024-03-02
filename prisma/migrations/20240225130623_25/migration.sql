/*
  Warnings:

  - You are about to drop the column `tgl_start` on the `discount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `discount` DROP COLUMN `tgl_start`;

-- AlterTable
ALTER TABLE `users` MODIFY `refresh_token` VARCHAR(500) NULL;
