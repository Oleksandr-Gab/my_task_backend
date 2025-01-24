import HttpError from "../helpers/HttpError.js";
import Cards from "../models/cardSchema.js";

export const getAllCards = async (req, res, next) => {
    const { columnId } = req.query;
    try {
        const cards = await Cards.find({ column: columnId });
        res.json({ cards });
    } catch (error) {
        next(e);
    }
};

export const addCard = async (req, res, next) => {
    const { title, description, priority, deadline, columnId, board } =
        req.body;
    const card = {
        title: title,
        description: description,
        priority: priority,
        deadline: deadline,
        column: columnId,
        board: board,
    };

    try {
        const newCard = await Cards.create(card);
        res.status(201).json({ card: newCard });
    } catch (e) {
        next(e);
    }
};

export const updateCard = async (req, res, next) => {
    const { cardId } = req.params;
    const newCard = req.body;

    try {
        const updateCard = await Cards.findByIdAndUpdate(cardId, newCard, {
            new: true,
        });

        if (!updateCard) throw HttpError(404);
        res.json({ card: updateCard });
    } catch (e) {
        next(e);
    }
};

export const deleteCard = async (req, res, next) => {
    const { cardId } = req.params;

    try {
        const result = await Cards.findByIdAndDelete(cardId);
        if (!result) throw HttpError(404);

        res.json({ message: "Card deleted successfully" });
    } catch (e) {
        next(e);
    }
};
