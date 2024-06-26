import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Input from '../../../../components/ui/input/input';

describe('Input', () => {
  it('renders label and input field correctly', () => {
    const inputProps = {
      id: 'inputId',
      type: 'text',
      value: '',
      onChange: (): void => {},
      placeholder: 'Enter text',
    };

    const label = 'Email';
    render(<Input inputProps={inputProps} label={label} />);

    const renderedLabel = screen.getByText((content) => {
      const spanElement = document.querySelector('label > span');

      if (spanElement) {
        return content.includes(label) && spanElement.textContent === '*';
      }

      return false;
    });
    expect(renderedLabel).toBeInTheDocument();
    const renderedInput = screen.getByLabelText(`${label} *`);
    expect(renderedInput).toBeInTheDocument();
    expect(renderedLabel).toHaveAttribute('for', inputProps.id);
  });
});
