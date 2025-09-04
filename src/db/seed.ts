import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Clinicians
    const c1 = await prisma.user.create({
        data: { name: "Dr. Emmily", email: "emily9991@clinic.test", role: 'clinician' },
    });

    const c2 = await prisma.user.create({
        data: { name: "Dr. Jaames", email: "james2888@clinic.test", role: 'clinician' },
    });

    // Patients
    const p1 = await prisma.user.create({
        data: { name: "Ethan", email: "ethan884@pt.test", role: 'patient' },
    });

    const p2 = await prisma.user.create({
        data: { name: "Sophia", email: "sophia6@pt.test", role: 'patient' },
    });

    const p3 = await prisma.user.create({
        data: { name: "Olivia", email: "olivia7@pt.test", role: "patient" },
    });

    // Admin
    const admin = await prisma.user.create({
        data: { name: "Admin", email: "admin7@clinic.test", role: 'admin' },
    });

    console.log({ c1, c2, p1, p2, p3, admin });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
