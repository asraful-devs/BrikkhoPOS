<<<<<<< HEAD
import express from 'express';
import { Role } from '../../../../generated/prisma/client';
import { checkAuth } from '../../middlewares/checkAuth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userVaildation } from './user.validation';
=======
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { userVaildation } from "./user.validation";
import { Role } from "../../../../generated/prisma/enums";
>>>>>>> 70b32c83c6a365ae719d013828ff813e77e541a0

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userVaildation.createUserZodSchema),
  UserController.CreateUser,
);

router.get("/", UserController.GetAllusers);

router.get("/:id", UserController.GetUserById);

router.patch(
  "/update-user/:id",
  validateRequest(userVaildation.updateUserZodSchema),
  UserController.UpdateUser,
);

router.patch("/soft-delete-user/:id", UserController.SoftDeleteUser);

router.delete("/delete-user/:id", UserController.DeleteUser);

router.get("/me", checkAuth(...Object.values(Role)), UserController.getMe);

// router.post('/me', UserController.GetMyProfile);

router.get(
    '/me',
    checkAuth(...Object.values(Role)),
    UserController.GetMyProfile
);

export const UserRoutes = router;
