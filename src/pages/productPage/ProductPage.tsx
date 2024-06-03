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
import { DYNAMIC_ROUTES, ROUTES } from '../../constants/constants';

import type { Params } from 'react-router';
import type { ProductProjection } from '@commercetools/platform-sdk';

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

  const [product, setProduct] = useState<ProductProjection>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [price, setPrice] = useState<string | null>(null);
  const [discount, setDiscount] = useState<string | null>(null);

  const extractPrice = (res: ProductProjection): void => {
    const { prices } = res.masterVariant;

    if (prices) {
      const priceStr: string = formatPrice(prices[0].value.centAmount);
      setPrice(priceStr);

      const discountNum = prices[0].discounted?.value.centAmount;

      if (discountNum) setDiscount(formatPrice(discountNum));
    }
  };

  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProductById(productId)
        .then((response) => {
          setProduct(response);
          extractPrice(response);
        })
        .catch((err: Error) => {
          console.log(err.message);
          setError('Failed to fetch product');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('Product ID is missing');
    }
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

  const discountAttribute = product.masterVariant.attributes?.find((atr) => atr.name === 'discount') as
    | AttributeDiscount
    | undefined;

  const discountLabel = discountAttribute?.value[0].label;

  const bestsellerAttribute = product.masterVariant.attributes?.find((atr) => atr.name === 'bestseller') as
    | AttributeBestseller
    | undefined;
  const bestsellerName = bestsellerAttribute?.name;

  const categoryNameRoute = product.categories.map((atr) => atr.obj?.parent?.obj?.slug.en).join('');
  const categoryNameStr = product.categories.map((atr) => atr.obj?.parent?.obj?.name.en).join('');
  const subCategoryNameRoute = product.categories.map((atr) => atr.obj?.slug.en).join('');
  const subCategoryNameStr = product.categories.map((atr) => atr.obj?.name.en).join('');
  const productName = product.name.en;
  const productImages = product.masterVariant.images;
  console.log(categoryNameRoute )

  return (
    <>
      <section className={style['breadcrumbs-wrapper']}>
        <Link to={ROUTES.HOME} className={style['breadcrumbs-link']}>
          <img src={homeIcon} className="home-icon" alt="NASA Store Homepage" />
        </Link>
        <img src={chevronIcon} className="chevron-icon" alt="" />
        <Link to={`${ROUTES.CATALOG_ALL}${categoryNameRoute}`} className={style['breadcrumbs-link']}>
          Catalog
        </Link>
        <img src={chevronIcon} className="chevron-icon" alt="" />
        <Link to={`${DYNAMIC_ROUTES.CATALOG}${categoryNameRoute}`} className={style['breadcrumbs-link']}>
          {categoryNameStr}
        </Link>
        <img src={chevronIcon} className="chevron-icon" alt="" />
        <Link to={`${DYNAMIC_ROUTES.CATALOG}${categoryNameRoute}/${subCategoryNameRoute}`} className={style['breadcrumbs-link']}>
          {subCategoryNameStr}
        </Link>
        <img src={chevronIcon} className="chevron-icon" alt="" />
        <Link to={`${DYNAMIC_ROUTES.PRODUCT}${productId}`} className={style['breadcrumbs-link']}>
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
              <p className={style.description}>{product.description?.en}</p>
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
