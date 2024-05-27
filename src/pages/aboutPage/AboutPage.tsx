import { useState } from 'react';

import Slider from '../../components/slider/slider';
import style from './_about.module.scss';
import { api } from '../../api/Api';

import type { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';

export default function AboutPage(): JSX.Element {
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
    <section className={style.about} data-testid="about">
      <section>
        <Slider images={product.body.masterVariant.images} />
      </section>
      <section>
        <h1>{product.body.name.en}</h1>
        <p>{product.body.description?.en}</p>
      </section>
    </section>
  );
}
