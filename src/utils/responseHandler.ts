import { Response } from "express";

/*
  Send success response
*/
export const sendSuccess = (
  res: Response,
  message = "Request successful",
  data: unknown = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/*
  Send error response
*/
export const sendError = (
  res: Response,
  message = "Something went wrong",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};