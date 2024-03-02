/*
  Warnings:

  - You are about to drop the `discount_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `discount_details` DROP FOREIGN KEY `discount_details_id_discount_fkey`;

-- DropForeignKey
ALTER TABLE `discount_details` DROP FOREIGN KEY `discount_details_id_product_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `discount_id` VARCHAR(110) NULL;

-- DropTable
DROP TABLE `discount_details`;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
