import dayjs from 'dayjs';

import type { LineItem } from '@commercetools/platform-sdk';
import type { Address, AttributeDiscount, CartItemLineProps, InputProps } from './types';

export const getInputProps = (type: string, id: string, placeholder: string, autoComplete: string): InputProps => ({
  type,
  id,
  placeholder,
  autoComplete,
});

export interface ErrorLoginForm {
  error: {
    isForm?: boolean;
    isEmail?: boolean;
    isPassword?: boolean;
    message: string;
  };
}

export function handleLoginError(count: number | undefined): ErrorLoginForm {
  if (count !== undefined && count === 0) {
    return {
      error: {
        isEmail: true,
        message: 'Invalid email: There is no such user registered',
      },
    };
  }

  if (count !== undefined && count > 0) {
    return {
      error: {
        isPassword: true,
        message: 'Invalid password: You provided wrong password',
      },
    };
  }

  return {
    error: {
      isForm: true,
      message: 'Form error',
    },
  };
}

export const formatDateOfBirth = (dateString: string): string => dayjs(dateString).format('DD.MM.YYYY');

export const extractShippingAddresses = (
  addresses: Address[],
  defaultgAddressId?: string,
  addressIds?: string[],
): Address[] =>
  addresses
    .filter((address) => addressIds?.includes(address.id ?? ''))
    .map((address) => ({
      ...address,
      isDefault: defaultgAddressId !== undefined && address.id !== undefined && address.id === defaultgAddressId,
    }));

export interface BooleanStore {
  get: () => boolean;
  set: (hasValue: boolean) => void;
}

export function createBooleanState(initialValue: boolean): BooleanStore {
  let hasValue: boolean = initialValue;

  return {
    get: () => hasValue,
    set: (newValue: boolean): void => {
      hasValue = newValue;
    },
  };
}

export function formatPrice(num: number): string {
  return `$${(num / 100).toFixed(2)}`;
}

export function getLineItemProps(lineItem: LineItem): CartItemLineProps {
  const { id } = lineItem;
  const productName = lineItem.name.en;
  const { images } = lineItem.variant;
  const { quantity } = lineItem;
  const totalPrice = formatPrice(lineItem.totalPrice.centAmount);
  const pricePerItem = formatPrice(lineItem.price.value.centAmount);
  const imageUrl = images?.find((img) => img.url)?.url ?? '';
  const discountedPricePerItem = lineItem.price.discounted?.value.centAmount;
  let discountStr;
  let discountLabel = '';

  if (discountedPricePerItem) {
    discountStr = formatPrice(discountedPricePerItem);

    const discountAttribute = lineItem.variant.attributes?.find((atr) => atr.name === 'discount') as
      | AttributeDiscount
      | undefined;

    discountLabel = discountAttribute?.value[0].label ?? '';
  }

  const lineItemProps = {
    id,
    imageUrl,
    productName,
    discountedPricePerItem: discountStr,
    discountLabel,
    pricePerItem,
    quantity,
    totalPrice,
  };

  return lineItemProps;
}
