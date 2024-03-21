-- CreateTable
CREATE TABLE `TransactionNotif` (
    `id` VARCHAR(110) NOT NULL,
    `id_transaction_midtrans` VARCHAR(110) NULL,
    `payment_method` VARCHAR(110) NULL,
    `transaction_time` DATETIME(3) NULL,
    `order_id` VARCHAR(110) NULL,
    `finish_redirect_url` VARCHAR(191) NULL,
    `fraud_status` VARCHAR(191) NULL,
    `status_code` VARCHAR(191) NULL,
    `gross_amount` VARCHAR(191) NULL,

    UNIQUE INDEX `TransactionNotif_order_id_key`(`order_id`),
    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionNotif` ADD CONSTRAINT `TransactionNotif_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
