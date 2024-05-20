import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormSubTitle from '../../../components/formSubTitle/formSubTitle';
import styles from '../../../components/formSubTitle/_formSubTitle.module.scss';

describe('FormSubTitle', () => {
  it('renders the subtitle correctly', () => {
    const subTitleText = 'Test Subtitle';
    render(<FormSubTitle subTitle={subTitleText} />);

    const subTitleElement = screen.getByText(subTitleText);
    expect(subTitleElement).toBeInTheDocument();
  });

  it('has the correct class names', () => {
    const subTitleText = 'Test Subtitle';
    render(<FormSubTitle subTitle={subTitleText} />);

    const subTitleElement = screen.getByText(subTitleText);
    expect(subTitleElement).toHaveClass(styles['form-subtitle']);

    const horizontalLineElement = screen.getByText(subTitleText).nextSibling;
    expect(horizontalLineElement).toHaveClass(styles['form-horizontal-line']);
  });
});
