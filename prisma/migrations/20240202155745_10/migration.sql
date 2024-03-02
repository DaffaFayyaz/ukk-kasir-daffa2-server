/*
  Warnings:

  - You are about to alter the column `deskripsi` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `deskripsi` VARCHAR(200) NOT NULL;
