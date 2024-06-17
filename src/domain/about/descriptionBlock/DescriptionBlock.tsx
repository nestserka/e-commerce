import styles from './_descriptionBlock.module.scss';

import type { DescriptionData } from '../card/types';

export default function DescriptionBlock({
  propsDescriptionBlock,
}: {
  propsDescriptionBlock: DescriptionData;
}): JSX.Element {
  const { title, bio, contribution } = propsDescriptionBlock;

  return (
    <>
      <h3 className={styles.title}>
        <div className={styles['title-line']}>
          <span className={styles['title-line-span']}>{title}</span>
        </div>
        <span className={styles['horizontal-line']} />
      </h3>
      <div className={styles['paragraph-block']}>
        <div className={styles.paragraph}>
          <h4 className={styles['paragraph-title']}>Bio</h4>
          <div className={styles['paragraph-desc']}>{bio}</div>
        </div>
        <div className={styles.paragraph}>
          <h4 className={styles['paragraph-title']}>Contribution</h4>
          <div className={styles['paragraph-desc']}>{contribution}</div>
        </div>
      </div>
    </>
  );
}
