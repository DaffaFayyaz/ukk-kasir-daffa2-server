import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

class DiscountDetailService {
    async createDiscountDetail({ id_product, id_discount }) {
        const discount = await prisma.discount.findUnique({
            where: { id: id_discount },
            select: { potongan_harga: true }
        });
        const potongan_harga = discount ? discount.potongan_harga : null;
    
        const discountDetails = id_product.map(productId => {
            const id = uuidv4();
            return prisma.discountDetail.create({
                data: {
                    id,
                    product: { connect: { id: productId } },
                    discount: { connect: { id: id_discount } },
                    potongan_harga
                }
            });
        });
    
        return Promise.all(discountDetails);
    }
    

    async updateDiscountDetail(id, { discount_id }) {
        const discount = await prisma.discount.findUnique({
            where: { id: discount_id },
            select: { potongan_harga: true }
        });
        const potongan_harga = discount ? discount.potongan_harga : null;
        
        return prisma.discountDetail.update({
            where: { id },
            data: { discount: { connect: { id: discount_id } }, potongan_harga }
        });
    }

    async getDiscountDetails() {
        return prisma.discountDetail.findMany({
            include: {
                discount: true,
                product: true
            }
        });
    }

    async getDiscountDetailById(id) {
        return prisma.discountDetail.findUnique({
            where: { id },
            include: {
                discount: true
            },
            include: {
                product: true
            }
        });
    }
    

    async deleteDiscountDetail(id) {
        return prisma.discountDetail.delete({
            where: { id }
        });
    }
}

export const discountDetailService = new DiscountDetailService();