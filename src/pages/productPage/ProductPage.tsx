import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import style from './_product.module.scss';
import Slider from '../../components/sliderProduct/slider';
import { api } from '../../api/Api';
import FormSubTitle from '../../components/formSubTitle/formSubTitle';
import { formatPrice } from '../../utils/utils';
import Badge from '../../components/badge/badge';

import type { Params } from 'react-router';
import type { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';

interface AttributeBestseller {
  name: 'bestseller';
  value: boolean[];
}

interface AttributeDiscount {
  name: 'discount';
  value: Discount[];
}

interface Discount {
  key: string;
  label: string;
}

export default function ProductPage(): JSX.Element {
  const { productId }: Readonly<Params<string>> = useParams();

  const [product, setProduct] = useState<ClientResponse<ProductProjection> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [price, setPrice] = useState<string | null>(null);
  const [discount, setDiscount] = useState<string | null>(null);

  const extractPrice = (res: ClientResponse<ProductProjection> | undefined): void => {
    if (res) {
      const { prices } = res.body.masterVariant;

      if (prices) {
        const priceStr = formatPrice(prices[0].value.centAmount);
        setPrice(priceStr);

        const discountNum = prices[0].discounted?.value.centAmount;

        if (discountNum) setDiscount(formatPrice(discountNum));
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        if (productId) {
          const data = await api.getProductById(productId);
          console.log(data.body);
          setProduct(data);
          extractPrice(data);
        } else {
          setError('Product ID is missing');
        }
      } catch (err) {
        console.log(err);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct().catch((err) => {
      console.log(err);
    });
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const discountAttribute = product.body.masterVariant.attributes?.find((atr) => atr.name === 'discount') as
    | AttributeDiscount
    | undefined;

  const discountLabel = discountAttribute?.value[0].label;

  const bestsellerAttribute = product.body.masterVariant.attributes?.find((atr) => atr.name === 'bestseller') as
    | AttributeBestseller
    | undefined;
  const bestsellerName = bestsellerAttribute?.name;

  return (
    <section className={style['product-page']} data-testid="product-page">
      <section className={style['content-wrapper']}>
        <section className={style['slider-wrapper']}>
          <Slider images={product.body.masterVariant.images} />
        </section>
        <section className={style['product-info-wrapper']}>
          <div className={style['product-info-text']}>
            <h1 className={style.title}>{product.body.name.en}</h1>

            {discountLabel && <Badge type="discount" text={discountLabel} />}
            {bestsellerName && <Badge type="bestseller" text={bestsellerName} />}
            <FormSubTitle subTitle="Product Description" />
            <p className={style.description}>{product.body.description?.en}</p>
            <FormSubTitle subTitle="Shipping & Delivery Information" />
            <p className={style.description}>
              We partner with trusted carriers like USPS, UPS, and FedEx to ensure your orders reach you promptly and
              securely, no matter where you are in the country.
            </p>
          </div>
          <section className={style['price-info']}>
            {price && <span className={style.price}>{price}</span>}
            {discount && <span className={style.discount}>{discount}</span>}
          </section>
        </section>
      </section>
    </section>
  );
}
