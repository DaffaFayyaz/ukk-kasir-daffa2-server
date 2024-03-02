-- AlterTable
ALTER TABLE `products` ADD COLUMN `kategori` ENUM('Makanan', 'Minuman') NOT NULL DEFAULT 'Makanan',
    ADD COLUMN `stock` ENUM('Tersedia', 'Kosong') NOT NULL DEFAULT 'Tersedia';
