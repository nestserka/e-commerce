import { useParams } from 'react-router-dom';
import { lazy, useEffect } from 'react';

import style from './_profile.module.scss';
import { api } from '../../api/Api';
import { tokenCache } from '../../api/NasaTokenCache';
import ProfileAvatar from '../../domain/customer/avatar/profileAvatar';
import { extractShippingAddresses, formatDateOfBirth } from '../../utils/utils';
import { useCustomerInfo } from '../../core/state/userState';

import type { Params } from 'react-router-dom';

const ProfileInfo = lazy(() => import('../../domain/customer/personalnfo/personalInfo'));

export const dynamic = 'force-dynamic';

export default function ProfilePage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();
  const { setCustomerInfo, valueEmail } = useCustomerInfo();

  useEffect(() => {
    const fetchCustomer = async (): Promise<void> => {
      api.switchToPrivateToken(tokenCache.get().token);
      await api.getCustomer().then((response) => {
        if (response?.body.dateOfBirth && response.body.firstName && response.body.lastName) {
          const shippingAddresses = extractShippingAddresses(
            response.body.addresses,
            response.body.defaultShippingAddressId,
            response.body.shippingAddressIds,
          );
          const billingAddresses = extractShippingAddresses(
            response.body.addresses,
            response.body.defaultBillingAddressId,
            response.body.billingAddressIds,
          );
          const customerInfo = {
            valueEmail: response.body.email,
            firstName: response.body.firstName,
            lastName: response.body.lastName,
            dateOfBirth: formatDateOfBirth(response.body.dateOfBirth),
            shippingAddress: shippingAddresses,
            billingAddress: billingAddresses,
          };
          console.log(customerInfo);
          setCustomerInfo(customerInfo);
        }
      });
    };

    fetchCustomer().catch((error: Error) => {
      console.log(error.message);
    });
  }, [customerId, setCustomerInfo]);

  return (
    <section className={style['profile-content']} data-testid="profile">
      <div className={style['profile-content-wrapper']}>
        <ProfileAvatar />
        {valueEmail ? <ProfileInfo /> : <div className="loading">Loading...</div>}
      </div>
    </section>
  );
}
