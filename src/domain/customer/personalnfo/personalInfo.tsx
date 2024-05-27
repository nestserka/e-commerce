import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import ProfileField from '../../../components/profileField/profileField';
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
    </section>
  );
}
