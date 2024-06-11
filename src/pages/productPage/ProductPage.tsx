import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import style from './_product.module.scss';
import Slider from '../../components/sliderProduct/slider';
import FormSubTitle from '../../components/formSubTitle/formSubTitle';
import { formatPrice } from '../../utils/utils';
import Badge from '../../components/badge/badge';
import getProductById from '../../api/products/getProductById';
import { DYNAMIC_ROUTES, ROUTES } from '../../constants/constants';
// import { useCartData } from '../../core/state/cartState';
// import { useLoginData } from '../../core/state/userState';
import Breadcrumbs from '../../components/breadCrumbs/breadCrumbs';
import CartToggleButton from '../../domain/cart/сartToggleButton/cartToggleButton';

import type { PAGES } from '../../constants/constants';
import type { AttributeBestseller, AttributeDiscount } from '../../utils/types';
import type { Params } from 'react-router';
import type { ProductProjection } from '@commercetools/platform-sdk';

export default function ProductPage(): JSX.Element {
  const { productId }: Readonly<Params<string>> = useParams();

  const [product, setProduct] = useState<ProductProjection>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [price, setPrice] = useState<string | null>(null);
  const [discount, setDiscount] = useState<string | null>(null);

  // const { activeCart, setCart, addProductToCart } = useCartData();
  // const { customerId } = useLoginData();

  const currentPage: keyof typeof PAGES = 'PRODUCT';

  // const handleAddToCart = async (): Promise<void> => {
  //   if (product) {
  //     if (!activeCart) {
  //       try {
  //         await setCart(customerId);
  //       } catch (err) {
  //         console.log((err as Error).message);
  //         setError('Failed to set active cart');

  //         return;
  //       }
  //     }

  //     try {
  //       await addProductToCart(product.id, customerId);
  //     } catch (err) {
  //       console.log((err as Error).message);
  //       setError('Failed to add product to cart');
  //     }
  //   }
  // };

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

  const breadCrumbsProps = [
    {
      label: 'Catalog',
      route: `${ROUTES.CATALOG_ALL}`,
    },
    {
      label: `${categoryNameStr}`,
      route: `${DYNAMIC_ROUTES.CATALOG}${categoryNameRoute}`,
    },
    {
      label: `${subCategoryNameStr}`,
      route: `${DYNAMIC_ROUTES.CATALOG}${categoryNameRoute}/${subCategoryNameRoute}`,
    },
    {
      label: `${productName}`,
      route: `${DYNAMIC_ROUTES.PRODUCT}${productId}`,
    },
  ];

  return (
    <>
      <Breadcrumbs links={breadCrumbsProps} />
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
              {discount && <span className={style.price}>{discount}</span>}
              <span className={discount ? style.discount : style.price}>{price}</span>
            </section>
            {/* <button className="button-primary" type="button" onClick={handleAddToCart}>
              Add to cart
            </button> */}

            <CartToggleButton productId={product.id} page={currentPage} />
          </section>
        </section>
      </section>
    </>
  );
}
