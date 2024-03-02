-- DropForeignKey
ALTER TABLE `transactions_items` DROP FOREIGN KEY `transactions_items_ibfk_1`;

-- AddForeignKey
ALTER TABLE `transactions_items` ADD CONSTRAINT `transactions_items_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
