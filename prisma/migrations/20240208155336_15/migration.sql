-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_id_meja_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `id_meja` VARCHAR(110) NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_meja_fkey` FOREIGN KEY (`id_meja`) REFERENCES `Meja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
