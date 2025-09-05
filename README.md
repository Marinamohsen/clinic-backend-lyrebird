# clinic-backend-lyrebird

This backend project demonstrates a **clinic system API** built with **TypeScript, Express, and Prisma**, using SQLite for local development.  

## Features

- Built with TypeScript
- Database managed with Prisma ORM
- Uses SQLite for local development
- REST API endpoints for clinic operations


## Core Endpoints - Due to time constraints, I focused on the main functionality: 
- Get all appointments  
- Filter appointments by date  
- Create a new appointment  
- Get a clinician’s upcoming appointments  

I also implemented a **seed file** to populate initial users and included all installation and setup instructions below.  

While my primary expertise is in frontend development, I implemented this backend by applying TypeScript and researching backend concepts as needed. 
The project demonstrates my ability to **adapt quickly, learn new technologies, and design a functional API with a clear structure and maintainable code**.  
It is functional though there is room for further refinement and deeper backend design decisions.


## Setup & Run

1. Install dependencies:
npm install

2. Set up the database:
npx prisma migrate dev --name init 

3. Start the development server:
npm run dev

4. Open Prisma Studio (visual DB editor):
npx prisma studio


## Example requests for all endpoints:

##  1. Get all appointments
curl -X GET "/appointments" \
  -H "Content-Type: application/json"

##  2. Get appointments filtered by date range
curl -X GET "/appointments?from=2025-09-01&to=2025-09-10" \
  -H "Content-Type: application/json"

## 3. Create a new appointment
curl -X POST "/appointments" \
  -H "Content-Type: application/json" \
  -d '{
    "clinicianId": 2,
    "patientId": 5,
    "start": "2025-09-05T00:30:00Z",
    "end": "2025-09-05T00:35:00Z"
  }'

## 4. Get a clinician’s upcoming appointments (by ID)
curl -X GET "/clinicians/2/appointments" \
  -H "Content-Type: application/json"



