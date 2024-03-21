-- DropForeignKey
ALTER TABLE `discount_detail` DROP FOREIGN KEY `discount_detail_id_discount_fkey`;

-- AddForeignKey
ALTER TABLE `discount_detail` ADD CONSTRAINT `discount_detail_id_discount_fkey` FOREIGN KEY (`id_discount`) REFERENCES `Discount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
