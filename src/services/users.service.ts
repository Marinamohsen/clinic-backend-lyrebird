import { prisma } from "../db/prisma";

export async function requireClinician(id: number) {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u || u.role !== "clinician") throw { status: 400, error: "Invalid clinicianId" };
    return u;
}

export async function requirePatient(id: number) {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u || u.role !== "patient") throw { status: 400, error: "Invalid patientId" };
    return u;
}
