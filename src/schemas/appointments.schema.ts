import { z } from "zod";

export const CreateAppointmentSchema = z.object({
    clinicianId: z.number().int().positive(),
    patientId: z.number().int().positive(),
    start: z.string().datetime(), // ISO
    end: z.string().datetime()    // ISO
}).refine(({ start, end }) => new Date(start).getTime() < new Date(end).getTime(), {
    message: "start must be strictly before end",
    path: ["start"]
});

export type CreateAppointmentInput = z.infer<typeof CreateAppointmentSchema>;

export const ListRangeSchema = z.object({
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    offset: z.coerce.number().int().min(0).optional()
}).refine(({ from, to }) => !from || !to || new Date(from) <= new Date(to), {
    message: "from must be <= to",
    path: ["from"]
});

export type ListRangeInput = z.infer<typeof ListRangeSchema>;
