import { Response } from "express";

interface SuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
}

/**
 * Send a successful API response
 * @param res Express response object
 * @param statusCode HTTP status code (default: 200)
 * @param message Success message
 * @param data Response data
 */
export const sendSuccess = <T = any>(
  res: Response,
  message: string = "Request successful",
  data: T = [] as any,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  } as SuccessResponse<T>);
};

/**
 * Send an error API response
 * @param res Express response object
 * @param statusCode HTTP status code (default: 500)
 * @param message Error message
 */
export const sendError = (
  res: Response,
  message: string = "Something went wrong",
  statusCode: number = 500
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
  } as ErrorResponse);
};
