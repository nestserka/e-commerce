import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormTitle from '../../../components/formTitle/FormTitle';
import styles from '../../../components/formTitle/_formTitle.module.scss';

describe('FormTitle', () => {
  it('renders the FormTitle component with the provided title', () => {
    const title = 'Login';

    render(<FormTitle title={title} />);

    const formTitleElement = screen.getByTestId('form-title');
    expect(formTitleElement).toBeInTheDocument();

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(styles['form-title']);

    const iconElement = screen.getByAltText('');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass(styles['form-icon']);
  });

  it('applies the correct styles to the elements', () => {
    const title = 'Register';

    render(<FormTitle title={title} />);

    const formTitleWrapper = screen.getByTestId('form-title');
    expect(formTitleWrapper).toHaveClass(styles['form-title-wrapper']);

    const titleElement = screen.getByText(title);
    expect(titleElement).toHaveClass(styles['form-title']);

    const iconElement = screen.getByAltText('');
    expect(iconElement).toHaveClass(styles['form-icon']);
  });
});
