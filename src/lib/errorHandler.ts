import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import {
  errorMessages,
  messageConfig,
  httpStatusMessages,
  HttpStatus,
} from '../resources/errorMessages';

// Configure global message settings
message.config(messageConfig);

interface ErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

export const handleApiError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    // Handle network errors
    if (!axiosError.response) {
      message.error(errorMessages.network);
      return;
    }

    const { status, data } = axiosError.response;
    const errorMessage = data?.message || errorMessages.unexpectedError;

    if (status && status in httpStatusMessages) {
      const statusKey = status as HttpStatus;
      message.error(errorMessages[httpStatusMessages[statusKey]]);
    } else {
      message.error(errorMessage);
    }

    // Log error for debugging
    console.error('API Error:', {
      status,
      message: errorMessage,
      url: axiosError.config?.url,
      method: axiosError.config?.method,
    });
  } else if (error instanceof Error) {
    message.error(error.message);
    console.error('Error:', error);
  } else {
    message.error(errorMessages.unexpectedError);
    console.error('Unknown error:', error);
  }
};

export const isApiError = (error: unknown): error is AxiosError<ErrorResponse> => {
  return axios.isAxiosError(error);
};
