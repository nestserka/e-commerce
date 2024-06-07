// import withAnonymousFlow from '../middlewareFlows/withAnonymousFlow';

// import type { Cart, ClientResponse } from '@commercetools/platform-sdk';

export default function addProductToCart(cartId: string, productId: string): Promise<void> {
  return new Promise(() => {
    setTimeout(() => {
      console.log(`${productId} added to cart with id ${cartId}`);
    }, 0);
  });
}
