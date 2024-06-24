import type { PAGES } from '../../../constants/constants';

export interface CartToggleButtonProps {
  productId: string | undefined;
  page: keyof typeof PAGES;
  isProductInCartProps?: boolean;
}
