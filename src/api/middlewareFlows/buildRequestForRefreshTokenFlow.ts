import type { RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

interface IBuiltRequestParams {
  basicAuth: string;
  url: string;
  body: string;
}

export function buildRequestForRefreshTokenFlow(options: RefreshAuthMiddlewareOptions): IBuiltRequestParams {
  if (!options.host) throw new Error('Missing required option (host)');

  if (!options.projectKey) throw new Error('Missing required option (projectKey)');

  if (!options.refreshToken) throw new Error('Missing required option (refreshToken)');

  const { clientId, clientSecret } = options.credentials;

  if (!(clientId && clientSecret)) throw new Error('Missing required credentials (clientId, clientSecret)');

  const basicAuth = btoa(`${clientId}:${clientSecret}`);

  const oauthUri = '/oauth/token';
  const url = options.host.replace(/\/$/, '') + oauthUri;
  const body = `grant_type=refresh_token&refresh_token=${encodeURIComponent(options.refreshToken)}`;

  return { basicAuth, url, body };
}
