import { check } from "express-validator";
import { errorValidation } from "../../middleware/error-validation.js";

export const validateMeja = [
    check('no_meja').isLength({ min: 1 }).withMessage('Meja must be at least 1 characters long'),
    errorValidation,
]