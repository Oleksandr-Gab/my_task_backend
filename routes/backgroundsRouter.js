import express from 'express';

import auth from '../middlewares/authMiddleware.js';
import {
    getBackgroundIcon,
    getBackgroundsResponse,
} from '../controllers/backgroundControllers.js';

const backgroundsRouter = express.Router();

backgroundsRouter.use(auth);
backgroundsRouter.get('/', getBackgroundIcon);
backgroundsRouter.get('/:backgroundsId', getBackgroundsResponse);

export default backgroundsRouter;
