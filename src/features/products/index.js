import { productService } from './products.service.js';

export const getProducts = async (req, res) => {
    const products = await productService.getProducts();
    res.json({
        status: 'success',
        data: products
    })
}

export const createProduct = async (req, res) => {
    const { name, deskripsi, price, kategori, stock } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ status: 'error', message: 'No files were uploaded.' });
    }
    const imageFile = req.files.image; 
    try {
        const product = await productService.createProduct({ name, deskripsi, price, kategori, stock, imageFile });
        res.json({
            status: 'success',
            data: product
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getProductsById = async (req, res) => {
    const { id } = req.params;
    try {
        const productsById = await productService.getProductsById({ id });
        res.json({
            status: 'success',
            data: productsById
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getProductsByIdd = async (req, res) => {
    const { id } = req.params;
    try {
        const productsById = await productService.getProductsByIdd({ id });
        res.json({
            status: 'success',
            data: productsById
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await productService.deleteProduct(id);
        res.json({ status: 'success', message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProductStock = async (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    try {
        const data = await productService.updateProductStock(id, stock);
        res.json({ status: 'success', message: 'Product stock updated successfully.', data: data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProductDiscount = async (req, res) => {
    const { id } = req.params;
    const { discount_id } = req.body;
    try {
        const data = await productService.updateDiscountProduct(id, discount_id);
        res.json({ status: 'success', message: 'Product Discount updated successfully.', data: data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, deskripsi, price, kategori, stock } = req.body;
    const imageFile = req.files?.image;

    try {
        const data = await productService.updateProduct(id, { name, deskripsi, price, kategori, stock, imageFile });
        res.json({ status: 'success', message: 'Product updated successfully.', data: data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};