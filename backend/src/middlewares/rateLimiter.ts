import { NextFunction, Request, Response, type RequestHandler } from "express";
import rateLimit from "../config/upstach";

const rateLimiter: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ipIdentifier = req.ip || "127.0.0.1";
    const { success } = await rateLimit.limit(ipIdentifier);
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
