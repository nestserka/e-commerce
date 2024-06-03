import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import style from './_profile.module.scss';
import ProfileAvatar from '../../domain/customer/avatar/profileAvatar';
import { extractShippingAddresses, formatDateOfBirth } from '../../utils/utils';
import { showModalMessage, useCustomerInfo } from '../../core/state/userState';
import ProfileView from '../../domain/customer/profileView/profileView';
import ModalMessage from '../../components/modalMessage/ModalMessage';
import getUser from '../../api/me/getUser';
import ErrorWindow from '../../components/errorWindow/errorWindow';
import { logOut } from '../../utils/logOut';

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
  const [isTokenErrorWindonOpen, setIsTokenErrorWindonOpen] = useState(false);

  const handleOpenTokenWindow = (): void => {
    setIsTokenErrorWindonOpen(true);
  };

  const handleCloseTokenWindow = (): void => {
    setIsTokenErrorWindonOpen(false);
  };

  useEffect(() => {
    const fetchCustomer = async (): Promise<void> => {
      await getUser()
        .then((response) => {
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
        })
        .catch((error: Error) => {
          handleOpenTokenWindow();
          console.log(error);
          setTimeout(() => {
            logOut();
          }, 3500);
        });
    };

    fetchCustomer().catch((error) => {
      console.error('Error executing fetchCustomer:', error);
    });
  }, [customerId, setCustomerInfo]);

  return (
    <section className={style['profile-content']} data-testid="profile">
      <div className={style['profile-content-wrapper']}>
        <ProfileAvatar />
        {isTokenErrorWindonOpen && <ErrorWindow isOpen={isTokenErrorWindonOpen} onClose={handleCloseTokenWindow} />}
        {isShown && <ModalMessage type={type} title={title} message={message} />}
        {isSet ? <ProfileView /> : <div className="loading">Loading...</div>}
      </div>
    </section>
  );
}
