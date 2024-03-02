import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const prisma = new PrismaClient();

class ProductService {
    async createProduct({ name, deskripsi, price, kategori, stock, imageFile }) {
        const id = uuidv4();
        const currentModulePath = dirname(fileURLToPath(import.meta.url));

        const imagePath = join(currentModulePath, '../../../public/images', `${id}.jpg`);
        const imageUrl = `http://localhost:8000/images/${id}.jpg`;
        // const imageUrl = `https://bnp2l7ll-8000.asse.devtunnels.ms/images/${id}.jpg`;

        await imageFile.mv(imagePath);
        const priceInt = parseInt(price, 10);

        return prisma.product.create({
            data: {
                id,
                name,
                deskripsi,
                price: priceInt,
                kategori,
                stock,
                image: imageUrl
            }
        });
    }

    async getProducts() {
        return prisma.product.findMany({
            include: {
                discountDetails: {
                    include: {
                        discount: true
                    }
                }
            }
        });
    }

    async getProductsByIds({products}) {
        return prisma.product.findMany({
            where: {
                id: {
                    in: products.map((product) => product.id)
                }
            }
        })
    }

    async getProductsById({ ids }) {
        return prisma.product.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            include: {
                discountDetails: true 
            }
        });
    }
    

    async getProductsByIdd({ id }) {
        return prisma.product.findUnique({
            where: {
                id: id,
            }
        });
    }

    async deleteProduct(id) {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
    
        if (!product) {
            throw new Error('Product not found');
        }
    
        const filename = product.image.split('/').pop();
        const currentModulePath = dirname(fileURLToPath(import.meta.url));
        const imagePath = join(currentModulePath, '../../../public/images', filename);
    
        try {
            await fs.unlink(imagePath);
        } catch (error) {
            console.error('Error deleting image file:', error);
            throw new Error('Failed to delete product image');
        }
    
        // Delete the product from the database
        return prisma.product.delete({
            where: {
                id
            }
        });
    }

    async updateProductStock(id, stock) {
        return prisma.product.update({
            where: { id: id },
            data: { stock: stock }
        });
    }

    async updateDiscountProduct(id, discount_id) {
        return prisma.product.update({
            where: { id: id },
            data: { discount_id: discount_id}
        });
    }


    async updateProduct(productId, { name, deskripsi, price, kategori, stock, imageFile }) {
        const currentProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!currentProduct) {
            throw new Error('Product not found');
        }

        let imageUrl = currentProduct.image;
        if (imageFile) {
            const id = currentProduct.id;
            const currentModulePath = dirname(fileURLToPath(import.meta.url));
            const imagePath = join(currentModulePath, '../../../public/images', `${id}.jpg`);
            imageUrl = `http://localhost:8000/images/${id}.jpg`;

            await imageFile.mv(imagePath);
        }

        const priceInt = parseInt(price, 10);

        return prisma.product.update({
            where: { id: productId },
            data: {
                name,
                deskripsi,
                price: priceInt,
                kategori,
                stock,
                image: imageUrl
            }
        });
    }
}

export const productService = new ProductService();