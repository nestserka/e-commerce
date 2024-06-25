import type { ClientRequest, JsonObject } from '@commercetools/sdk-client-v2';

export interface HttpErrorType {
  name: string;
  message: string;
  code: number;
  status: number;
  statusCode: number;
  originalRequest: ClientRequest;
  body?: JsonObject;
  retryCount?: number;
  headers?: JsonObject<string>;
}

export interface IBuiltRequestParams {
  basicAuth: string;
  url: string;
  body: string;
}
