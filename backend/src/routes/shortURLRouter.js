import shortUrlController from '../controllers/shortUrlController.js'
import { authMiddleware } from "../middlewares/authMiddleware.js";
const shortURLRouter = Router();

shortURLRouter.post("/",authMiddleware, shortUrlController)

export default shortURLRouter;
