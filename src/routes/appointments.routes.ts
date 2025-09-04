import { Router } from "express";
import { postAppointment, getAllAppointments } from "../controllers/appointments.controller";
import { validateBody, validateQuery } from "../middlewares/validate";
import { CreateAppointmentSchema, ListRangeSchema } from "../schemas/appointments.schema";
import { attachRole, requireAdmin } from "../middlewares/role";

const r = Router();
r.use(attachRole);

// Create appointment 
r.post("/", validateBody(CreateAppointmentSchema), postAppointment);

// list all 
r.get("/", validateQuery(ListRangeSchema), requireAdmin, getAllAppointments)

export default r;
