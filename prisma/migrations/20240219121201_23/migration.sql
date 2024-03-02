-- CreateTable
CREATE TABLE `discount_details` (
    `id` VARCHAR(110) NOT NULL,
    `id_product` VARCHAR(110) NOT NULL,
    `id_discount` VARCHAR(110) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `discount_details` ADD CONSTRAINT `discount_details_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `discount_details` ADD CONSTRAINT `discount_details_id_discount_fkey` FOREIGN KEY (`id_discount`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
