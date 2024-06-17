import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import InfoField from '../../../domain/customer/infoField/infoField';

describe('InfoField', () => {
  it('renders info field component with correct title and value', () => {
    const title = 'Name';
    const value = 'John Doe';

    render(<InfoField title={title} value={value} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const valueElement = screen.getByText(value);
    expect(valueElement).toBeInTheDocument();
  });
});
