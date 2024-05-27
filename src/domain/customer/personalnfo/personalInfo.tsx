import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import ProfileField from '../../../components/profileField/profileField';
import InfoField from '../infoField/infoField';
import style from './_personalInfo.module.scss';

export default function ProfileInfo(): JSX.Element {
  const handleEditClick = (): void => {
    console.log('Edit button clicked');
  };

  return (
    <div className={style.wrapper}>
      <section className={style['personal-section']} data-testid="personal-section">
        <section className={style['personal-section-wrapper']}>
          <FormSubTitle subTitle="confidential Info" />
          <ProfileField
            title="Email"
            onEditClick={handleEditClick}
            inputVal="keith-glennan@gmail.com"
            isAddress={false}
          />
          <ProfileField title="Password" onEditClick={handleEditClick} inputVal="****..." isAddress={false} />
        </section>
        <section className={style['personal-section-wrapper']}>
          <FormSubTitle subTitle="personal info" />
          <InfoField title="First Name" value="Katsiaryns" />
          <InfoField title="Last Name" value="Nestserava" />
          <InfoField title="Date of Birth" value="30.03.1995" />
          <button type="button" className={style['personal-section-button']}>
            Edit Personal Info
          </button>
        </section>
      </section>
      <section className={style['personal-section']} data-testid="personal-section">
        <section className={style['personal-section-wrapper']}>
          <FormSubTitle subTitle="available addresses" />
          <div className={style['personal-section-group']}>
            <ProfileField
              title="Shipping Address"
              onEditClick={handleEditClick}
              inputVal="721 Broadway
New York, NY 10003, USA"
              isAddress
            />
            <ProfileField title="Billing Address" onEditClick={handleEditClick} inputVal="****..." isAddress />
          </div>
          <button type="button" className={style['personal-section-button']}>
            Edit Address
          </button>
        </section>
      </section>
    </div>
  );
}
