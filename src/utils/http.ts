import { RequestHandler, ErrorRequestHandler } from "express";

interface AppError extends Error {
    status?: number;
    error?: string;
}

// 404 handler
export const notFound: RequestHandler = (_req, _res, next) =>
    next({ status: 404, error: "Not Found" });

//  error handler
export const errorMiddleware: ErrorRequestHandler = (
    err: AppError,
    _req,
    res,
    _next
) => {
    console.log(err)
    const status = typeof err?.status === "number" ? err.status : 500;
    const payload = { error: err?.error ?? "Internal Server Error" };

    res.status(status).json(payload);
};
