import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ControllerLabel from '../../../../components/ui/controllerLabel/label';

describe('ControllerLabel', () => {
  it('renders label correctly', () => {
    const mockControl = <input type="calendar" />;
    const label = 'Date of Birth';
    render(<ControllerLabel control={mockControl} label={label} />);
    const renderedLabel = screen.getByText((content) => {
      const spanElement = document.querySelector('label > span');

      if (spanElement) {
        return content.includes(label) && spanElement.textContent === '*';
      }

      return false;
    });
    expect(renderedLabel).toBeInTheDocument();
  });
});
