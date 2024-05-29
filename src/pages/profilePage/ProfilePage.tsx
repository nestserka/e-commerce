import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import style from './_profile.module.scss';
import { api } from '../../api/Api';
import { tokenCache } from '../../api/NasaTokenCache';
import ProfileAvatar from '../../domain/customer/avatar/profileAvatar';
import { extractShippingAddresses, formatDateOfBirth } from '../../utils/utils';
import { showModalMessage, useCustomerInfo } from '../../core/state/userState';
import ProfileView from '../../domain/customer/profileView/profileView';

import type { Params } from 'react-router-dom';
import ModalMessage from '../../components/modalMessage/ModalMessage';

const modalMessageSuccessUpdateProps = {
  type: 'success',
  title: 'Successful Update',
  message: 'Your data was updated successfully.',
};

export default function ProfilePage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();
  const { setCustomerInfo, isSet } = useCustomerInfo();
  const { isShown } = showModalMessage();
  const { type, title, message } = modalMessageSuccessUpdateProps;

  useEffect(() => {
    const fetchCustomer = async (): Promise<void> => {
      api.switchToPrivateToken(tokenCache.get().token);
      await api.getCustomer().then((response) => {
        console.log(response);

        if (response.body.dateOfBirth && response.body.firstName && response.body.lastName) {
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
            version: response.body.version,
          };
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
        {isShown && <ModalMessage type={type} title={title} message={message} />}
        {isSet ? <ProfileView /> : <div className="loading">Loading...</div>}
      </div>
    </section>
  );
}
