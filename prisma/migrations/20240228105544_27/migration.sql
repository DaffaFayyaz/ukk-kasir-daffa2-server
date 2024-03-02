/*
  Warnings:

  - Added the required column `nama_discount` to the `transactions_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potongan_harga` to the `transactions_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions_items` ADD COLUMN `nama_discount` VARCHAR(255) NOT NULL,
    ADD COLUMN `potongan_harga` INTEGER NOT NULL;
