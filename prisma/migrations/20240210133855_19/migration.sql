/*
  Warnings:

  - Added the required column `id_meja` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `id_meja` VARCHAR(110) NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_meja_fkey` FOREIGN KEY (`id_meja`) REFERENCES `Meja`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
