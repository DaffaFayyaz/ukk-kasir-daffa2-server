import { mejaService } from './meja.service.js';

export const getMejas = async (req, res) => {
    const meja = await mejaService.getMejas();

    res.json({
        status: 'success',
        data: meja
    })
}

export const createMeja = async (req, res) => {
    const {no_meja} = req.body;
    try {
        const meja = await mejaService.createMeja({ no_meja });
        res.json({
            status: 'success',
            data: meja
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getMejaById = async (req, res) => {
    const { id } = req.params;
    try {
        const mejasByIds = await mejaService.getMejaById({ id });
        res.json({
            status: 'success',
            data: mejasByIds
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteMeja = async (req, res) => {
    const { id } = req.params;
    try {
        await mejaService.deleteMeja(id);
        res.json({ status: 'success', message: 'Table deleted successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
    
export const updateMeja = async (req, res) => {
    const { id } = req.params;
    const { no_meja } = req.body;
    try {
        const data = await mejaService.updateMeja(id, no_meja);
        res.json({ status: 'success', message: 'Meja updated successfully.', data: data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

