/*
  Warnings:

  - Added the required column `deskripksi` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `deskripksi` VARCHAR(255) NOT NULL,
    ADD COLUMN `url` VARCHAR(255) NOT NULL;
