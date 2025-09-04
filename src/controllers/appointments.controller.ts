import { RequestHandler } from "express";
import { requireClinician, requirePatient } from "../services/users.service";
import { createAppointment, listAllAppointments } from "../services/appointments.service";

export const postAppointment: RequestHandler = async (req, res, next) => {
    try {
        const { clinicianId, patientId, start, end } = req.body;
        await Promise.all([requireClinician(clinicianId), requirePatient(patientId)]);
        const created = await createAppointment({ clinicianId, patientId, start, end });
        res.status(201).json(created); // 201 created on success
    } catch (err) { next(err); }
};

export const getAllAppointments: RequestHandler = async (req, res, next) => {
    console.log(req.query)
    try {
        const items = await listAllAppointments(req.query as any);
        res.json(items); // 200 OK with JSON array
    } catch (err) {
        console.log(req)
        next(err);
    }
};
