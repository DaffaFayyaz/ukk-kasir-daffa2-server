/*
  Warnings:

  - Made the column `id_meja` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_id_meja_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `id_meja` VARCHAR(110) NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_meja_fkey` FOREIGN KEY (`id_meja`) REFERENCES `Meja`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
