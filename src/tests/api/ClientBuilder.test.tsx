import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { describe, expect, it} from 'vitest';

import { createClientBuilders } from '../../api/ClientBuilder';

describe('createClientBuilders', () => {
  it('should create a ByProjectKeyRequestBuilder instance', () => {
    process.env.VITE_APP_CLIENT_ID = 'test_client_id';
    process.env.VITE_APP_CLIENT_SECRET = 'test_client_secret';
    process.env.VITE_APP_AUTH_URL = 'test_auth_url';
    process.env.VITE_APP_PROJECT_KEY = 'test_project_key';
    process.env.VITE_APP_API_URL = 'test_api_url';
    process.env.VITE_APP_CLIENT_SCOPES = 'test_client_scopes';
    const apiRoot = createClientBuilders();
    expect(apiRoot).toBeInstanceOf(ByProjectKeyRequestBuilder);
  });
});