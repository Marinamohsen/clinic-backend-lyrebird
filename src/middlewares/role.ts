import { RequestHandler } from "express";

declare global {
    namespace Express {
        interface Request { role?: "patient" | "clinician" | "admin"; userId?: number }
    }
}

export const attachRole: RequestHandler = (req, _res, next) => {
    const role = (req.header("X-Role") || (req.query.role as string) || "").toLowerCase();
    if (role === "patient" || role === "clinician" || role === "admin") req.role = role as any;
    else req.role = "admin";
    next();
};

export const requireAdmin: RequestHandler = (req, _res, next) =>
    req.role === "admin" ? next() : next({ status: 403, error: "Admin only" });
