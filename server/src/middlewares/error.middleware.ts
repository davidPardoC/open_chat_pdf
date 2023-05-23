import {
  Errback,
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";

const ErrorHandler: ErrorRequestHandler = (
  err: { statusCode: number; message: string; stack: any },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
