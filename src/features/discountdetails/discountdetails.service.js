import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

class DiscountDetailService {
    async createDiscountDetail({id_product, id_discount}) {
        const id = uuidv4();
        const discount = await prisma.discount.findUnique({
            where: {id: id_discount},
            select: {potongan_harga: true}
        });
        const potongan_harga = discount ? discount.potongan_harga : null;

        return prisma.discountDetail.create({
            data: {
                id,
                product: {connect: {id: id_product}},
                discount: {connect: {id: id_discount}},
                potongan_harga
            }
        });
    }

    async updateDiscountDetail(id, { discount_id }) {
        // Fetch the discount to get potongan_harga
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
                discount: true
            }
        });
    }

    async getDiscountDetailById(id) {
        return prisma.discountDetail.findUnique({
            where: { id },
            include: {
                discount: true
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