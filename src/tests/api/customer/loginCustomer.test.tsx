import { describe, expect, it } from 'vitest';

import withPasswordFlow from '../../../api/middlewareFlows/withPasswordFlow';
import { tokenCache } from '../../../api/token/MyTokenCache';

import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

describe('testing me endpoint customer', () => {
  it('should sign in using me endpoint', async () => {
    const email = 'bobby@gmail.com';
    const password = 'testtest!';
    const responseLoginMe = (await withPasswordFlow(email, password, tokenCache)
      .me()
      .login()
      .post({
        body: {
          email: 'bobby@gmail.com',
          password: 'testtest!',
        },
      })
      .execute()) as ClientResponse<CustomerSignInResult>;

    expect(responseLoginMe.statusCode).toBe(200);
    expect(responseLoginMe.body?.customer).toBeDefined();
  });
});
