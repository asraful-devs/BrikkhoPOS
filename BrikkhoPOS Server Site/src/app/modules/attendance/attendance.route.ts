import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AttendanceController } from './attendance.controller';
import { attendanceVaildation } from './attendance.validation';

const router = express.Router();

router.post(
    '/create-attendance',
    validateRequest(attendanceVaildation.attendanceCreateZodSchema),
    AttendanceController.CreateAttendance
);

router.post(
    '/bulk-upsert-attendance',
    AttendanceController.BulkUpsertAttendance
);

router.get('/get-attendances', AttendanceController.GetAllAttendances);

router.get(
    '/get-attendances-by-date/:date',
    AttendanceController.GetAttendancesByDate
);

router.get(
    '/get-single-attendance/:id',
    AttendanceController.GetSingleAttendance
);

router.patch(
    '/update-attendance/:id',
    validateRequest(attendanceVaildation.attendanceUpdateZodSchema),
    AttendanceController.UpdateAttendance
);

router.delete('/delete-attendance/:id', AttendanceController.DeleteAttendance);

export const AttendanceRoutes = router;
