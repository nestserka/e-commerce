import { buildRequestForRefreshTokenFlow } from './buildRequestForRefreshTokenFlow';
import authMiddlewareBase from './authMiddlewareBase';
import { tokenCache as tokenData } from '../token/MyTokenCache';
import { createBooleanState } from '../../utils/utils';

import type { AuthMiddlewareBaseOptions } from '../../utils/types';
import type {
  Middleware,
  MiddlewareRequest,
  MiddlewareResponse,
  Next,
  RefreshAuthMiddlewareOptions,
  Task,
} from '@commercetools/sdk-client-v2';

export default function createAuthMiddlewareForRefreshTokenFlow(options: RefreshAuthMiddlewareOptions): Middleware {
  const tokenCache = options.tokenCache ?? tokenData;

  const pendingTasks: Task[] = [];

  const requestState = createBooleanState(false);

  return (next: Next): Next =>
    async (request: MiddlewareRequest, response: MiddlewareResponse) => {
      if (request.headers?.authorization ?? request.headers?.Authorization) {
        next(request, response);

        return;
      }

      const params: AuthMiddlewareBaseOptions = {
        request,
        response,
        ...buildRequestForRefreshTokenFlow(options),
        pendingTasks,
        requestState,
        tokenCache,
        fetch,
      };
      await authMiddlewareBase(params, next, options);
    };
}
