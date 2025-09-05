import { prisma } from "../db/prisma";
import { CreateAppointmentInput, ListRangeInput } from "../schemas/appointments.schema";

export async function createAppointment(input: CreateAppointmentInput) {
    const start = new Date(input.start);
    const end = new Date(input.end);
    if (start < new Date()) throw { status: 400, error: "Cannot create past appointment" };

    return prisma.$transaction(async (tx: any) => {
        // check overlap
        const conflict = await tx.appointment.findFirst({
            where: { clinicianId: input.clinicianId, start: { lt: end }, end: { gt: start } },
            select: { id: true }
        });
        if (conflict) throw { status: 409, error: "Overlapping appointment" };

        // create
        const created = await tx.appointment.create({
            data: {
                clinicianId: input.clinicianId,
                patientId: input.patientId,
                start,
                end
            }
        });
        return created;
    });
}

export async function listClinicianAppointments(
    clinicianId: number,
    q: ListRangeInput
) {
    const from = q.from ? new Date(q.from) : undefined;
    const to = q.to ? new Date(q.to) : undefined;
    const take = q.limit ? Number(q.limit) : 50;
    const skip = q.offset ? Number(q.offset) : 0;

    return prisma.appointment.findMany({
        where: {
            clinicianId,
            start: { gte: from, ...(to ? { lte: to } : {}) }
        },
        orderBy: { start: "asc" },
        take, skip
    });
}

export async function listAllAppointments(q: ListRangeInput) {
    const from = q.from ? new Date(q.from) : undefined;
    const to = q.to ? new Date(q.to) : undefined;
    const take = q.limit ? Number(q.limit) : 50;
    const skip = q.offset ? Number(q.offset) : 0;

    return prisma.appointment.findMany({
        where: { start: { gte: from, ...(to ? { lte: to } : {}) } },
        orderBy: { start: "asc" },
        take, skip
    });
}
