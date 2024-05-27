import { useParams } from 'react-router';
import { useState } from 'react';

import style from './_product.module.scss';
import Slider from '../../components/slider/slider';
import { api } from '../../api/Api';

import type { Params } from 'react-router';
import type { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';

export default function ProductPage(): JSX.Element {
  const { productId }: Readonly<Params<string>> = useParams();

  const [product, setProduct] = useState<ClientResponse<ProductProjection> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (): Promise<void> => {
    try {
      const data = await api.getProductById('ZHUE023-1');
      setProduct(data);
    } catch (err) {
      setError('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    fetchProduct().catch((err) => {
      console.log(err);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className={style.product} data-testid="product">
      Product № {productId}
      <h1>{product.body.name.en}</h1>
      <p>{product.body.description?.en}</p>
      <Slider />
    </section>
  );
}
