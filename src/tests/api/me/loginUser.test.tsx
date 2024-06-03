import { describe, expect, it } from 'vitest';

import withPasswordFlow from '../../../api/middlewareFlows/withPasswordFlow';
import { tokenCache } from '../../../api/token/MyTokenCache';

import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/sdk-client-v2';

describe('testing me endpoint customer', () => {
  it('should sign in using me endpoint', async () => {
    const email = 'finaltest@gmail.com';
    const password = 'testTest!!!!';
    const responseLoginMe = (await withPasswordFlow(email, password, tokenCache)
      .me()
      .login()
      .post({
        body: {
          email: 'finaltest@gmail.com',
          password: 'testTest!!!!',
        },
      })
      .execute()) as ClientResponse<CustomerSignInResult>;

    expect(responseLoginMe.statusCode).toBe(200);
    expect(responseLoginMe.body?.customer).toBeDefined();
  });
});
