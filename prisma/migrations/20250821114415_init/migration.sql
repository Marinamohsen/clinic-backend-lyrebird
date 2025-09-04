CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clinicianId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Appointment_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE INDEX "Appointment_clinicianId_start_end_idx" ON "Appointment"("clinicianId", "start", "end");
