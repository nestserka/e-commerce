import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import style from './_profile.module.scss';
import ProfileAvatar from '../../domain/customer/avatar/profileAvatar';
import { extractShippingAddresses, formatDateOfBirth } from '../../utils/utils';
import { showModalMessage, useCustomerInfo } from '../../core/state/userState';
import ProfileView from '../../domain/customer/profileView/profileView';
import ModalMessage from '../../components/modalMessage/ModalMessage';
import getUser from '../../api/me/getUser';

import type { Params } from 'react-router-dom';

const modalMessageSuccessUpdateProps = {
  type: 'success',
  title: 'Successful Update',
  message: 'Your profile was updated.',
};

export default function ProfilePage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();
  const { setCustomerInfo, isSet } = useCustomerInfo();
  const { isShown } = showModalMessage();
  const { type, title, message } = modalMessageSuccessUpdateProps;

  useEffect(() => {
    const fetchCustomer = async (): Promise<void> => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const response = await getUser(token);

          if (response.dateOfBirth && response.firstName && response.lastName) {
            const shippingAddresses = extractShippingAddresses(
              response.addresses,
              response.defaultShippingAddressId,
              response.shippingAddressIds,
            );
            const billingAddresses = extractShippingAddresses(
              response.addresses,
              response.defaultBillingAddressId,
              response.billingAddressIds,
            );
            const customerInfo = {
              valueEmail: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              dateOfBirth: formatDateOfBirth(response.dateOfBirth),
              shippingAddress: shippingAddresses,
              billingAddress: billingAddresses,
              version: response.version,
            };
            setCustomerInfo(customerInfo);
          }
        }
      } catch (error) {
        console.error('Error fetching customer info:', error);
      }
    };

    fetchCustomer().catch((error) => {
      console.error('Error executing fetchCustomer:', error);
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
