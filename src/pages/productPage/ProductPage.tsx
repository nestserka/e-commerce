import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import style from './_product.module.scss';
import Slider from '../../components/sliderProduct/slider';
import FormSubTitle from '../../components/formSubTitle/formSubTitle';
import { formatPrice } from '../../utils/utils';
import Badge from '../../components/badge/badge';
import getProductById from '../../api/products/getProductById';
import { DYNAMIC_ROUTES, ROUTES } from '../../constants/constants';
import Breadcrumbs from '../../components/breadCrumbs/breadCrumbs';
import CartToggleButton from '../../domain/cart/сartToggleButton/cartToggleButton';
import Loader from '../../components/loader/Loader';
import { useCartData } from '../../core/state/cartState';
import ModalMessage from '../../components/modalMessage/ModalMessage';
import CartRemoveButton from '../../domain/cart/cartRemoveButton/CartRemoveButton';

import type { PAGES } from '../../constants/constants';
import type { AttributeBestseller, AttributeDiscount } from '../../utils/types';
import type { Params } from 'react-router';
import type { ProductProjection } from '@commercetools/platform-sdk';

const modalMessageSuccessRegistrationProps = {
  type: 'success',
  title: 'Successful Removal',
  message: 'You have successfully removed a product from your cart.',
};

export default function ProductPage(): JSX.Element {
  const { productId }: Readonly<Params<string>> = useParams();
  const { type, title, message } = modalMessageSuccessRegistrationProps;

  const [product, setProduct] = useState<ProductProjection>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [price, setPrice] = useState<string | null>(null);
  const [discount, setDiscount] = useState<string | null>(null);

  const currentPage: keyof typeof PAGES = 'PRODUCT';

  const extractPrice = (res: ProductProjection): void => {
    const { prices } = res.masterVariant;

    if (prices) {
      const priceStr: string = formatPrice(prices[0].value.centAmount);
      setPrice(priceStr);

      const discountNum = prices[0].discounted?.value.centAmount;

      if (discountNum) setDiscount(formatPrice(discountNum));
    }
  };

  const [idProductCart, setIdProductCart] = useState<string | null>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [uniqueProductId, setUniqueProductId] = useState<string>('');
  const [productInCart, setProductInCart] = useState<boolean>(false);
  const { itemsInCart } = useCartData();

  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProductById(productId)
        .then((response) => {
          setProduct(response);
          extractPrice(response);
          setUniqueProductId(response.id);
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

  useEffect(() => {
    if (itemsInCart) {
      const uniqueIdProductCart = itemsInCart.find((productData) => productData.productId === uniqueProductId);

      if (uniqueIdProductCart?.id) {
        setIdProductCart(uniqueIdProductCart.id);
        setProductInCart(true);
      }
    }
  }, [itemsInCart, uniqueProductId]);

  if (loading) {
    return (
      <div className={style['layout-wrapper']}>
        <Loader />
      </div>
    );
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
      {isShown && <ModalMessage type={type} title={title} message={message} />}
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
            <div className={style['product-buttons']}>
              <CartToggleButton productId={uniqueProductId} page={currentPage} isProductInCartProps={productInCart} />
              {idProductCart && (
                <CartRemoveButton
                  productId={uniqueProductId}
                  id={idProductCart}
                  setIsShow={setIsShown}
                  setIdProductCart={setIdProductCart}
                  setProductInCart={setProductInCart}
                />
              )}
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
