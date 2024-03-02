import { nanoid } from 'nanoid';
import { transactionService } from './transactions.service.js';
import { reformTransaction } from '../../utils/reform-transaction.js';
import { productService } from '../products/products.service.js';
import { MIDTRANS_APP_URL, PENDING_PAYMENT, MIDTRANS_SERVER_KEY, FRONT_END_URL, PAID, CANCELED } from '../../utils/constant.js';
import crypto from 'crypto';

export const createTransaction = async (req, res) => {
    const { products, customer_name, customer_email, id_meja, status_pemesanan } = req.body;
    const productsFromDB = await productService.getProductsById({ ids: products.map(product => product.id) });
    if (productsFromDB.length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Products not found'
        })
    }
    const gross_amount = productsFromDB.reduce((total, product) => {
        const productFromRequest = products.find(p => p.id === product.id);
        if (productFromRequest) {
            let price = product.price;
            let discountDetails = product.discountDetails;
            if (discountDetails && discountDetails.length > 0) {
                for (const discount of discountDetails) {
                    if (discount && discount.potongan_harga !== undefined) {
                        price -= (price * (discount.potongan_harga / 100));
                    }
                }
            }
            total += price * productFromRequest.quantity;
        }
        return total;
    }, 0);

    const itemDetails = productsFromDB.map((product) => {
        let price = product.price;
        let discountApplied = 0;
        let potongan_harga = null;
        
        if (product.discountDetails && product.discountDetails.length > 0) {
            for (const discount of product.discountDetails) {
                price -= (price * (discount.potongan_harga / 100));
                discountApplied += price * (discount.potongan_harga / 100) * products.find(p => p.id === product.id).quantity;
                potongan_harga = discount.potongan_harga;
            }
        }
        
        return {
            id: product.id,
            price: price,
            quantity: products.find(p => p.id === product.id).quantity, 
            name: product.name,
            potongan_harga: potongan_harga
        };
    });
    console.log(itemDetails);
    
    const discountApplied = itemDetails.some(item => item.price < item.price);
    if (discountApplied) {
        const discount = productsFromDB.reduce((total, productDB) => {
            const productFromRequest = products.find(p => p.id === productDB.id);
            if (productFromRequest && productDB.discountDetails) {
                for (const discount of productDB.discountDetails) {
                    total += (productDB.price * (discount.potongan_harga / 100)) * productFromRequest.quantity;
                }
            }
            return total;
        }, 0);
        itemDetails.push({
            id: 'DISCOUNT', 
            price: -discount, 
            quantity: 1,
            name: 'Discount', 
        });
    }
    
    
    
    const transaction_id = `TRX-${nanoid(4)}-${nanoid(8)}`;
    const authString = btoa(`${MIDTRANS_SERVER_KEY}:`)
    const payload = {
        transaction_details: {
            order_id: transaction_id,
            gross_amount
        },
        item_details: itemDetails,
        
        customer_details: {
            first_name: customer_name,
            email: customer_email
        },
        callbacks: {
            finish: `${FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
            error: `${FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
            pending: `${FRONT_END_URL}/order-status?transaction_id=${transaction_id}`
        }
    }
    const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${authString}`
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json();
    if(response.status !== 201){
        console.error("Failed to create transaction:", data);
        return res.status(500).json({
            status: 'error',
            message: 'Failed To Create Transaction'
        })
    }
    await Promise.all([
        transactionService.createTransaction({
            transaction_id,
            gross_amount,
            customer_name,
            customer_email,
            status_pemesanan,
            snap_token: data.token,
            snap_redirect_url: data.redirect_url,
            id_meja
        }),
        transactionService.createTransactionItems({
            products: itemDetails,
            transaction_id
        })
    ]);
    res.json({
        status: 'success',
        data: {
            id: transaction_id,
            status: PENDING_PAYMENT,
            customer_name,
            customer_email,
            status_pemesanan,
            products: productsFromDB,
            id_meja,
            snap_token: data.token,
            snap_redirect_url: data.redirect_url,
        }
    })
};

export const getTransactions = async (req, res) => {
    const { status } = req.query;
    const transactions = await transactionService.getTransactions({status});
    res.json({
        status: 'success',
        data: transactions.map((transaction) => reformTransaction(transaction))
    })
};

export const getTransactionById = async (req, res) => {
    const { transaction_id } = req.params;
    const transaction = await transactionService.getTransactionById({transaction_id});
    if(!transaction) {
        return res.status(404).json({
            status: 'error',
            message: 'Transaction not found'
        })
    }

    res.json({
        status: 'success',
        data: reformTransaction(transaction),
    })
};

export const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        await transactionService.deleteTransaction(id);
        res.json({ status: 'success', message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateTransactionStatus = async (req, res) => {
    const { transaction_id } = req.params;
    const { status } = req.body;
    const transaction = await transactionService.updateTransactionStatus({transaction_id, status});

    res.json({
        status: 'success',
        data: transaction
    })
};

export const updateStatusPemesanan = async (req, res) => {
    const { transaction_id } = req.params;
    const { status_pemesanan } = req.body;
    try {
        const data = await transactionService.updateStatusPemesanan(transaction_id, status_pemesanan);
        res.json({ status: 'success', message: 'Status Pemesanan updated successfully.', data: data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const updateStatusBasedOnMidtransResponse = async (transaction_id, data) => {
    const hash = crypto.createHash('sha512').update(`${transaction_id}${data.status_code}${data.gross_amount}${MIDTRANS_SERVER_KEY}`).digest('hex')
    if(data.signature_key !== hash){
        return {
            status: 'error',
            message: 'Invalid Signature key',
        }
    }

    let responseData = null;
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraud_status;

    if (transactionStatus == 'capture'){
        if (fraudStatus == 'accept'){
            const transaction = await transactionService.updateTransactionStatus({transaction_id, status: PAID, payment_method: data.payment_type});
            responseData = transaction;
        }
    } else if (transactionStatus == 'settlement'){
        const transaction = await transactionService.updateTransactionStatus({transaction_id, status: PAID, payment_method: data.payment_type});
        responseData = transaction;
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire'){
        const transaction = await transactionService.updateTransactionStatus({transaction_id, status: CANCELED});
        responseData = transaction;
    } else if (transactionStatus == 'pending'){
        const transaction = await transactionService.updateTransactionStatus({transaction_id, status: PENDING_PAYMENT});
        responseData = transaction;
    }

    return {
        status: 'success',
        data: responseData
    }
}

export const trxNotif = async(req, res) => {
    const data = req.body;

    transactionService.getTransactionById({transaction_id: data.order_id}).then((transaction) => {
        if(transaction){
            updateStatusBasedOnMidtransResponse(transaction.id, data).then(result => {
                console.log('result', result)
            })
        }
    })

    res.status(200).json({
        status: 'success',
        message: 'OK'
    })
}