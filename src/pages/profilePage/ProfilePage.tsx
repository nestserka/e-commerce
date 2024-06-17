import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import style from './_profile.module.scss';
import ProfileAvatar from '../../domain/customer/avatar/profileAvatar';
import { extractShippingAddresses, formatDateOfBirth } from '../../utils/utils';
import { showErrorMessage, showModalMessage, useCustomerInfo } from '../../core/state/userState';
import ProfileView from '../../domain/customer/profileView/profileView';
import ModalMessage from '../../components/modalMessage/ModalMessage';
import getUser from '../../api/me/getUser';
import { tokenCache } from '../../api/token/MyTokenCache';
import { ERROR_TYPES } from '../../constants/constants';
import Loader from '../../components/loader/Loader';

import type { Params } from 'react-router-dom';

const modalMessageSuccessUpdateProps = {
  type: 'success',
  title: 'Successful Update',
  message: 'Your profile was updated.',
};

const modalErrorOnToken = {
  errorType: 'error',
  errorTitle: 'Session expired',
  errorMessage: 'Your session was expired. You will be shortly redirected to login page.',
};

export default function ProfilePage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();
  const { setCustomerInfo, isSet } = useCustomerInfo();
  const { isShown } = showModalMessage();
  const { isErrorShown } = showErrorMessage();
  const { type, title, message } = modalMessageSuccessUpdateProps;
  const { errorType, errorTitle, errorMessage } = modalErrorOnToken;
  const { setErrorIsShown } = showErrorMessage();

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
        .catch(async (error: Error) => {
          if (error.message.includes(ERROR_TYPES.INVALID_TOKEN)) {
            if (tokenCache.update()) {
              await fetchCustomer().catch();
            }
          } else {
            setErrorIsShown(true);
          }
        });
    };

    fetchCustomer().catch((error: Error) => {
      console.log(error);
    });
  }, [customerId, setCustomerInfo, setErrorIsShown]);

  return (
    <section className={style['profile-content']} data-testid="profile">
      <div className={style['profile-content-wrapper']}>
        <ProfileAvatar />
        {isShown && <ModalMessage type={type} title={title} message={message} />}
        {isErrorShown && <ModalMessage type={errorType} title={errorTitle} message={errorMessage} />}
        {isSet ? <ProfileView /> : <Loader />}
      </div>
    </section>
  );
}
