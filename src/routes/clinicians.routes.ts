import { Router } from "express";
import { getClinicianAppointments } from "../controllers/clinicians.controller";
import { validateQuery } from "../middlewares/validate";
import { ListRangeSchema } from "../schemas/appointments.schema";
import { attachRole } from "../middlewares/role";

const r = Router();
r.use(attachRole);

r.get("/:id/appointments", validateQuery(ListRangeSchema), getClinicianAppointments);

export default r;
