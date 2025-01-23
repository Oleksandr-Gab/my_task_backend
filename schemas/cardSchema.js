import Joi from "joi";

export const cardCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    priority: Joi.string()
        .valid("Low", "Medium", "High", "Without")
        .default("Low"),
    columnId: Joi.string().required(),
    board: Joi.string().required(),
    deadline: Joi.date().optional(),
});

export const cardUpdateSchema = Joi.object({
    title: Joi.string().messages({
        "string empty": '"title" cannot be an empty field',
    }),
});
