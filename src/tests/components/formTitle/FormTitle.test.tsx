import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormTitle from '../../../components/formTitle/FormTitle';
import styles from '../../../components/formTitle/_formTitle.module.scss';

describe('FormTitle', () => {
  it('renders the FormTitle component with the provided title', () => {
    const title = 'Login';

    render(<FormTitle title={title} isIcon />);

    const formTitleElement = screen.getByTestId('form-title');
    expect(formTitleElement).toBeInTheDocument();

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(styles['form-title']);

    const iconElement = screen.getByAltText('icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass(styles['form-icon']);
  });

  it('renders the FormTitle component without the icon when isIcon is false', () => {
    const title = 'Register';

    render(<FormTitle title={title} isIcon={false} />);

    const formTitleElement = screen.getByTestId('form-title');
    expect(formTitleElement).toBeInTheDocument();

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(styles['form-title']);

    const iconElement = screen.queryByAltText('icon');
    expect(iconElement).toBeNull();
  });

  it('applies the correct styles to the elements', () => {
    const title = 'Register';

    render(<FormTitle title={title} isIcon />);

    const formTitleWrapper = screen.getByTestId('form-title');
    expect(formTitleWrapper).toHaveClass(styles['form-title-wrapper']);

    const titleElement = screen.getByText(title);
    expect(titleElement).toHaveClass(styles['form-title']);

    const iconElement = screen.getByAltText('icon');
    expect(iconElement).toHaveClass(styles['form-icon']);
  });
});
