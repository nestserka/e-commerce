import { useParams } from 'react-router';
import { useState } from 'react';

import style from './_product.module.scss';
import Slider from '../../components/slider/slider';
import { api } from '../../api/Api';
import FormSubTitle from '../../components/formSubTitle/formSubTitle';

import type { Params } from 'react-router';
import type { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';

export default function ProductPage(): JSX.Element {
  const { productId }: Readonly<Params<string>> = useParams();

  const [product, setProduct] = useState<ClientResponse<ProductProjection> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (): Promise<void> => {
    try {
      if (productId) {
        const data = await api.getProductById(productId);
        console.log(data.body);
        setProduct(data);
      }
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
    <section className={style['product-page']} data-testid="product-page">
      <section className={style['content-wrapper']}>
        <section className={style['slider-wrapper']}>
          <Slider images={product.body.masterVariant.images} />
        </section>
        <section className={style['product-info-wrapper']}>
          <h1 className={style.title}>{product.body.name.en}</h1>
          <FormSubTitle subTitle="Product Description" />
          <p className={style.description}>{product.body.description?.en}</p>
          <FormSubTitle subTitle="Shipping & Delivery Information" />
          <p className={style.description}>
            We partner with trusted carriers like USPS, UPS, and FedEx to ensure your orders reach you promptly and
            securely, no matter where you are in the country.
          </p>
        </section>
        <section className={style['price-info']}>kjk</section>
      </section>
    </section>
  );
}
