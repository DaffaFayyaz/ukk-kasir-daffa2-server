import express from "express";
import { createTransaction, deleteTransaction, getTransactionById, getTransactions, trxNotif, updateStatusPemesanan, updateTransactionStatus } from "../features/transactions/index.js";
import { validateTransaction, validateTransactionStatus } from "../features/transactions/transactions.validation.js";
import { createProduct, deleteProduct, getProducts, getProductsById, getProductsByIdd, updateProduct, updateProductDiscount, updateProductStock } from "../features/products/index.js";
import { catchAsync } from "../utils/catch-async.js";
import { validateProduct } from "../features/products/products.validator.js";
import { createMeja, getMejas, getMejaById, deleteMeja, updateMeja } from "../features/meja/index.js";
import { validateMeja } from "../features/meja/meja.validator.js";
import { Login, Logout, Register, deleteUser, editUser, getUserById, getUsers } from "../features/Users/index.js";
import { refreshToken } from "../features/Users/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { validateDiscount } from "../features/discounts/discounts.validator.js";
import { createDiscount, deleteDiscount, getDiscountById, getDiscounts, updateDiscount } from "../features/discounts/index.js";
import { createDiscountDetail, deleteDiscountDetail, getDiscountDetailById, getDiscountDetails, updateDiscountDetail } from "../features/discountdetails/index.js";


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello UKK!');
});

// transactions
router.post('/transactions', validateTransaction, catchAsync(createTransaction));
router.get('/transactions', catchAsync(getTransactions));
router.get('/transactions/:transaction_id', catchAsync(getTransactionById));
router.put('/transactions/:transaction_id', validateTransactionStatus, catchAsync(updateTransactionStatus));
router.post('/transactions/notification', catchAsync(trxNotif))
router.patch('/transactions/:transaction_id', catchAsync(updateStatusPemesanan));
router.delete('/transactions/:id', catchAsync(deleteTransaction))

// products
router.post('/products', validateProduct, catchAsync(createProduct));
router.get('/products', catchAsync(getProducts));
router.get('/products/:id', catchAsync(getProductsById))
router.get('/products/product/:id', catchAsync(getProductsByIdd))
router.delete('/products/:id', catchAsync(deleteProduct))
router.put('/products/:id', catchAsync(updateProductStock))
router.put('/products/discount/:id', catchAsync(updateProductDiscount))
router.patch('/products/:id', catchAsync(updateProduct))

// meja
router.post('/meja', validateMeja, catchAsync(createMeja));
router.get('/meja', catchAsync(getMejas));
router.get('/meja/:id', catchAsync(getMejaById));
router.delete('/meja/:id', catchAsync(deleteMeja));
router.put('/meja/:id', catchAsync(updateMeja));

// discounts
router.post('/discounts', validateDiscount, catchAsync(createDiscount))
router.get('/discounts', catchAsync(getDiscounts));
router.get('/discounts/:id', catchAsync(getDiscountById));
router.delete('/discounts/:id', catchAsync(deleteDiscount));
router.patch('/discounts/:id', catchAsync(updateDiscount));

//discount detail
router.post('/discountdetail', catchAsync(createDiscountDetail));
router.get('/discountdetail', catchAsync(getDiscountDetails));
router.get('/discountdetail/:id', catchAsync(getDiscountDetailById));
router.delete('/discountdetail/:id', catchAsync(deleteDiscountDetail));
router.patch('/discounts/:id', catchAsync(updateDiscountDetail));


// users
router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', refreshToken);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', editUser);



export default router;