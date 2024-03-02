-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `status_pemesanan` ENUM('Menunggu', 'Diproses', 'Selesai') NOT NULL DEFAULT 'Menunggu';
