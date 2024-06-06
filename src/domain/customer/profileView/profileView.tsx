import { useState } from 'react';

import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import ProfileField from '../../../components/profileField/profileField';
import { useCustomerInfo } from '../../../core/state/userState';
import InfoField from '../infoField/infoField';
import style from './_profileView.module.scss';
import EmailForm from '../forms/emailForm/emailForm';
import PasswordForm from '../forms/passwordForm/passwordForm';
import { useToggleModal } from '../../../utils/useToggleModal';
import GeneralForm from '../forms/generalForm/generalForm';
import ShippingAddressForm from '../forms/addressForm/shippingAddress';
import BillingAddressForm from '../forms/addressForm/billingAddress';
import AddressForm from '../forms/addressForm/newAddress';

import type { Address } from '../../../utils/types';

export default function ProfileView(): JSX.Element {
  const { valueEmail, firstName, lastName, dateOfBirth, shippingAddress, billingAddress } = useCustomerInfo();
  const [isEmailModalOpen, openEmailModal, closeEmailModal] = useToggleModal();
  const [isPasswordModalOpen, openPasswordModal, closePasswordModal] = useToggleModal();
  const [isGeneralModalOpen, openGeneralModal, closeGeneralModal] = useToggleModal();
  const [isAddressModalOpen, openAddressModal, closeAddressModal] = useToggleModal();
  const [isBillingAddressModalOpen, openBillingAddressModal, closeBillingAddressModal] = useToggleModal();
  const [isNewAddressModalOpen, openNewAddressModal, closeNewAddressModal] = useToggleModal();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const handleEditAddressClick = (addressId: string): void => {
    setSelectedAddressId(addressId);
    openAddressModal();
  };

  const handleEditBillingAddressClick = (addressId: string): void => {
    setSelectedAddressId(addressId);
    openBillingAddressModal();
  };

  return (
    <div className={style.wrapper}>
      <section className={style['personal-section']} data-testid="personal-section">
        <section className={style['personal-section-wrapper']}>
          <FormSubTitle subTitle="confidential Info" />
          <ProfileField
            title="Email"
            onEditClick={openEmailModal}
            inputVal={valueEmail}
            isAddress={false}
            isDefault={false}
          />
          {isEmailModalOpen && <EmailForm isOpen={isEmailModalOpen} onClose={closeEmailModal} />}
          <ProfileField
            title="Password"
            onEditClick={openPasswordModal}
            inputVal="****..."
            isAddress={false}
            isDefault={false}
          />
          {isPasswordModalOpen && <PasswordForm isOpen={isPasswordModalOpen} onClose={closePasswordModal} />}
        </section>
        <section className={style['personal-section-wrapper']}>
          <FormSubTitle subTitle="personal info" />
          <InfoField title="First Name" value={firstName} />
          <InfoField title="Last Name" value={lastName} />
          <InfoField title="Date of Birth" value={dateOfBirth} />
          <button type="button" className={style['personal-section-button']} onClick={openGeneralModal}>
            Edit Personal Info
          </button>
          {isGeneralModalOpen && <GeneralForm isOpen={isGeneralModalOpen} onClose={closeGeneralModal} />}
        </section>
      </section>
      <section className={style['personal-section']} data-testid="personal-section">
        <section className={style['personal-section-wrapper']}>
          <FormSubTitle subTitle="available addresses" />
          <div className={style['personal-section-group']}>
            <div className={style.wrapper}>
              {shippingAddress.map((address: Address) => (
                <div key={address.id} className={style.wrapper}>
                  <ProfileField
                    title="Shipping Address"
                    id={address.id ?? ''}
                    onEditClick={() => {
                      handleEditAddressClick(address.id ?? '');
                    }}
                    inputVal={`${address.streetName}, ${address.city}, ${address.postalCode}, ${address.country}`}
                    isAddress
                    isDefault={address.isDefault ?? false}
                  />
                  {isAddressModalOpen && selectedAddressId === address.id && (
                    <ShippingAddressForm
                      isOpen={isAddressModalOpen}
                      onClose={closeAddressModal}
                      shippingAddressId={address.id}
                    />
                  )}
                </div>
              ))}
              {shippingAddress.length === 0 && (
                <>
                  <ProfileField
                    title="Shipping Address"
                    onEditClick={openNewAddressModal}
                    isAddress
                    isDefault={false}
                    inputVal="No Shipping has been set. You can add the delivery address in edit mode."
                  />
                  {isNewAddressModalOpen && (
                    <AddressForm isOpen={isNewAddressModalOpen} onClose={closeNewAddressModal} />
                  )}
                </>
              )}
            </div>
            <div className={style.wrapper}>
              {billingAddress.map((address: Address) => (
                <div key={address.id} className={style.wrapper}>
                  <ProfileField
                    title="Billing Address"
                    id={address.id ?? ''}
                    onEditClick={() => {
                      handleEditBillingAddressClick(address.id ?? '');
                    }}
                    inputVal={`${address.streetName}, ${address.city}, ${address.postalCode},  ${address.country}`}
                    isAddress
                    isDefault={address.isDefault ?? false}
                  />
                  {isBillingAddressModalOpen && selectedAddressId === address.id && (
                    <BillingAddressForm
                      isOpen={isBillingAddressModalOpen}
                      onClose={closeBillingAddressModal}
                      billingAddressId={address.id}
                    />
                  )}
                </div>
              ))}
              {billingAddress.length === 0 && (
                <>
                  <ProfileField
                    title="Billing Address"
                    onEditClick={openNewAddressModal}
                    isAddress
                    isDefault={false}
                    inputVal="No Billing Address has been set. You can add the delivery address in edit mode."
                  />
                  {isNewAddressModalOpen && (
                    <AddressForm isOpen={isNewAddressModalOpen} onClose={closeNewAddressModal} />
                  )}
                </>
              )}
            </div>
          </div>
          <button type="button" className={style['personal-section-button']} onClick={openNewAddressModal}>
            Add New Address
          </button>
          {isNewAddressModalOpen && <AddressForm isOpen={isNewAddressModalOpen} onClose={closeNewAddressModal} />}
        </section>
      </section>
    </div>
  );
}
