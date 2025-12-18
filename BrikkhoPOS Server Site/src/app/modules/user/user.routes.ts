import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userVaildation } from './user.validation';

const router = express.Router();

router.post(
    '/create-user',
    validateRequest(userVaildation.createUserZodSchema),
    UserController.CreateUser
);

router.get('/', UserController.GetAllusers);

export const UserRoutes = router;
