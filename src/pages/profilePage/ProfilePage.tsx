import { useParams } from 'react-router-dom';

import style from './_profile.module.scss';

import type { Params } from 'react-router-dom';

export default function ProfilePage(): JSX.Element {
  const { customerId }: Readonly<Params<string>> = useParams();

  return (
    <section className={style.profile} data-testid="profile">
      {customerId}
    </section>
  );
}
