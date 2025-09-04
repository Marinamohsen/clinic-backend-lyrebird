import express from "express";
import cors from "cors";

import appointmentsRouter from "./routes/appointments.routes";
import cliniciansRouter from "./routes/clinicians.routes";
import { errorMiddleware, notFound } from "./middlewares/error";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/appointments", appointmentsRouter);
app.use("/clinicians", cliniciansRouter);

// 404 + error
app.use(notFound);
app.use(errorMiddleware);

export default app;
