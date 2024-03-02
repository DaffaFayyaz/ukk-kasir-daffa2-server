/*
  Warnings:

  - You are about to drop the column `id_meja` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_id_meja_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `id_meja`;
