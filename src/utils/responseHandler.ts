import { Response } from "express";

interface PaginationMeta {
  total: number;
  skip: number;
  limit: number;
  page: number;
}

/*
  Send success response
*/
export const sendSuccess = (
  res: Response,
  message = "Request successful",
  data: unknown = null,
  statusCode = 200,
  pagination?: PaginationMeta
) => {
  const response: any = {
    success: true,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
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

/*
  Calculate pagination metadata
*/
export const calculatePagination = (
  total: number,
  skip: number,
  limit: number
): PaginationMeta => {
  const page = Math.floor(skip / limit) + 1;
  return {
    total,
    skip,
    limit,
    page,
  };
};