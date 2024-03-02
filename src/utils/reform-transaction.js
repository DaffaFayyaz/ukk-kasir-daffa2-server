export const reformTransaction = (transaction) => {
    return {
        id: transaction.id,
        total: transaction.total,
        status: transaction.status,
        customer_name: transaction.customer_name,
        customer_email: transaction.customer_email,
        snap_token: transaction.snap_token,
        snap_redirect_url: transaction.snap_redirect_url,
        payment_method: transaction.payment_method,
        id_meja: transaction.meja.id,
        no_meja: transaction.meja.no_meja,
        status_pemesanan: transaction.status_pemesanan,
        created_at: transaction.created_at,
        products: transaction.transactions_items.map((transactionItem) => ({
            id: transactionItem.product_id,
            name: transactionItem.product_name,
            price: transactionItem.price,
            quantity: transactionItem.quantity,
            image: transactionItem.products.image,
            initial_price: transactionItem.products.price,
            potongan_harga: transactionItem.potongan_harga,
            discount: transactionItem.products.discountDetails
        }))
    }
}