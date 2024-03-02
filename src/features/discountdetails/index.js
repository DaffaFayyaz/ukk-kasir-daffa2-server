import { discountDetailService } from "./discountdetails.service.js";

export const createDiscountDetail = async (req, res) => {
    const {id_product, id_discount} = req.body;
    try {
        const discountDetail = await discountDetailService.createDiscountDetail({id_product, id_discount});
        res.json({
            status: 'success',
            data: discountDetail
        });
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message});
    }
};

export const getDiscountDetails = async (req, res) => {
    try {
        const discountDetails = await discountDetailService.getDiscountDetails();
        res.json({ status: 'success', data: discountDetails });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getDiscountDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const discountDetail = await discountDetailService.getDiscountDetailById(id);
        if (!discountDetail) {
            return res.status(404).json({ status: 'error', message: 'Discount detail not found' });
        }
        res.json({ status: 'success', data: discountDetail });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateDiscountDetail = async (req, res) => {
    const { id } = req.params;
    const { discount_id } = req.body;
    try {
        // Fetch the discount to get potongan_harga
        const discount = await prisma.discount.findUnique({
            where: { id: discount_id },
            select: { potongan_harga: true }
        });
        const potongan_harga = discount ? discount.potongan_harga : null;

        // Update the discount detail
        const updatedDiscountDetail = await discountDetailService.updateDiscountDetail(id, { discount_id, potongan_harga });

        res.json({ status: 'success', data: updatedDiscountDetail });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteDiscountDetail = async (req, res) => {
    const { id } = req.params;
    try {
        await discountDetailService.deleteDiscountDetail(id);
        res.json({ status: 'success', message: 'Discount detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};