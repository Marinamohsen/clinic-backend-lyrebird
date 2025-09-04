import { RequestHandler } from "express";
import { requireClinician } from "../services/users.service";
import { listClinicianAppointments } from "../services/appointments.service";

export const getClinicianAppointments: RequestHandler = async (req, res, next) => {
    try {
        const clinicianId = Number(req.params.id);
        await requireClinician(clinicianId);
        const items = await listClinicianAppointments(clinicianId, req.query as any);
        res.json(items); // 200 OK with JSON array
    } catch (err) { next(err); }
};
