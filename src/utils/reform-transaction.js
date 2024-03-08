export const reformTransaction = (transaction) => {
    const transactionNotif = transaction.transactionNotif;
    const gross_amount = transactionNotif ? transactionNotif.gross_amount : null;
    const transaction_time = transactionNotif ? transactionNotif.transaction_time : null;

    return {
        id: transaction.id,
        total: gross_amount,
        status: transaction.status,
        customer_name: transaction.customer_name,
        customer_email: transaction.customer_email,
        snap_token: transaction.snap_token,
        snap_redirect_url: transaction.snap_redirect_url,
        payment_method: transaction.payment_method,
        id_meja: transaction.meja.id,
        no_meja: transaction.meja.no_meja,
        status_pemesanan: transaction.status_pemesanan,
        created_at: transaction_time,
        products: transaction.transactions_items.map((transactionItem) => ({
            id: transactionItem.product_id,
            name: transactionItem.products.name,
            price: transactionItem.price,
            quantity: transactionItem.quantity,
            image: transactionItem.products.image,
            initial_price: transactionItem.products.price,
            potongan_harga: transactionItem.potongan_harga,
            discount: transactionItem.products.discountDetails
        }))
    }
}