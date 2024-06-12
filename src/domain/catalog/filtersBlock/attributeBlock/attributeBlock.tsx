import style from '../_filtersBlock.module.scss';
import InputCheckBox from '../../../../components/ui/checkbox/checkbox';

import type { AttributeBlockProps } from '../../types';

export default function AttributeBlock({
  attributeArray,
  nameAttribute,
  checkedStates,
  handleClickForCheckbox,
}: AttributeBlockProps): JSX.Element {
  return (
    <details className={attributeArray.length ? style['filters-section'] : style['filters-section-display-none']} open>
      <summary className={style['filters-title']}>{nameAttribute}</summary>
      <div className={style['select-sort']}>
        {attributeArray.map((attribute) => (
          <div className={style['checkbox-wrapper']} key={attribute.key}>
            <InputCheckBox
              id={attribute.key}
              name={attribute.label.en}
              label={attribute.label.en}
              isValue={checkedStates[attribute.key]}
              onChange={handleClickForCheckbox}
            />
          </div>
        ))}
      </div>
    </details>
  );
}
