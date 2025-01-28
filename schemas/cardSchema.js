import Joi from "joi";

export const cardCreateSchema = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": '"title" cannot be an empty field',
    }),
    description: Joi.string().required(),
    priority: Joi.string()
        .valid("Low", "Medium", "High", "Without")
        .default("Low"),
    columnId: Joi.string().required(),
    board: Joi.string().required(),
    deadline: Joi.date().optional(),
});

export const cardUpdateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string().required().valid("Low", "Medium", "High", "Without"),
    column: Joi.string().required(),
    deadline: Joi.date().required(),
    _id: Joi.string().optional(),
});
