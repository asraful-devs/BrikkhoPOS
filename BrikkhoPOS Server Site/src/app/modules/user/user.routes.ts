import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.GetAllusers);

export const UserRoutes = router;
