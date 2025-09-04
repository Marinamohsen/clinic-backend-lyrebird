import { RequestHandler } from "express";
import { ZodSchema } from "zod";


export const validateBody = (schema: ZodSchema): RequestHandler => (req, _res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return next({ status: 400, error: parsed.error.flatten() });
    req.body = parsed.data;
    next();
};

export const validateQuery = (schema: ZodSchema): RequestHandler => (req, _res, next) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) return next({ status: 400, error: parsed.error.flatten() });
    (req as any).q = parsed.data;
    next();
};
