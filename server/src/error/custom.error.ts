export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const BadRequestExeption = (message?: string) => {
  return new CustomError(message || "Bad request", 400);
};

export const NotFoundExeptions = (message?: string) => {
  return new CustomError(message || "Not Found", 404);
};
