/*
  Warnings:

  - Made the column `id_meja` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_id_meja_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `id_meja` VARCHAR(110) NOT NULL;

-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(110) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('Kasir', 'Admin') NOT NULL DEFAULT 'Kasir',
    `refresh_token` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_meja_fkey` FOREIGN KEY (`id_meja`) REFERENCES `Meja`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
