/*
  Warnings:

  - You are about to drop the column `deskripksi` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `deskripksi`,
    DROP COLUMN `url`;
