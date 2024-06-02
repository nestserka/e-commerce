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

import type { Address } from '../../../utils/types';

export default function ProfileView(): JSX.Element {
  const { valueEmail, firstName, lastName, dateOfBirth, shippingAddress, billingAddress } = useCustomerInfo();
  const [isEmailModalOpen, openEmailModal, closeEmailModal] = useToggleModal();
  const [isPasswordModalOpen, openPasswordModal, closePasswordModal] = useToggleModal();
  const [isGeneralModalOpen, openGeneralModal, closeGeneralModal] = useToggleModal();
  const [isAddressModalOpen, openAddressModal, closeAddressModal] = useToggleModal();
  const [isBillingAddressModalOpen, openBillingAddressModal, closeBillingAddressModal] = useToggleModal();

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
                    onEditClick={openAddressModal}
                    inputVal={`${address.streetName}, ${address.city}, ${address.postalCode}, ${address.country}`}
                    isAddress
                    isDefault={address.isDefault ?? false}
                  />
                  {isAddressModalOpen &&(
                    <ShippingAddressForm isOpen={isAddressModalOpen} onClose={closeAddressModal} shippingAddressId={address.id} />
                  )}
                </div>
              ))}
            </div>
            <div className={style.wrapper}>
              {billingAddress.map((address: Address) => (
                  <div key={address.id} className={style.wrapper}>
                <ProfileField
                  title="Billing Address"
                  onEditClick={openBillingAddressModal}
                  inputVal={`${address.streetName}, ${address.city}, ${address.postalCode},  ${address.country}`}
                  isAddress
                  isDefault={address.isDefault ?? false}
                />
                {isBillingAddressModalOpen &&(
                  <BillingAddressForm isOpen={isBillingAddressModalOpen} onClose={closeBillingAddressModal} billingAddressId={address.id} />
                )}
                  </div>
              ))}
            </div>
          </div>
          <button type="button" className={style['personal-section-button']}>
            Add New Address
          </button>
        </section>
      </section>
    </div>
  );
}
