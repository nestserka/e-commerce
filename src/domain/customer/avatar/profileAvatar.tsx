import icon from '../../../../public/assets/icons/astronaut-icon.jpg';
import style from './_profileAvatar.module.scss';

export default function ProfileAvatar(): JSX.Element {
  return (
    <section className={style['profile-avatar-wrapper']} data-testid="profile-avatar">
      <div className={style['avatar-box']} />
      <div className={style['profile-wrapper']}>
        <img src={icon} className={style['profile-icon']} alt="" />
      </div>
    </section>
  );
}
