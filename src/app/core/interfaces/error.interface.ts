export type Error = {
  message: string;
  error?:
    | {
        error: string;
        message: string[];
        statusCode: number;
      }
    | string;
  statusCode?: number;
} & any;
