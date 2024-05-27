import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import style from './_profile.module.scss';
import { api } from '../../api/Api';
import { tokenCache } from '../../api/NasaTokenCache';
import ProfileAvatar from '../../domain/customer/avatar/profileAvatar';
import ProfileInfo from '../../domain/customer/personalnfo/personalInfo';
import { extractShippingAddresses, formatDateOfBirth } from '../../utils/utils';

import type { Params } from 'react-router-dom';

export default function ProfilePage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();

  useEffect(() => {
    const fetchCustomer = async (): Promise<void> => {
      api.switchToPrivateToken(tokenCache.get().token);
      await api.getCustomer().then((response) => {
      if (response?.body.dateOfBirth){
      const shippingAddresses = extractShippingAddresses(response.body.addresses, response.body.defaultShippingAddressId, response.body.shippingAddressIds);
      const customerInfo = {
         valueEmail: response.body.email,
         firstName: response.body.firstName,
         lastName: response.body.lastName,
         dateOfBirth: formatDateOfBirth(response.body.dateOfBirth),
         shippingAddresses,
      }
      console.log(customerInfo);
    }
    });
    };

    fetchCustomer().catch((error: Error) => {
      console.log(error.message);
    });
  }, [customerId]);

  return (
    <section className={style['profile-content']} data-testid="profile">
      <div className={style['profile-content-wrapper']}>
        <ProfileAvatar />
        <ProfileInfo />
      </div>
    </section>
  );
}
