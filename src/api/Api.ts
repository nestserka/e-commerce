import { apiRoot as adminApiRoot } from './AdminBuilder';
import { createAnonymousSessionFlow } from './CreateAnonymousApi';
import { createLoginUserClient } from './CreatePasswordFlow';
import { createClientBuilders } from './ClientBuilder';

import type {
  ByProjectKeyRequestBuilder,
  ClientResponse,
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

  public root(): ByProjectKeyRequestBuilder {
    return this.apiRoot;
  }

  public static async createCustomerMe(): Promise<ClientResponse<CustomerSignInResult>> {
    const customer = await adminApiRoot
      .customers()
      .post({
        body: {
          email: 'johndoe4@example.com',
          firstName: 'John4',
          lastName: 'Doe4',
          password: 'Q!secret1224',
        },
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

    // catch (error) {
    //   let errorResponse;
    //   const isUserByEmailResponse = await Api.getCustomerByEmail(email);

    //   if (isUserByEmailResponse) {
    //     errorResponse = handleLoginError(isUserByEmailResponse.body.count);

    //     return errorResponse;
    //   }

    //   return {
    //     error: {
    //       isForm: true,
    //       message: 'Form error',
    //     },
    //   };
    // }
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
}

export const api = new Api();
