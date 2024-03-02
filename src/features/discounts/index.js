import { discountService } from './discounts.service.js';

export const getDiscounts = async (req, res) => {
    try {
        const discounts = await discountService.getDiscounts();
        res.json({
            status: 'success',
            data: discounts
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createDiscount = async (req, res) => {
    const { nama_discount, potongan_harga, tgl_end } = req.body;
    try {
        const discount = await discountService.createDiscount({ nama_discount, potongan_harga, tgl_end });
        res.json({
            status: 'success',
            data: discount
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getDiscountById = async (req, res) => {
    const { id } = req.params;
    try {
        const discount = await discountService.getDiscountById(id);
        res.json({
            status: 'success',
            data: discount
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteDiscount = async (req, res) => {
    const { id } = req.params;
    try {
        await discountService.deleteDiscount(id);
        res.json({ status: 'success', message: 'Discount deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateDiscount = async (req, res) => {
    const { id } = req.params;
    const { nama_discount, potongan_harga, tgl_end } = req.body;
    try {
        const discount = await discountService.updateDiscount(id, { nama_discount, potongan_harga, tgl_end });
        res.json({ status: 'success', message: 'Discount updated successfully.', data: discount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
