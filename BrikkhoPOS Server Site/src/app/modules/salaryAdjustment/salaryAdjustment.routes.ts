import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SalaryAdjustmentController } from './salaryAdjustment.controller';
import { salaryAdjustmentVaildation } from './salaryAdjustment.validation';

const router = express.Router();

router.post(
    '/create-salary-adjustment',
    validateRequest(salaryAdjustmentVaildation.salaryAdjustmentCreateZodSchema),
    SalaryAdjustmentController.CreateSalaryAdjustment
);

router.get(
    '/get-salary-adjustments',
    SalaryAdjustmentController.GetAllSalaryAdjustments
);

router.get(
    '/get-single-salary-adjustment/:id',
    SalaryAdjustmentController.GetSingleSalaryAdjustment
);

router.patch(
    '/update-salary-adjustment/:id',
    validateRequest(salaryAdjustmentVaildation.salaryAdjustmentUpdateZodSchema),
    SalaryAdjustmentController.UpdateSalaryAdjustment
);

router.delete(
    '/delete-salary-adjustment/:id',
    SalaryAdjustmentController.DeleteSalaryAdjustment
);

export const SalaryAdjustmentRoutes = router;
