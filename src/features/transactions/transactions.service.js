import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

import { PENDING_PAYMENT } from "../../utils/constant.js";

const prisma = new PrismaClient();

class TransactionService {
    async createTransaction({transaction_id, gross_amount, customer_name, customer_email, status_pemesanan, snap_token = null, snap_redirect_url = null, id_meja = null}) {
        return prisma.transaction.create({
            data: {
                id: transaction_id,
                total: gross_amount,
                status: PENDING_PAYMENT,
                customer_name,
                customer_email,
                status_pemesanan,
                snap_token,
                snap_redirect_url,
                id_meja
            },
        });
    }

    async createTransactionItems({ products, transaction_id }) {
        return prisma.transactionsItem.createMany({
            data: products.map((product) => {
                let potongan_harga = null;
    
                if (product.potongan_harga !== null && product.potongan_harga !== undefined) {
                    potongan_harga = product.potongan_harga;
                }
    
                return {
                    id: `TRX-ITEM-${nanoid(10)}`,
                    transaction_id,
                    product_id: product.id,
                    product_name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    potongan_harga: potongan_harga
                };
            })
        });
    }
    
    
    
    
    

    // get all transactions
    async getTransactions({ status }) {
        let where = {};
        if (status) {
            where = {
                status
            }
        }
    
        return prisma.transaction.findMany({
            where,
            include: {
                transactions_items: {
                    include: {
                        products: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                image: true,
                                discountDetails: true
                            }, 
                        }
                    }
                },
                meja: {
                    select: {
                        id: true,
                        no_meja: true
                    }
                }
            }
        });
    }

    // get transaction by id
    async getTransactionById({transaction_id}) {
        return prisma.transaction.findUnique({
            where: {
                id: transaction_id
            },
            include: {
                transactions_items: {
                    include: {
                        products: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                image: true,
                                discountDetails: true
                            }
                        }
                    },
                },
                meja: {
                    select: {
                        id: true,
                        no_meja: true
                    }
            }
        }
    });
    }

    // update transaction status
    async updateTransactionStatus({transaction_id, status, payment_method = null}) {
        return prisma.transaction.update({
            where: {
                id: transaction_id
            },
            data: {
                status,
                payment_method
            }
        });
    }

    async updateStatusPemesanan(transaction_id, status_pemesanan) {
        return prisma.transaction.update({
            where: { id: transaction_id },
            data: { status_pemesanan: status_pemesanan }
        });
    }

    async deleteTransaction(id) {
        return prisma.transaction.delete({
            where: {
                id: id
            }
        });
    }
}

export const transactionService = new TransactionService();