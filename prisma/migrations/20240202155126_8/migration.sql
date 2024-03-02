/*
  Warnings:

  - You are about to drop the column `deskripksi` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `products` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `deskripksi`,
    DROP COLUMN `url`,
    ADD COLUMN `deskripsi` VARCHAR(255) NOT NULL;
