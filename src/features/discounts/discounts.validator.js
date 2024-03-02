import { check } from "express-validator";
import { errorValidation } from "../../middleware/error-validation.js";

export const validateDiscount = [
    check('nama_discount').isLength({ min: 1 }).withMessage('Nama discount must be at least 1 character long'),
    check('potongan_harga').isInt().withMessage('Potongan harga must be an integer'),
    check('tgl_end').isISO8601().toDate().withMessage('Invalid end date format'),
    errorValidation
];
