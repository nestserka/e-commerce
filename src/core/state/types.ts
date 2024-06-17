import type {
  AttributeLocalizedEnumValue,
  Category,
  ProductProjectionPagedSearchResponse,
  ProductType,
} from '@commercetools/platform-sdk';
import type { Address } from '../../utils/types';

export interface CustomerCredentials {
  valueEmail: string;
  valuePassword: string;
  isAuth: boolean;
  customerId: string;
}

export interface LoginState {
  valueEmail: string;
  valuePassword: string;
  isAuth: boolean;
  customerId: string;
  customerRefreshToken: string;
  accessToken: string;
  createCustomerId: (data: string) => void;
  setAuthStatus: (status: boolean) => void;
  setRefreshToken: (data: string) => void;
  setAccessToken: (data: string) => void;
  setValueEmail: (email: string) => void;
  setValuePassword: (password: string) => void;
  setCustomerCredentials: (customerCredentials: CustomerCredentials) => void;
  reset: () => void;
}

export interface IsShownModal {
  isShown: boolean;
  isClipBoardShown: boolean;
  setIsShown: (isSHown: boolean) => void;
  setIsClipShown: (isClipBoardShown: boolean) => void;
}

export interface CustomerInfo {
  valueEmail?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  shippingAddress?: Address[];
  billingAddress?: Address[];
  version?: number;
}

export interface CustomerInfoState {
  valueEmail: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: Address[];
  billingAddress: Address[];
  version: number;
  isSet: boolean;
  setCustomerInfo: (customerInfo: CustomerInfo) => void;
  reset: () => void;
  setUpdatedEmail: (customerInfo: CustomerInfo) => void;
  setValueVersion: (version: number) => void;
  setUpdatedGeneraValues: (customerInfo: CustomerInfo) => void;
  updateAddress: (
    addressId: string,
    newAddress: Partial<Address>,
    version: number,
    addressType: 'shipping' | 'billing',
  ) => void;
  setDefault: (addressId: string, version: number, isDefault: boolean, addressType: 'shipping' | 'billing') => void;
  addAddress: (newAddress: Address, version: number, addressType: 'shipping' | 'billing', isDefault: boolean) => void;
  removeAddress: (addressId: string, addressType: 'shipping' | 'billing', version: number) => void;
}

export interface ShowErrorMessage {
  isErrorShown: boolean;
  setErrorIsShown: (isErrorShown: boolean) => void;
}

export interface CatalogStateData {
  currentPage: number;
  categoryName: string;
  brandList: string[];
  total: number;
  materialList: string[];
  refractorList: string[];
  categoriesData: Category[];
  priceRange: number[];
  subtreesList: string;
  parentsCategories: Category[];
  productTypesAttributes: ProductType[];
  isLoading: boolean;
  limit: number;
  fuzzyLevelValue: number;
  sortValue: string;
  searchValue: string;
  isBestseller: boolean;
  isDiscount: boolean;
  offset: number;
  resetAttributes: () => void;
  resetSort: () => void;
  setCurrentPage: (quantity: number) => void;
  setTotal: (quantity: number) => void;
  setRefractorList: (nameRefractor: string, isStatus: boolean) => void;
  setRefractorListDefault: () => void;
  setBrandList: (nameBrand: string, isStatus: boolean) => void;
  setBrandListDefault: () => void;
  setMaterialList: (nameMaterial: string, isStatus: boolean) => void;
  setMaterialListDefault: () => void;
  setPriceRange: (newRange: number[]) => void;
  setCategoryName: (newName: string) => void;
  createFilterByCategoriesId: (category?: string) => string;
  setOffset: (page: number) => void;
  setSort: (newSort: string) => void;
  setSubtreesList: (id: string, isStatus: boolean) => void;
  setBestsellerStatus: (isStatus: boolean) => void;
  setDiscountStatus: (iStatus: boolean) => void;
  setSearchValue: (newSearch: string) => void;
  setFuzzyLevel: () => number;
  setCategoriesData: () => Promise<void>;
  setProductTypesAttributes: () => Promise<void>;
  getProductsList: (subtrees?: string) => Promise<ProductProjectionPagedSearchResponse>;
}

export interface CatalogCheckAttributeState {
  brandListAttribute: AttributeLocalizedEnumValue[];
  refractorListAttribute: AttributeLocalizedEnumValue[];
  materialListAttribute: AttributeLocalizedEnumValue[];
  checkedStatesBrandList: Record<string, boolean>;
  checkedStatesRefractorList: Record<string, boolean>;
  checkedStatesMaterialList: Record<string, boolean>;
  resetAttributesList: () => void;
  resetCheckedStatesAttributesList: () => void;
  setRefractorListAttribute: (newArray: AttributeLocalizedEnumValue[]) => void;
  setMaterialListAttribute: (newArray: AttributeLocalizedEnumValue[]) => void;
  setBrandListAttribute: (newArray: AttributeLocalizedEnumValue[]) => void;
  setCheckedStatesBrandList: (newValue: Record<string, boolean>) => void;
  setCheckedStatesRefractorList: (newValue: Record<string, boolean>) => void;
  setCheckedStatesMaterialList: (newValue: Record<string, boolean>) => void;
}
