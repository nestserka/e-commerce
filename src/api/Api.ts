import { createAnonymousSessionFlow } from './CreateAnonymousApi';
import { createLoginUserClient } from './CreatePasswordFlow';

import type {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  Customer,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

class Api {
  private apiRoot: ByProjectKeyRequestBuilder = createAnonymousSessionFlow();

  public switchToPasswordFlow(username: string, password: string): void {
    this.apiRoot = createLoginUserClient(username, password);
  }

  public switchAnonymousSessionFlow(): void {
    this.apiRoot = createAnonymousSessionFlow();
  }

  public root(): ByProjectKeyRequestBuilder {
    return this.apiRoot;
  }

  public async createCustomerMe(): Promise<ClientResponse<CustomerSignInResult>> {
    const customer = await this.apiRoot
      .customers()
      .post({
        body: {
          email: 'johndoe606877909h04@example.com',
          firstName: 'John4',
          lastName: 'Doe4',
          password: 'secret1224',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();

    return customer;
  }

  public async loginUser(): Promise<ClientResponse<CustomerSignInResult> | undefined> {
    try {
      const customer = await this.apiRoot
        .me()
        .login()
        .post({
          body: {
            email: 'johndoe606877909h04@example.com',
            password: 'secret1224',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .execute();

      return customer;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }

  public async getDataUser(): Promise<ClientResponse<Customer> | undefined> {
    try {
      const customer = this.apiRoot.me().get().execute();

      return await customer;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }
}

export const api = new Api();
