export interface ErrorResponse {
  statusCode: number;
  body: {
    succes: false;
    error: {
      code: string;
      message: string;
      type: string;
      details?: Record<string, any>;
    };
    timestamp: string;
  };
}