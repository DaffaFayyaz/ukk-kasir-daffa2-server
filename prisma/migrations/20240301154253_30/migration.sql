/*
  Warnings:

  - You are about to drop the column `discount_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_discount_id_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `discount_id`;

-- CreateTable
CREATE TABLE `discount_detail` (
    `id` VARCHAR(110) NOT NULL,
    `id_product` VARCHAR(110) NOT NULL,
    `id_discount` VARCHAR(110) NOT NULL,
    `potongan_harga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `discount_detail` ADD CONSTRAINT `discount_detail_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `discount_detail` ADD CONSTRAINT `discount_detail_id_discount_fkey` FOREIGN KEY (`id_discount`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
