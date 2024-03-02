/*
  Warnings:

  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - Added the required column `deskripksi` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `description`,
    ADD COLUMN `deskripksi` VARCHAR(255) NOT NULL;
