import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class MejaService {
    async createMeja({ no_meja }) {
        const id = uuidv4();

        return prisma.meja.create({
            data: {
                id,
                no_meja: no_meja
            }
        });
    }

    async getMejas() {
        return prisma.meja.findMany();
    }

    async getMejasByIds({mejas}) {
        return prisma.meja.findMany({
            where: {
                id: {
                    in: mejas.map((meja) => meja.id)
                }
            }
        })
    }
    
    async getMejaById({ id }) {
        return prisma.meja.findUnique({
            where: {
                id
            }
        });
    }

    async deleteMeja(id) {
        return prisma.meja.delete({
            where: {
                id: id
            }
        });
    }

    async updateMeja(id, no_meja) {
        return prisma.meja.update({
            where: { id: id },
            data: { no_meja: no_meja }
        });
    }
}

export const mejaService = new MejaService();