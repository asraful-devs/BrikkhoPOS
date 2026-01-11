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

router.get('/:id', UserController.GetUserById);

router.patch(
    '/update-user/:id',
    validateRequest(userVaildation.updateUserZodSchema),
    UserController.UpdateUser
);

router.patch('/soft-delete-user/:id', UserController.SoftDeleteUser);

router.delete('/delete-user/:id', UserController.DeleteUser);

export const UserRoutes = router;
