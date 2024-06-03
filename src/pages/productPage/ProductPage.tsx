import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './_product.module.scss';
import Slider from '../../components/sliderProduct/slider';
import FormSubTitle from '../../components/formSubTitle/formSubTitle';
import { formatPrice } from '../../utils/utils';
import Badge from '../../components/badge/badge';
import getProductById from '../../api/products/getProductById';
import homeIcon from '../../assets/images/icons/home-icon.svg';
import chevronIcon from '../../assets/images/icons/chevron-icon.svg';
import { ROUTES } from '../../constants/constants';

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
          const data = await getProductById(productId);
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
    return <div className={style['layout-wrapper']}>Loading...</div>;
  }

  if (error) {
    return <div className={style['layout-wrapper']}>{error}</div>;
  }

  if (!product) {
    return <div className={style['layout-wrapper']}>Product not found</div>;
  }

  const discountAttribute = product.body.masterVariant.attributes?.find((atr) => atr.name === 'discount') as
    | AttributeDiscount
    | undefined;

  const discountLabel = discountAttribute?.value[0].label;

  const bestsellerAttribute = product.body.masterVariant.attributes?.find((atr) => atr.name === 'bestseller') as
    | AttributeBestseller
    | undefined;
  const bestsellerName = bestsellerAttribute?.name;

  const categoryNameRoute = product.body.categories.map((atr) => atr.obj?.parent?.obj?.slug.en).join('');
  const categoryNameStr = product.body.categories.map((atr) => atr.obj?.parent?.obj?.name.en).join('');
  const productName = product.body.name.en;
  const productImages = product.body.masterVariant.images;

  return (
    <>
      <section className={style['breadcrumbs-wrapper']}>
        <Link to={ROUTES.HOME} className={style['breadcrumbs-link']}>
          <img src={homeIcon} className="home-icon" alt="NASA Store Homepage" />
        </Link>
        <img src={chevronIcon} className="chevron-icon" alt="" />
        <Link to={`${ROUTES.CATALOG}/${categoryNameRoute}/`} className={style['breadcrumbs-link']}>
          {categoryNameStr}
        </Link>
        <img src={chevronIcon} className="chevron-icon" alt="" />
        <Link to={`${ROUTES.CATALOG}/${categoryNameRoute}/${productId}`} className={style['breadcrumbs-link']}>
          {productName}
        </Link>
      </section>
      <section className={style['product-page']} data-testid="product-page">
        <section className={style['content-wrapper']}>
          <section className={style['slider-wrapper']}>
            <Slider images={productImages} />
          </section>
          <section className={style['product-info-wrapper']}>
            <div className={style['product-info-text']}>
              <h1 className={style.title}>{productName}</h1>
              <div className={style['badges-wrapper']}>
                {discountLabel && <Badge type="discount" text={discountLabel} />}
                {bestsellerName && <Badge type="bestseller" text={bestsellerName} />}
              </div>
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
    </>
  );
}
