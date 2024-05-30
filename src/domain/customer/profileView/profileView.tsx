import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import ProfileField from '../../../components/profileField/profileField';
import { useCustomerInfo } from '../../../core/state/userState';
import InfoField from '../infoField/infoField';
import style from './_profileView.module.scss';
import EmailForm from '../forms/emailForm/emailForm';
import PasswordForm from '../forms/passwordForm/passwordForm';
import { useToggleModal } from '../../../utils/useToggleModal';

import type { Address } from '../../../utils/types';

export default function ProfileView(): JSX.Element {
  const { valueEmail, firstName, lastName, dateOfBirth, shippingAddress, billingAddress } = useCustomerInfo();
  const [isEmailModalOpen, openEmailModal, closeEmailModal] = useToggleModal();
  const [isPasswordModalOpen, openPasswordModal, closePasswordModal] = useToggleModal();

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
          <button type="button" className={style['personal-section-button']}>
            Edit Personal Info
          </button>
        </section>
      </section>
      <section className={style['personal-section']} data-testid="personal-section">
        <section className={style['personal-section-wrapper']}>
          <FormSubTitle subTitle="available addresses" />
          <div className={style['personal-section-group']}>
            <div className={style.wrapper}>
              {shippingAddress.map((address: Address) => (
                <ProfileField
                  title="Shipping Address"
                  onEditClick={openPasswordModal}
                  inputVal={`${address.streetName}, ${address.city}, ${address.postalCode},  ${address.country}`}
                  isAddress
                  isDefault={address.isDefault ?? false}
                />
              ))}
            </div>
            <div className={style.wrapper}>
              {billingAddress.map((address: Address) => (
                <ProfileField
                  title="Billing Address"
                  onEditClick={openPasswordModal}
                  inputVal={`${address.streetName}, ${address.city}, ${address.postalCode},  ${address.country}`}
                  isAddress
                  isDefault={address.isDefault ?? false}
                />
              ))}
            </div>
          </div>
          <button type="button" className={style['personal-section-button']}>
            Edit Address
          </button>
        </section>
      </section>
    </div>
  );
}
