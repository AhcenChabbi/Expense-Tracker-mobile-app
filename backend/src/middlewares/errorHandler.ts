import { ErrorRequestHandler, Response } from "express";
import AppError from "../utils/AppError";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import z from "zod";
const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};
const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.httpStatusCode).json({
    message: error.message,
  });
};
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH ${req.path}`, err);
  if (err instanceof z.ZodError) {
    return handleZodError(res, err);
  }
  if (err instanceof AppError) {
    return handleAppError(res, err);
  }
  return res.status(INTERNAL_SERVER_ERROR).json({
    message: "internal server error",
  });
};

export default errorHandler;
