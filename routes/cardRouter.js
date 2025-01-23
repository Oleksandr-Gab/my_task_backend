import express from "express";
import {
    addCard,
    updateCard,
    deleteCard,
    getAllCards,
} from "../controllers/cardControllers.js";
import auth from "../middlewares/authMiddleware.js";
import { cardCreateSchema, cardUpdateSchema } from "../schemas/cardSchema.js";
import validateBody from "../helpers/validateBody.js";

const cardRouter = express.Router();

cardRouter.use(auth);
cardRouter.get("/", getAllCards);
cardRouter.post("/", validateBody(cardCreateSchema), addCard);
cardRouter.put("/:cardId", validateBody(cardUpdateSchema), updateCard);
cardRouter.delete("/:cardId", deleteCard);

export default cardRouter;
