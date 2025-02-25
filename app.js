import express from "express";
import cors from "cors";

import "dotenv/config";
import "./db/db.js";

import boardRouter from "./routes/boardRouter.js";
import usersRouter from "./routes/usersRouter.js";
import cardRouter from "./routes/cardRouter.js";
import columnsRouter from "./routes/columnsRouter.js";
import emailSupportRouter from "./emailSupport/emailRouter.js";

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json" assert { type: "json" };

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/boards", boardRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardRouter);
app.use("/api/help", emailSupportRouter);

// ~swagger;
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json(message);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
