import style from '../filtersBlock.module.scss';
import InputCheckBox from '../../../../components/ui/checkbox/checkbox';

import type { AttributeLocalizedEnumValue } from '@commercetools/platform-sdk';

export interface AttributeBlockProps {
  attributeArray: AttributeLocalizedEnumValue[];
  nameAttribute: string;
  isCheckedAttributeList: boolean;
  handleClickForCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AttributeBlock({
  attributeArray,
  nameAttribute,
  isCheckedAttributeList,
  handleClickForCheckbox,
}: AttributeBlockProps): JSX.Element {
  return (
    <details className={attributeArray.length ? style['filters-section'] : style['filters-section-display-none']} open>
      <summary className={style['filters-title']}>{nameAttribute}</summary>
      <div className={style['select-sort']}>
        {attributeArray.length
          ? attributeArray.map((attribute) => (
              <div className={style['checkbox-wrapper']}>
                <InputCheckBox
                  key={attribute.key}
                  id={attribute.key}
                  name={attribute.label.en}
                  label={attribute.label.en}
                  isValue={isCheckedAttributeList}
                  onChange={handleClickForCheckbox}
                />
              </div>
            ))
          : ''}
      </div>
    </details>
  );
}
