import { describe, expect, it } from 'vitest';

import getHomeProductList from "../../../api/products/gettHomeProductList";

import type { QueryArgs } from "../../../utils/types";

describe('getHomeProductList', () => {
    it('returns products list body', async () => {
      const queryArgs: QueryArgs = {
        'filter.query': ['variants.attributes.discount.key: "10%-off", "15%-off", "20%-off"'],
      };
      const productsList = await getHomeProductList(queryArgs);
      expect(productsList).toHaveProperty('results');
    },7000);
  });