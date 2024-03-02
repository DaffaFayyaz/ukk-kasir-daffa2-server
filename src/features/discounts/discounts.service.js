import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

class DiscountService {
    async createDiscount({ nama_discount, potongan_harga, status, tgl_end }) {
        const id = uuidv4();
        return prisma.discount.create({
            data: {
                id,
                nama_discount,
                potongan_harga,
                tgl_end,
            }
        });
    }

    async getDiscounts() {
        return prisma.discount.findMany();
    }

    async getDiscountById(id) {
        return prisma.discount.findUnique({
            where: {
                id
            }
        });
    }

    async deleteDiscount(id) {
        return prisma.discount.delete({
            where: {
                id
            }
        });
    }

    async updateDiscount(id, { nama_discount, potongan_harga, tgl_end }) {
        return prisma.discount.update({
            where: { id },
            data: { nama_discount, potongan_harga, tgl_end, }
        });
    }

    async updateDiscountStatus() {
        const currentDate = new Date();
        const discountsToDelete = await prisma.discount.findMany({
            where: {
                tgl_end: { lt: currentDate }
            }
        });

        console.log('Discounts to Delete:', discountsToDelete);
    
        await Promise.all(discountsToDelete.map(async (discount) => {
            await prisma.discount.delete({
                where: { id: discount.id }
            });
            console.log(`Discount ${discount.id} deleted because tgl_end has passed.`);
        }));
    }
    
}

export const discountService = new DiscountService();
