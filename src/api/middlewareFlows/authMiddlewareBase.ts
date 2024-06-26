import { buildRequestForRefreshTokenFlow } from './buildRequestForRefreshTokenFlow';
import {
  type AuthMiddlewareBaseOptions,
  type ExecuteRequestOptions,
  isErrorType,
  isTokenInfo,
} from '../../utils/types';

import type {
  AuthMiddlewareOptions,
  MiddlewareRequest,
  Next,
  PasswordAuthMiddlewareOptions,
  Task,
  TokenInfo,
} from '@commercetools/sdk-client-v2';

function mergeAuthHeader(token: string, req: MiddlewareRequest): MiddlewareRequest {
  return {
    ...req,
    headers: {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

function calculateExpirationTime(expiresIn: number): number {
  return Date.now() + expiresIn * 1000 - 5 * 60 * 1000;
}

async function executeRequest({
  fetcher,
  url,
  basicAuth,
  body,
  tokenCache,
  requestState,
  pendingTasks,
  response,
  tokenCacheKey,
}: ExecuteRequestOptions): Promise<void> {
  try {
    const res: Response = await fetcher(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Length': body.length.toString(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (res.ok) {
      const tokenResp: unknown = await res.json();

      if (isTokenInfo(tokenResp)) {
        const { access_token: token, expires_in: expiresIn, refresh_token: refreshToken }: TokenInfo = tokenResp;
        const expirationTime = calculateExpirationTime(expiresIn);

        tokenCache.set({ token, expirationTime, refreshToken }, tokenCacheKey);
        requestState.set(false);

        const executionQueue = pendingTasks.slice();
        pendingTasks.splice(0, pendingTasks.length);

        executionQueue.forEach((task: Task) => {
          const requestWithAuth = mergeAuthHeader(token, task.request);
          task.next(requestWithAuth, task.response);
        });

        return;
      }
    }

    const text: string = await res.text();

    try {
      const parsedData: unknown = JSON.parse(text);

      if (isErrorType(parsedData)) {
        const { statusCode, message, error } = parsedData;
        const myJsonObject = {
          statusCode,
          message,
          error,
        };
        response.reject(myJsonObject);
        requestState.set(false);
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    requestState.set(false);
  }
}

export default async function authMiddlewareBase(
  {
    request,
    response,
    url,
    basicAuth,
    body,
    pendingTasks,
    requestState,
    tokenCache,
    tokenCacheKey,
    fetch: fetcher,
  }: AuthMiddlewareBaseOptions,
  next: Next,
  userOptions?: AuthMiddlewareOptions | PasswordAuthMiddlewareOptions,
): Promise<void> {
  if (request.headers?.authorization ?? request.headers?.Authorization) {
    next(request, response);

    return;
  }

  const tokenObj = tokenCache.get(tokenCacheKey);

  if (tokenObj.token && Date.now() < tokenObj.expirationTime) {
    const requestWithAuth = mergeAuthHeader(tokenObj.token, request);
    next(requestWithAuth, response);

    return;
  }

  pendingTasks.push({ request, response, next });

  if (requestState.get()) return;
  requestState.set(true);

  if (tokenObj.refreshToken && (!tokenObj.token || (tokenObj.token && Date.now() > tokenObj.expirationTime))) {
    if (!userOptions) throw new Error('Missing required options');

    await executeRequest({
      fetcher,
      ...buildRequestForRefreshTokenFlow({
        ...userOptions,
        refreshToken: tokenObj.refreshToken,
      }),
      tokenCacheKey,
      tokenCache,
      requestState,
      pendingTasks,
      response,
    });

    return;
  }

  await executeRequest({
    fetcher,
    url,
    basicAuth,
    body,
    tokenCacheKey,
    tokenCache,
    requestState,
    pendingTasks,
    response,
  });
}
