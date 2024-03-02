-- CreateTable
CREATE TABLE `Discount` (
    `id` VARCHAR(110) NOT NULL,
    `nama_discount` VARCHAR(50) NOT NULL,
    `potongan_harga` INTEGER NOT NULL,
    `tgl_start` DATETIME(3) NOT NULL,
    `tgl_end` DATETIME(3) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
