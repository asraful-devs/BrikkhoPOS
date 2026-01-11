import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { WeeklySummaryController } from './weeklySummary.controller';
import { weeklySummaryValidation } from './weeklySummary.validation';

const router = express.Router();

router.post(
    '/create-weekly-summary',
    validateRequest(weeklySummaryValidation.weeklySummaryCreateZodSchema),
    WeeklySummaryController.CreateWeeklySummary
);

router.get(
    '/get-weekly-summaries',
    WeeklySummaryController.GetAllWeeklySummaries
);

router.get(
    '/get-single-weekly-summary/:id',
    WeeklySummaryController.GetSingleWeeklySummary
);

router.patch(
    '/update-weekly-summary/:id',
    validateRequest(weeklySummaryValidation.weeklySummaryUpdateZodSchema),
    WeeklySummaryController.UpdateWeeklySummary
);

router.delete(
    '/delete-weekly-summary/:id',
    WeeklySummaryController.DeleteWeeklySummary
);

router.post('/generate-report', WeeklySummaryController.GenerateWeeklyReport);

export const WeeklySummaryRoutes = router;
