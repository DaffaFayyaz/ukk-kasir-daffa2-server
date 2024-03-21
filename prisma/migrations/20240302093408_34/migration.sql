/*
  Warnings:

  - You are about to drop the column `finish_redirect_url` on the `transactionnotif` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transactionnotif` DROP COLUMN `finish_redirect_url`,
    ADD COLUMN `acquirer` VARCHAR(191) NULL,
    ADD COLUMN `currency` VARCHAR(191) NULL,
    ADD COLUMN `expiry_time` DATETIME(3) NULL,
    ADD COLUMN `issuer` VARCHAR(191) NULL,
    ADD COLUMN `merchant_id` VARCHAR(191) NULL,
    ADD COLUMN `reference_id` VARCHAR(191) NULL,
    ADD COLUMN `signature_key` VARCHAR(191) NULL,
    ADD COLUMN `status_message` VARCHAR(191) NULL,
    ADD COLUMN `transaction_type` VARCHAR(191) NULL;
