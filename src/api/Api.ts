import { apiRoot as adminApiRoot } from './AdminBuilder';
import { createAnonymousSessionFlow } from './CreateAnonymousApi';
import { createLoginUserClient } from './CreatePasswordFlow';
import { createClientBuilders } from './ClientBuilder';
import { createClientWithAttachedToken } from './WithExistingToken';

import type {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerPagedQueryResponse,
  CustomerSignInResult,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

export class Api {
  private apiRoot: ByProjectKeyRequestBuilder = createClientBuilders();

  public switchToPasswordFlow(username: string, password: string): void {
    this.apiRoot = createLoginUserClient(username, password);
  }

  public switchAnonymousSessionFlow(): void {
    this.apiRoot = createAnonymousSessionFlow();
  }

  public switchClientBuilders(): void {
    this.apiRoot = createClientBuilders();
  }

  public swithToPrivateToken(token: string): void {
    this.apiRoot = createClientWithAttachedToken(token);
  }

  public root(): ByProjectKeyRequestBuilder {
    return this.apiRoot;
  }

  public static async createCustomer(data: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
    const customer = await adminApiRoot
      .customers()
      .post({
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();

    return customer;
  }

  public async loginUser(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    const customer = await this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .execute();

    return customer;
  }

  public static async getCustomerByEmail(
    email: string,
  ): Promise<ClientResponse<CustomerPagedQueryResponse> | undefined> {
    try {
      const response = await adminApiRoot
        .customers()
        .get({
          queryArgs: {
            where: `email="${email}"`,
          },
        })
        .execute();

      return response;
    } catch (error) {
      return undefined;
    }
  }

  public async getAllProduct(): Promise<ClientResponse<ProductProjectionPagedQueryResponse> | undefined> {
    try {
      const products = this.apiRoot.productProjections().get().execute();

      return await products;
    } catch (error) {
      console.log(error);

      return undefined;
    }
  }

  public async getCustomer(): Promise<ClientResponse<Customer> | undefined> {
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
