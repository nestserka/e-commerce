// import { create } from 'zustand';

// import { api } from '../../api/Api';

// import type { CategoryPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';

// export interface CatalogStateData {
//   categoriesData: CategoryPagedQueryResponse;
//   setCategoriesData: () => Promise<ClientResponse<CategoryPagedQueryResponse>>;
// }

// export const useCatalogData = create<CatalogStateData>((set) => ({
//   categoriesData: (()=>{
//     return setCategoriesData()
//   }),
//   setCategoriesData: async (): Promise<ClientResponse<CategoryPagedQueryResponse>> => api.root().categories().get().execute(),

//   // valueEmail: '',
//   // valuePassword: '',
//   // accessToken: '',
//   // createCustomerId: (data: string): void => {
//   //   set(() => ({ customerId: data }));
//   // },
//   // setAuthStatus: (status: boolean): void => {
//   //   set(() => ({ isAuth: status }));
//   // },
//   // setRefreshToken: (data: string): void => {
//   //   set(() => ({ customerRefreshToken: data }));
//   // },
//   // setAccessToken: (data: string): void => {
//   //   set(() => ({ accessToken: data }));
//   // },
//   // setValueEmail: (email: string): void => {
//   //   set(() => ({ valueEmail: email }));
//   // },
//   // setValuePassword: (password: string): void => {
//   //   set(() => ({ valuePassword: password }));
//   // },
//   // setCustomerCredentials: (customerCredentials: CustomerCredentials): void => {
//   //   const { customerId, isAuth, valuePassword, valueEmail } = customerCredentials;
//   //   set(() => ({
//   //     customerId,
//   //     isAuth,
//   //     valuePassword,
//   //     valueEmail,
//   //   }));
//   // },
// }));

import { create } from 'zustand';

import { api } from '../../api/Api';

import type { Category } from '@commercetools/platform-sdk';

export interface CatalogStateData {
  categoriesData: Category[];
  parentsCategories: Category[];
  isLoading: boolean;
  setCategoriesData: () => Promise<void>;
}

export const useCatalogData = create<CatalogStateData>((set) => ({
  categoriesData: [],
  parentsCategories: [],
  isLoading: false,
  setCategoriesData: async (): Promise<void> => {
    set({ isLoading: true });

    try {
      const response = await api.root().categories().get().execute();
      set({ categoriesData: response.body.results, isLoading: false });
      set({
        parentsCategories: response.body.results.filter((data: Category) => data.ancestors.length === 0),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
