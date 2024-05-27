import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import ProfileField from '../../../components/profileField/profileField';
import InfoField from '../infoField/infoField';
import style from './_personalInfo.module.scss';

export default function ProfileInfo(): JSX.Element {
  const handleEditClick = (): void => {
    console.log('Edit button clicked');
  };

  return (
    <section className={style['personal-section']} data-testid="personal-section">
      <section className={style['personal-section-wrapper']}>
        <FormSubTitle subTitle="confidential Info" />
        <ProfileField title="Email" onEditClick={handleEditClick} inputVal="keith-glennan@gmail.com" />
        <ProfileField title="Password" onEditClick={handleEditClick} inputVal="****..." />
      </section>
      <section className={style['personal-section-wrapper']}>
        <FormSubTitle subTitle="personal info" />
        <InfoField title="First Name" value="Katsiaryns" />
        <InfoField title="Last Name" value="Nestserava" />
        <InfoField title="Date of Birth" value="30.03.1995" />
        <button type='button'className={style['personal-section-button']}>Edit Personal Info</button>
      </section>
    </section>
  );
}
