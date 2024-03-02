-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `id_meja` VARCHAR(110) NULL;

-- CreateTable
CREATE TABLE `Meja` (
    `id` VARCHAR(110) NOT NULL,
    `no_meja` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_id_meja_fkey` FOREIGN KEY (`id_meja`) REFERENCES `Meja`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
