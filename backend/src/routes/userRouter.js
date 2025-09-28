/ src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { getProfileOfUser, getMyUrls} from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get('/me',authMiddleware, getProfileOfUser);

userRouter.get('/my/url',authMiddleware, getMyUrls);

export default userRouter;
